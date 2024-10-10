<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <TopUser ref="topUserComponent" />
    <Chat ref="chatComponent" />
    <UserInput ref="userInputComponent" @sendMessage="sendMessage" :free_times="free_times" :user="user" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { sleep } from '../../utils';
import TopUser from '../../components/TopUser.vue';
import Chat from '../../components/Chat.vue';
import UserInput from '../../components/UserInput/index.vue';
import { createOpenai, getOpenaiResult } from '../../api/index.js';
import { message, Modal } from 'ant-design-vue';

const chatComponent = ref(null);
const userInputComponent = ref(null);
const topUserComponent = ref(null);


const user = computed(() => {
  if (!topUserComponent.value) return
  return topUserComponent.value.user
})
const free_times = computed(() => {
  if (!topUserComponent.value) return
  return topUserComponent.value.free_times
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 收到截图发送截图
  if (message.type === 'screenshot_base64') {
    const base64 = message.base64;
    sendMessage(false, base64)
  }
});


/**
 * @description: 发送消息
 * @param {*} input // 输入内容 2选1
 * @param {*} base64 // 截图base64 2选1
 * @return {*}
 */
const sendMessage = async (input, base64) => {

  const historyMessage = chatComponent.value.getHistoryMessage();

  chatComponent.value.userSendMessage(input, base64);

  chatComponent.value.systemLoaidng()

  const messages = [
    ...historyMessage,
    {
      role: 'user',
      content: [
        { type: 'text', text: `${input || '回答图片中的内容'}，用特定语言进行回答:${chrome.i18n.getUILanguage()}` },
      ],
    },
  ]


  if (base64) {
    messages[messages.length - 1].content.push({
      type: 'image_url',
      image_url: {
        url: base64,
      },
    })
  }

  const res = await createOpenai(messages);
  let task_id = res.data.jobId;
  const result = await getJobResult(task_id);
  if (result.success) {
    chatComponent.value.systemSendMessage(result.text)
  }
}

/**
 * @description: 获取任务结果
 * @param {*} task_id
 * @return {*}
 */
const getJobResult = (task_id) => {
  return new Promise((resolve, reject) => {
    let cur = 0;
    let max = 10;
    const checkResult = async () => {
      if (cur >= max) {
        resolve({
          success: false,
          message: 'timeout'
        });
      }
      await sleep(3000); // 每3秒轮询一次
      try {
        const result = await getOpenaiResult(task_id);
        console.log(result, '任务结果');
        if (result.data.status === '-1') {
          resolve({
            success: false,
            message: 'error'
          });
        }
        if (result.data.status === 10) {
          let answer = result.data.result;
          resolve({
            success: true,
            message: 'success',
            data: result.data,
            text: answer
          });
          if (!user?.value.is_subscribed) {
            chrome.runtime.sendMessage({
              msg: 'useFreeTimes',
            });
          }
        } else {
          cur++;
          checkResult();
        }
      } catch (error) {
        console.log('error', error);
        reject({
          success: false,
          message: 'error'
        });
      }
    };
    checkResult();
  });
};
</script>



<style scoped></style>
