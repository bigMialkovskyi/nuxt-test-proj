<!-- components/Notifications.vue -->
<template>
  <div class="notifications">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['notification', notification.type]"
    >
      <span>{{ notification.message }}</span>
      <button @click="remove(notification.id)">X</button>
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

<style scoped>
.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notification {
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  animation: fadeIn 0.3s ease-out, fadeOut 0.3s ease-in 3s forwards;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

.notification.info {
  background-color: #2196f3;
}

.notification.warning {
  background-color: #ff9800;
}

button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
