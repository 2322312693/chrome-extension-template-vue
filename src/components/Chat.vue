<template>
  <div class="  h-full bg-blue-50 overflow-y-auto">
    <ul class="chat-list list-none p-0 h-full overflow-y-auto">
      <li v-for="chat in chatList" :key="chat.id" class="my-4 mx-2">
        <!-- 系统消息 -->
        <div class="overflow-hidden " v-if="chat.type === 'system' && chat.id !== 1">
          <div class="bg-gray-200 text-wrap max-w-[70vw] rounded-lg p-2 px-6 rounded-tl-none float-left break-words">
            <div class="text-black text-sm">{{ chat.content }}</div>
          </div>
        </div>
        <!-- 用户消息 -->
        <div class="overflow-hidden" v-if="chat.type === 'user'">
          <div
            class="  border  text-wrap   max-w-[70vw] rounded-lg p-2 px-6  rounded-tr-none float-right   break-words border-blue-500 text-blue-500">
            <div v-if="chat.content" class="block text-sm ">{{ chat.content }}</div>
            <img v-if="chat.image" :src="chat.image" alt="user image" class="w-full h-full object-cover">
          </div>
        </div>
      </li>
      <li class="my-4 mx-2">
        <!-- 系统消息回复中 -->
        <div class="overflow-hidden">
          <div class=" bg-gray-200 text-wrap  max-w-[70vw] rounded-lg p-2 px-6  rounded-tl-none float-left"
            v-if="replyLoaidng">
            <div class="flex space-x-1 items-center py-1">
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>



<script setup>
import { onMounted, watch, ref, nextTick } from 'vue'

const chatList = ref([
  {
    id: 1,
    content: `强大的AI辅导助手，帮助你完成作业和理解内容,用特定语言进行回答:${chrome.i18n.getUILanguage()}`,
    type: 'system',
  },
  {
    id: 2,
    content: 'hello',
    type: 'user',
  },
  {
    id: 3,
    content: 'Hello, how can I help you?',
    type: 'system',
  }
])



function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}


function flashDot (index) {
  if (replyLoaidng.value === false) {
    return
  }
  //动画  dot-1 dot-2 dot-3
  const dot1 = document.getElementById('dot-1')
  const dot2 = document.getElementById('dot-2')
  const dot3 = document.getElementById('dot-3')
  const dot4 = document.getElementById('dot-4')
  const dotList = [dot1, dot2, dot3, dot4]
  async function nextDot (index) {
    if (replyLoaidng.value === false) {
      return
    }
    dotList[index]?.classList.add('opacity-100')
    // 加一个变大 scale-150
    //闪烁完成后 删除动画
    // 循环到下一个dot
    await sleep(300)
    dotList[index]?.classList.remove('opacity-100')
    dotList[index]?.classList.remove('scale-150')

    nextDot((index + 1) % dotList.length)
  }
  nextDot(index);
}
const replyLoaidng = ref(false);


// 导出三个方法 1. 添加一个loading 2.用户发送一个消息，3将loading改为系统回复

function systemLoaidng () {
  replyLoaidng.value = true;
  flashDot(0);
}

function userSendMessage (message, base64) {
  chatList.value.push({
    id: chatList.value.length + 1,
    content: message,
    image: base64,
    type: 'user',
  })

  // 滚动到底部
  nextTick(() => {
    const chatListElement = document.querySelector('.chat-list');
    if (chatListElement) {
      chatListElement.scrollTop = chatListElement.scrollHeight;
    }
  });
}


function systemSendMessage (message) {
  // 删除loading
  replyLoaidng.value = false;
  chatList.value.push({
    id: chatList.value.length + 1,
    content: message,
    type: 'system',
  })

  // 滚动到底部
  nextTick(() => {
    const chatListElement = document.querySelector('.chat-list');
    if (chatListElement) {
      chatListElement.scrollTop = chatListElement.scrollHeight;
    }
  });
}


function getHistoryMessage () {
  return chatList.value.map(item => {
    return {
      role: item.type === 'system' ? 'system' : 'user',
      content: item.image ? {
        type: 'image_url',
        image_url: { url: item.image },
      } : [{ type: 'text', text: item.content }],
    }
  })

}

defineExpose({
  systemLoaidng,
  userSendMessage,
  systemSendMessage,
  getHistoryMessage,
})



</script>


<style scoped>
/* 无需额外样式，使用tailwindcss */

.chat-list {
  scroll-behavior: smooth;
}

@keyframes blink {

  0%,
  80%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}

.dot {
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>