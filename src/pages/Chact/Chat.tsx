import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../services/socket';
import { useChatStore } from '../../store/chat';
import { useAuthStore } from '../../store/auth';
import cls from './Chat.module.scss';

const Chat = () => {
      const { id: roomId } = useParams();
      const { token } = useAuthStore();
      const socket = useSocket(!!token, token!);
      const { messages, addMessage } = useChatStore();
      const [text, setText] = useState('');

      // Subscribe to messages
      useEffect(() => {
            if (!socket || !roomId) return;
            socket.emit('join', roomId);
            socket.on('message', (msg) => addMessage(roomId, msg));
            return () => {
                  socket.off('message');
            };
      }, [socket, roomId]);

      const send = () => {
            if (!socket || !roomId) return;
            socket.emit('message', { roomId, body: text });
            setText('');
      };

      return (
            <section className={cls.chat}>
                  <div className={cls.messages}>
                        {(messages[roomId!] || []).map((m) => (
                              <p key={m._id}>{m.body}</p>
                        ))}
                  </div>
                  <div className={cls.input}>
                        <input value={text} onChange={(e) => setText(e.target.value)} />
                        <button onClick={send}>➤</button>
                  </div>
            </section>
      );
};
export default Chat;
