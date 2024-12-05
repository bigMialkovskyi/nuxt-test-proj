<template>
    <div
      class="fixed top-4 right-4 z-[1000] flex flex-col gap-2"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'p-4 rounded shadow flex justify-between items-center text-white animate-fade-in-out',
          notificationTypesClassesMap[notification.type],
        ]"
      >
        <span class="whitespace-pre-wrap">{{ notification.message }}</span>
        <button
          class="bg-none border-none text-inherit cursor-pointer text-lg ml-4"
          @click="remove(notification.id)"
        >
          X
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useNotificationStore } from "@stores/notifications";
  import type { INotification } from "@stores/notifications";
  
  const notificationStore = useNotificationStore();
  const notifications = computed(() => notificationStore.notifications);
  
  const remove = (id: string) => {
    notificationStore.removeNotification(id);
  };
  
  const notificationTypesClassesMap: Record<INotification["type"], string> = {
    "error": "bg-red-400",
    "success": "bg-green-400",
    "info": "bg-blue-500",
    "warning": "bg-orange-400",
  }
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