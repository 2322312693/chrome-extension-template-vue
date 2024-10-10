<template>
  <div class="h-52 bg-blue-50 px-2">
    <div class="tools flex items-center space-x-2 mb-2  ">
      <Screenshot />
      <div class="flex items-center space-x-2">
        <!-- image upload -->
        <label class="rounded-xl  text-white p-1 px-2 " for="file-upload">
          <svg t="1727690636991" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7503" width="20" height="20">
            <path
              d="M514.2528 916.1728c-98.9696 0-198.7072-0.0512-298.6496-0.1536-91.8528-0.1024-138.496-46.592-138.5984-138.1376-0.2048-179.0976-0.2048-358.6048 0-533.4528 0.1024-89.856 48.0256-137.472 138.5984-137.6256 69.5296-0.1024 139.0592-0.1024 208.5888-0.0512h178.8416c69.5296-0.0512 139.1104-0.0512 208.64 0.0512 88.4736 0.1536 137.216 48.5888 137.2672 136.2944 0.0512 178.688 0.0512 357.4272 0 536.1152-0.0512 88.064-48.7936 136.6528-137.3184 136.7552-97.8432 0.1536-197.2224 0.2048-297.3696 0.2048zM334.7968 168.192c-39.68 0-79.36 0-119.04 0.1024-57.0368 0.0512-77.2096 20.0192-77.312 76.1856-0.2048 174.7968-0.2048 354.2528 0 533.2992 0.0512 57.2928 19.5584 76.6976 77.2096 76.7488 200.96 0.2048 401.4592 0.2048 595.8656 0 54.6304-0.0512 75.9296-21.1968 75.9808-75.3152 0.0512-178.688 0.0512-357.376 0-536.064 0-54.4768-20.5824-74.8032-75.9296-74.9056-69.4784-0.1024-139.008-0.1024-208.4864-0.0512h-268.288z"
              fill="#707070" p-id="7504"></path>
            <path
              d="M326.3488 439.1936c-55.8592 0-101.3248-45.4656-101.3248-101.3248S270.4896 236.544 326.3488 236.544s101.3248 45.4656 101.3248 101.3248-45.4144 101.3248-101.3248 101.3248z m0-141.1584c-21.9648 0-39.8848 17.8688-39.8848 39.8848 0 21.9648 17.8688 39.8848 39.8848 39.8848s39.8848-17.8688 39.8848-39.8848-17.8688-39.8848-39.8848-39.8848zM769.1776 769.28H257.7408a44.9536 44.9536 0 0 1-40.4992-25.088c-7.68-15.4624-6.0416-33.6384 4.4032-47.4112 29.6448-39.2704 88.7808-117.6576 113.3568-150.272a45.03552 45.03552 0 0 1 35.0208-18.0224 44.9536 44.9536 0 0 1 35.8912 16.3328c15.9744 19.2512 45.0048 54.016 65.792 78.8992 30.976-39.5776 84.3776-107.8272 107.6736-137.7792 8.704-11.2128 21.7088-17.5616 36.0448-17.4592 14.1824 0.1024 27.1872 6.656 35.7376 17.92 31.6928 41.9328 118.7328 161.536 154.6752 211.0464 10.0352 13.824 11.4688 31.8976 3.6864 47.1552a45.14816 45.14816 0 0 1-40.3456 24.6784z m-498.5344-35.5328c0 0.0512 0 0 0 0z m-24.5248-18.4832h0.0512-0.0512z m44.0832-7.424h447.1808c-35.84-49.3056-91.0848-125.0816-122.5728-167.4752-31.2832 40.1408-84.224 107.776-107.1104 136.96a45.01504 45.01504 0 0 1-34.8672 17.3568 45.1072 45.1072 0 0 1-35.4304-16.2304c-15.8208-18.944-44.7488-53.6064-65.6384-78.6432-22.1696 29.3376-55.7568 73.8304-81.5616 108.032z"
              fill="#707070" p-id="7505"></path>
          </svg>
        </label>
        <!-- file upload -->
        <div class="hidden">
          <svg t="1727690712772" class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9988" width="20" height="20">
            <path
              d="M664.81 64.077H157.701v892.9h707.066v-701.12L664.81 64.077z m16.897 890.327c-56.8 0-107.555-25.708-141.125-66.05h-313.81V132.7h380.962v187.307h187.962v310.3c42.067 33.316 69.033 84.655 69.033 142.258 0 100.427-81.941 181.839-183.022 181.839z"
              fill="#8a8a8a" p-id="9989"></path>
            <path
              d="M309.646 417.368h416.653v66.908H309.646zM309.646 576.948h209.427v66.908H309.646zM309.646 736.529h131.718v66.908H309.646z"
              fill="#8a8a8a" p-id="9990"></path>
            <path
              d="M795.696 630.308c-31.273-24.768-70.888-39.578-113.989-39.578-101.08 0-183.022 81.411-183.022 181.837 0 43.994 15.727 84.337 41.897 115.787 33.57 40.342 84.325 66.05 141.125 66.05 101.08 0 183.022-81.411 183.022-181.837 0-57.603-26.966-108.942-69.033-142.259z m-139.89 273.27V752.446l-43.105 42.826-36.63-36.393 109.672-108.961 36.63 36.393-0.876 0.87 65.848 65.422-36.63 36.393-43.105-42.826v157.408h-51.804z"
              fill="#8a8a8a" p-id="9991"></path>
            <path
              d="M707.609 746.17l43.105 42.826 36.63-36.393-65.848-65.422 0.876-0.87-36.63-36.393L576.07 758.879l36.631 36.393 43.105-42.826v151.132h51.803z"
              fill="#8a8a8a" p-id="9992"></path>
          </svg>
        </div>
        <input id="file-upload" @change="uploadFile" accept="image/png,image/jpeg,image/jpg,image/webp"
          name="file-upload" type="file" class="hidden" />
      </div>
    </div>
    <div class="flex items-center relative  flex-col w-full">
      <div class="w-full">
        <textarea type="text" noresize
          @keydown.enter.prevent="sendMessage"
          v-model="userInput"
          class="w-full h-28 text-base box-border pb-20 rounded-xl bg-transparent border-2 border-blue-400 p-1"
          placeholder="Please enter your question"
          :maxlength="3000"></textarea>
      </div>
      <div class="w-full flex justify-between items-center">
        <PlanInfo :free_times="free_times" :user="user" />
        <button class="rounded-xl bg-blue-400 my-1 text-white p-1 px-5" 
        :disabled="!userInput.trim()" :class="{ 'opacity-50 cursor-not-allowed': !userInput.trim() }"
          @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import PlanInfo from '../PlanInfo.vue'
import Screenshot from './Screenshot.vue'
const userInput = ref('')
import { message, Modal } from 'ant-design-vue';

const props = defineProps(['free_times', 'user'])
const emits = defineEmits(['sendMessage'])
const sendMessage = () => {
  const is_subscribed = props.user?.subscription?.is_subscribed;
  const free_times = props.free_times;
  if (free_times <= 0 && !is_subscribed) {
    Modal.confirm({
      title: 'Free Plan Limit Reached',
      content: 'Please upgrade to a pro plan before proceeding.',
      okText: 'Upgrade',
      cancelText: 'Cancel',
      onOk () {
        upgrade();
      },
      onCancel () { },
    });
    return
  }

  if (userInput.value.trim()) {
    emits('sendMessage', userInput.value, null)
    userInput.value = ''
  } else {
    message.warning("Please enter question")
  }
}

const sendImgMessage = (img_url) => {
  const is_subscribed = props.user?.subscription?.is_subscribed;
  const free_times = props.free_times;
  if (free_times <= 0 && !is_subscribed) {
    Modal.confirm({
      title: 'Free Plan Limit Reached',
      content: 'Please upgrade to a pro plan before proceeding.',
      okText: 'Upgrade',
      cancelText: 'Cancel',
      onOk () {
        upgrade();
      },
      onCancel () { },
    });
    return
  }
  emits('sendMessage', null, img_url)
}


const uploadFile = (e) => {

  const is_subscribed = props.user?.subscription?.is_subscribed;
  const free_times = props.free_times;
  if (free_times <= 0 && !is_subscribed) {
    Modal.confirm({
      title: 'Free Plan Limit Reached',
      content: 'Please upgrade to a pro plan before proceeding.',
      okText: 'Upgrade',
      cancelText: 'Cancel',
      onOk () {
        upgrade();
      },
      onCancel () { },
    });
    return
  }

  console.log(e)
  //拦截非图片
  const file = e.target.files[0]
  if (!file.type.startsWith('image/')) {
    message.warning('Please upload image')
    return
  }

  // 获取图片base64
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    console.log(reader.result)
    emits('sendMessage', null, reader.result)
  }
}

const upgrade = () => {
  chrome.runtime.sendMessage({
    msg: 'subscribed'
  })
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, 'request');
    if(request.msg==='searchImg'){
      sendImgMessage(request.data)
    }else if(request.msg==='searchText'){
      userInput.value = request.data
      sendMessage()
    }else if(request.msg==='screenshot'){
      chrome.tabs.sendMessage(tabs[0].id, { type: 'screenshot',new_tab:true });
    }
});



</script>

<style scoped>
textarea {
  resize: none;
}
</style>