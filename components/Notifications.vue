<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="[
        'flex items-center justify-between p-4 rounded shadow-md text-white animate-fade-in-out',
        notification.type === 'success' && 'bg-green-500',
        notification.type === 'error' && 'bg-red-500',
        notification.type === 'info' && 'bg-blue-500',
        notification.type === 'warning' && 'bg-yellow-500',
      ]"
    >
      <span class="whitespace-pre-wrap">{{ notification.message }}</span>
      <button
        class="ml-4 text-lg font-bold text-white hover:opacity-70"
        @click="remove(notification.id)"
      >
        X
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@stores/notifications";

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

const remove = (id: string) => {
  notificationStore.removeNotification(id);
};
</script>

<style>
@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.animate-fade-in-out {
  animation: fade-in-out 3s ease-in-out forwards;
}
</style>
