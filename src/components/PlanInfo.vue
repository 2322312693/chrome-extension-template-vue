<template>
  <div class="flex items-center space-x-2">
    <a-tooltip>
      <template #title>{{ user?.subscription?.is_subscribed ? 'Pro Plan' : 'Free' }}</template>
      <div class="relative bg-blue-400 w-14 justify-evenly h-6 flex items-center rounded-lg px-1 group">
        <span>🤖</span>
        <span class="text-gray-100 text-lg" v-if="user?.subscription?.is_subscribed">∞</span>
        <span class="text-gray-100" v-else>{{ free_times }}</span>
      </div>
    </a-tooltip>

    <div v-if="!user?.subscription?.is_subscribed">
      <a-button size="small" type="link" @click="buy">Upgrade</a-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['free_times', 'user']);

const buy = () => {
  chrome.runtime.sendMessage({
    msg: 'subscribed'
  })
}
</script>