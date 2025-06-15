
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export interface Notification {
  id: number;
  type: string;
  title: string;
  description: string;
  amount?: string;
  image: string;
  status: string;
  time: string;
}

interface NotificationListProps {
  notifications: Notification[];
  activeTab: string;
  onNotificationClick: (notification: Notification) => void;
  getStatusColor: (status: string) => string;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, activeTab, onNotificationClick, getStatusColor }) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-foreground" />
        </div>
        <p className="text-foreground text-sm">No tienes notificaciones en {activeTab.toLowerCase()}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
          onClick={() => onNotificationClick(notification)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <img
                src={notification.image}
                alt={notification.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-foreground font-semibold text-sm">{notification.title}</h3>
                  {notification.amount && (
                    <span className="text-foreground font-bold text-sm">{notification.amount}</span>
                  )}
                </div>
                <p className="text-foreground text-sm mb-2 line-clamp-2">{notification.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${getStatusColor(notification.status)}`}>
                    {notification.status}
                  </span>
                  <span className="text-xs text-foreground">{notification.time}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;
