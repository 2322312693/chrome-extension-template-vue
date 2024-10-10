<template>
  <div class="h-16 border-b px-2 w-full shadow border-gray-300 flex items-center justify-between">
    <h1 class="text-2xl font-bold relative z-10">
      AI Homework Helper
      <div class="absolute bottom-0 left-0 w-full h-4 bg-blue-200" style="z-index: -1;"></div>
    </h1>

    <div class="flex items-center space-x-4">
      <!-- user -->
      <div class="cursor-pointer" @click="handleShowUser">
        <svg t="1727686673139" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4242" width="25" height="25">
          <path
            d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM288 810.666667c0-123.733333 100.266667-224 224-224S736 686.933333 736 810.666667c-61.866667 46.933333-140.8 74.666667-224 74.666666s-162.133333-27.733333-224-74.666666z m128-384c0-53.333333 42.666667-96 96-96s96 42.666667 96 96-42.666667 96-96 96-96-42.666667-96-96z m377.6 328.533333c-19.2-96-85.333333-174.933333-174.933333-211.2 32-29.866667 51.2-70.4 51.2-117.333333 0-87.466667-72.533333-160-160-160s-160 72.533333-160 160c0 46.933333 19.2 87.466667 51.2 117.333333-89.6 36.266667-155.733333 115.2-174.933334 211.2-55.466667-66.133333-91.733333-149.333333-91.733333-243.2 0-204.8 168.533333-373.333333 373.333333-373.333333S885.333333 307.2 885.333333 512c0 93.866667-34.133333 177.066667-91.733333 243.2z"
            fill="#666666" p-id="4243"></path>
        </svg>
      </div>
      <!-- 放大 -->
      <!-- <div @click="handleShowAll" class="cursor-pointer">
        <svg t="1727686706920" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6321" width="20" height="20">
          <path
            d="M852.68743 966.232318 171.311547 966.232318c-62.714867 0-113.562988-50.846038-113.562988-113.558335L57.748558 171.324994c0-62.712297 50.848122-113.558335 113.562988-113.558335l681.376907 0c62.714867 0 113.562988 50.846038 113.562988 113.558335l0 681.348989C966.250418 915.38628 915.40332 966.232318 852.68743 966.232318zM909.469948 171.324994c0-31.356149-25.424061-56.779168-56.781494-56.779168L171.311547 114.545826c-31.357433 0-56.781494 25.423019-56.781494 56.779168l0 681.348989c0 31.357172 25.424061 56.779168 56.781494 56.779168l681.376907 0c31.358457 0 56.781494-25.423019 56.781494-56.779168L909.469948 171.324994zM824.297706 483.610416c-15.665413 0-28.390747-12.697183-28.390747-28.389584l0.887243-186.638771L604.102866 461.264479l-40.145947-40.144302 193.023924-193.016015L568.782006 228.104161c-15.693044 0-28.390747-12.697183-28.390747-28.389584s12.697704-28.389584 28.390747-28.389584l254.711349 0c7.929925 0 15.082105 3.27151 20.238756 8.53949 5.490263 4.657067 8.955319 11.449773 8.955319 19.850094l0 255.506255C852.68743 470.913233 839.989727 483.610416 824.297706 483.610416zM455.219017 852.673983 200.506645 852.673983c-7.929925 0-15.082105-3.270487-20.239779-8.538467-5.489239-4.65809-8.955319-11.423167-8.955319-19.850094L171.311547 568.779168c0-15.692401 12.726357-28.389584 28.390747-28.389584 15.69202 0 28.390747 12.697183 28.390747 28.389584l-0.887243 186.6664 192.690312-192.710047 40.173577 40.143279-193.050531 193.016015 188.198837 0c15.69202 0 28.390747 12.697183 28.390747 28.389584C483.608741 839.9768 470.911038 852.673983 455.219017 852.673983z"
            fill="#272636" p-id="6322"></path>
        </svg>
      </div> -->


    </div>



    <a-modal :footer="null" v-model:open="showUser" title="">
      <div class="flex items-center" :class="!user?.profile ? 'pt-7' : ''">
        <img class="h-10 w-10 rounded-full mr-3" :src="user?.profile?.avatar || avatar" alt="" />
        <div class="flex" v-if="user?.profile">
          <div class="flex flex-col">
            <span class="text-nowrap">
              <span class="text-blue-400">Current Plan : </span> 
              {{ user?.subscription.detail ? 'Pro Plan' : 'Free' }}</span>
            <span class="w-28 truncate ">
              <span class="text-blue-400 mr-1" >name:</span>
              <span class=" ">{{ user.profile.email }}</span>
            </span>
            <span v-if="user?.subscription.free_cnt">
              <span class="text-blue-400 mr-1">credits : </span>
              {{ user?.subscription.free_cnt }} </span>
            <span v-else>
              <span class="text-blue-400 mr-1">Free Times : </span>
              {{ Math.max(0, free_times) }}</span>
            <a-button type="link" size="small" class="text-left w-5 !px-0 !mx-0" @click="handleLogout">Logout</a-button>
          </div>
          <div class="flex items-end">
            <a-button type="primary" @click="upgrade()">Upgrade</a-button>
          </div>
        </div>
        <div class="flex items-center justify-between w-full" v-else>
          <div class="flex flex-col">
            <p>Free Times: {{ Math.max(0, free_times) }}</p>
          </div>

          <a-button type="primary" class="border underline" @click="login(false)">Login</a-button>
        </div>
      </div>
    </a-modal>
  </div>



</template>

<script setup>
import { ref, onMounted } from 'vue';
const user = ref({});
const showUser = ref(false);
const showAll = ref(false);
import avatar from '../assets/avatar.png';
import { message, Modal } from 'ant-design-vue';


const free_times = ref(0);

const handleShowUser = () => {
  showUser.value = true;
};

const handleLogout = () => {
  // 清除user 和 chrome.storage
  user.value = {};
  chrome.storage.local.remove('user');
  let openner = window.open('https://www.livepolls.app/ai_homework_helper/user/logout', '_blank');
  setTimeout(() => {
    openner.close();
    login(false);
  }, 1000);
};

onMounted(async () => {
  let user_info = await chrome.runtime.sendMessage({ msg: 'get_user', byStorage: true });
  const jwt = user_info.jwt;
  window.g_app_jwt = jwt;
  window.g_user_jwt = jwt;
  user.value = user_info?.user;
  free_times.value = user_info?.free_times;


  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, 'request');
    if (request.type === 'loginSuccess') {
      if (!user.value && request.user) {
        //ui库提示登录成功
        message.success('Login Success');
      }
      user.value = request.user;
      if (request.free_times !== -1) {
        free_times.value = Math.max(0, request.free_times);
      }
    }else if(request.type==='updateFreeTimes'){
      free_times.value = Math.max(0, request.free_times);
    }
  });


})

const login = async (upgrade = false) => {
  chrome.runtime.sendMessage({ msg: 'login', data: upgrade });
};
const upgrade = async () => {
  chrome.runtime.sendMessage({ msg: 'subscribed' });
};




//将user 导出
defineExpose({
  user,
  free_times
})

</script>

<style scoped></style>