// Hook that returns a memoized Socket.io client
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (enabled: boolean, token?: string) => {
      const [connected, setConnected] = useState(false);
      const ref = useRef<Socket | null>(null);

      useEffect(() => {
            if (!enabled) return;
            const s = io(import.meta.env.VITE_SOCKET_URL, {
                  auth: { token }
            });
            ref.current = s;
            s.on('connect', () => setConnected(true));
            s.on('disconnect', () => setConnected(false));
            return () => {
                  s.disconnect();
                  ref.current = null;
            };
      }, [enabled, token]);

      return connected ? ref.current : null;
};
