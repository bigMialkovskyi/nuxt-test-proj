// stores/notificationStore.ts
import { defineStore } from 'pinia';
import { DEFAULT_DELAY } from "./constansts"
export interface INotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  delay?: number;
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as INotification[],
  }),
  actions: {
    addNotification(notification: Omit<INotification, 'id'>) {
      const id = Math.random().toString(36).substring(2, 9); // Generate a unique ID
      this.notifications.push({ ...notification, id });

      setTimeout(()=> {
        this.removeNotification(id)
      }, notification.delay || DEFAULT_DELAY)
    },
    removeNotification(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
  },
});
