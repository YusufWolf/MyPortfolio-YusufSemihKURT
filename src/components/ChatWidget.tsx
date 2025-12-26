import { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, serverTimestamp, set } from 'firebase/database';
import { database } from '../firebase/config';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  email?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const messagesRef = ref(database, 'chat/messages');
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const messagesList: Message[] = Object.entries(data)
            .map(([id, msg]: [string, any]) => ({
              id,
              ...msg
            }))
            .sort((a, b) => a.timestamp - b.timestamp);
          setMessages(messagesList);
        }
      });

      return () => unsubscribe();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim() || isSending) return;

    setIsSending(true);
    const messagesRef = ref(database, 'chat/messages');
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
      name: name.trim(),
      email: email.trim() || 'No email provided',
      message: message.trim(),
      timestamp: serverTimestamp()
    });

    // Send notification to admin (you)
    const notificationsRef = ref(database, 'notifications');
    await push(notificationsRef, {
      type: 'new_message',
      name: name.trim(),
      email: email.trim() || 'No email provided',
      message: message.trim(),
      timestamp: serverTimestamp(),
      read: false
    });

    setMessage('');
    setIsSending(false);
  };

  if (!isOpen && !isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-fuchsia-600 text-white p-4 rounded-full shadow-lg hover:bg-fuchsia-500 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col ${
            isMinimized ? 'h-16' : 'h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-fuchsia-600" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {t('chat.title')}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                aria-label="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-500 dark:text-slate-400 text-sm py-8">
                    {t('chat.noMessages')}
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {msg.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {msg.timestamp
                            ? new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : ''}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('chat.namePlaceholder')}
                  required
                  className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('chat.emailPlaceholder')}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('chat.messagePlaceholder')}
                    required
                    className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !message.trim() || !name.trim()}
                    className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  {t('chat.disclaimer')}
                </p>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

