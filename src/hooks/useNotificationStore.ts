
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: Date;
};

type NotificationStore = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: uuidv4(),
      title: 'Welcome',
      message: 'Welcome to your dashboard',
      type: 'info',
      read: false,
      date: new Date()
    },
    {
      id: uuidv4(),
      title: 'New order',
      message: 'You have received a new order',
      type: 'success',
      read: false,
      date: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: uuidv4(),
      title: 'System update',
      message: 'The system will be updated tonight at 2 AM',
      type: 'warning',
      read: true,
      date: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    }
  ],
  unreadCount: 2,
  
  addNotification: (notification) => {
    const newNotification = {
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
      const unreadCount = updatedNotifications.filter((n) => !n.read).length;
      
      return {
        notifications: updatedNotifications,
        unreadCount
      };
    });
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true
      })),
      unreadCount: 0
    }));
  },
  
  removeNotification: (id) => {
    set((state) => {
      const wasUnread = state.notifications.find((n) => n.id === id && !n.read);
      const filteredNotifications = state.notifications.filter((notification) => notification.id !== id);
      
      return {
        notifications: filteredNotifications,
        unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount
      };
    });
  },
  
  clearAllNotifications: () => {
    set({
      notifications: [],
      unreadCount: 0
    });
  }
}));
