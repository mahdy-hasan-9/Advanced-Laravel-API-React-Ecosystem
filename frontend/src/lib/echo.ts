import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;

/**
 * Laravel Echo instance configured for Reverb (WebSocket).
 *
 * NOTE: `auth.headers` uses a getter so the Bearer token is always
 * read fresh from localStorage — not cached at module‑load time.
 * This fixes the stale‑token bug when the user logs in after the
 * JS bundle has already been evaluated.
 */
const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
    auth: {
        headers: {
            get Authorization() {
                return `Bearer ${localStorage.getItem('token')}`;
            },
            Accept: 'application/json',
        },
    },
});

// Connection lifecycle logging (dev only)
try {
    const pusher = (echo as any).connector?.pusher;
    if (pusher?.connection) {
        pusher.connection.bind('error', (err: any) => {
            console.error('[Echo] Connection error:', err);
        });
        pusher.connection.bind('connected', () => {
            console.log('[Echo] Connected successfully');
        });
        pusher.connection.bind('disconnected', () => {
            console.warn('[Echo] Disconnected');
        });
    }
} catch (e) {
    console.warn('[Echo] Could not attach connection listeners:', e);
}

export default echo;
