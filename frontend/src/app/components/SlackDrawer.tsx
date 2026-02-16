import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface SlackDrawerProps {
  content: any;
  onClose: () => void;
}

export function SlackDrawer({ content, onClose }: SlackDrawerProps) {
  const [message, setMessage] = useState(
    `Hi ${content.claimedBy?.name}, I wanted to discuss "${content.title}" with you. Do you have a moment?`
  );
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'You',
      text: message,
      time: '10:30 AM',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          sender: 'You',
          text: message,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setMessage('');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 w-2/5 bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between" style={{ borderColor: '#C4C4C4' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={content.claimedBy?.avatar}
                alt={content.claimedBy?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg" style={{ color: '#2E2E2E' }}>{content.claimedBy?.name}</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm" style={{ color: '#575757' }}>Active</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" style={{ color: '#2E2E2E' }} />
          </button>
        </div>

        {/* Topic Context */}
        <div className="p-4 border-b" style={{ backgroundColor: '#F5F5F5', borderColor: '#C4C4C4' }}>
          <p className="text-sm mb-1" style={{ color: '#575757' }}>Discussing:</p>
          <p style={{ color: '#2E2E2E' }}>{content.title}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm" style={{ color: '#2E2E2E' }}>{msg.sender}</span>
                <span className="text-xs" style={{ color: '#575757' }}>{msg.time}</span>
              </div>
              <div
                className="inline-block max-w-md p-3 rounded-lg"
                style={{
                  backgroundColor: msg.sender === 'You' ? '#2E2E2E' : '#F5F5F5',
                  color: msg.sender === 'You' ? '#FFFFFF' : '#2E2E2E',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4" style={{ borderColor: '#C4C4C4' }}>
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={handleSend}
              className="h-auto"
              style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
