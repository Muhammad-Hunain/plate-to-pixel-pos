
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  date: Date;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => {
    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      read: false,
      date: new Date()
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },
  
  markAsRead: (id) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      
      return {
        notifications: updatedNotifications,
        unreadCount
      };
    });
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
      unreadCount: 0
    }));
  },
  
  removeNotification: (id) => {
    set((state) => {
      const wasUnread = state.notifications.find(n => n.id === id && !n.read);
      const filteredNotifications = state.notifications.filter((notification) => notification.id !== id);
      
      return {
        notifications: filteredNotifications,
        unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount
      };
    });
  },
  
  clearAllNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));
