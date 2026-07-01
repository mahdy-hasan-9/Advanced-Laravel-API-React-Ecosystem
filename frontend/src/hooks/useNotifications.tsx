import { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import echo from '../lib/echo';
import { fetchNotifications, markNotificationAsRead } from '../services/notificationApi';
import type { ApiNotification, NotificationData } from '../types/notification';

/* -------------------------------------------------------------------------- */
/*  Return type — all consumers rely on this shape                            */
/* -------------------------------------------------------------------------- */
interface UseNotificationsReturn {
    notifications: NotificationData[];
    unreadCount: number;
    loading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => void;
    clearAll: () => void;
    refetchNotifications: () => void;
    newNotificationCount: number;
}

/* -------------------------------------------------------------------------- */
/*  Hook: centralised notification state + real‑time via Reverb               */
/* -------------------------------------------------------------------------- */
export const useNotifications = (userId: number | undefined): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [newNotificationCount, setNewNotificationCount] = useState(0);
    const isSubscribed = useRef(false);

    /* ---------------------------------------------------------------------- */
    /*  Helper: format API response to local NotificationData shape           */
    /* ---------------------------------------------------------------------- */
    const formatNotification = (item: ApiNotification): NotificationData => ({
        id: item.id,
        heading: item.data.heading,
        description: item.data.description,
        student_id: item.data.student_id,
        read_at: item.read_at,
        created_at: item.created_at,
    });

    /* ---------------------------------------------------------------------- */
    /*  1. Initial load — fetch from API once userId is available             */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const load = async () => {
            try {
                setLoading(true);
                const resp = await fetchNotifications();
                setNotifications(resp.data.map(formatNotification));
            } catch (err) {
                console.error('Failed to load notifications:', err);
                message.error('Could not load notifications');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [userId]);

    /* ---------------------------------------------------------------------- */
    /*  2. Real‑time — subscribe to private user channel via Reverb           */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
        if (!userId || isSubscribed.current) return;
        isSubscribed.current = true;

        const channelName = `App.Models.User.${userId}`;
        const channel = echo.private(channelName);

        console.log('[Echo] Subscribing to:', channelName);

        channel.notification((payload: any) => {
            console.log('[Echo] Notification received:', payload);

            try {
                // Reverb may deliver data nested under `payload.data` or flat
                const data = payload.data ?? payload;

                const newNotif: NotificationData = {
                    id: payload.id,
                    heading: data.heading,
                    description: data.description,
                    student_id: data.student_id,
                    read_at: null,
                    created_at: payload.created_at ?? data.created_at ?? new Date().toISOString(),
                };

                setNotifications((prev) => [newNotif, ...prev]);
                setNewNotificationCount((c) => c + 1);
                message.info(`🔔 ${newNotif.heading}`);
            } catch (err) {
                console.error('[Echo] Failed to process notification:', err, payload);
            }
        });

        return () => {
            echo.leave(channelName);
            isSubscribed.current = false;
        };
    }, [userId]);

    /* ---------------------------------------------------------------------- */
    /*  3. Mark a single notification as read                                 */
    /* ---------------------------------------------------------------------- */
    const markAsRead = useCallback(async (id: string) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
            );
            message.success('Notification marked as read');
        } catch (err) {
            console.error('Failed to mark as read:', err);
            message.error('Could not mark notification as read');
        }
    }, []);

    /* ---------------------------------------------------------------------- */
    /*  4. Mark all as read (optimistic UI)                                   */
    /* ---------------------------------------------------------------------- */
    const markAllAsRead = useCallback(() => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })),
        );
    }, []);

    /* ---------------------------------------------------------------------- */
    /*  5. Clear all (e.g. on logout)                                         */
    /* ---------------------------------------------------------------------- */
    const clearAll = useCallback(() => setNotifications([]), []);

    /* ---------------------------------------------------------------------- */
    /*  6. Manual refetch                                                     */
    /* ---------------------------------------------------------------------- */
    const refetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const resp = await fetchNotifications();
            setNotifications(resp.data.map(formatNotification));
            setNewNotificationCount(0);
        } catch (err) {
            console.error('Failed to reload notifications:', err);
            message.error('Could not reload notifications');
        } finally {
            setLoading(false);
        }
    }, []);

    /* ---------------------------------------------------------------------- */
    /*  Derived: unread count                                                 */
    /* ---------------------------------------------------------------------- */
    const unreadCount = notifications.filter((n) => !n.read_at).length;

    return {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        clearAll,
        refetchNotifications,
        newNotificationCount,
    };
};
