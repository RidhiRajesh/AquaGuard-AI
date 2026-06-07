import React, { useEffect, useRef, useState } from 'react';

const Advisor = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am your AI water advisor. Ask me about local water quality, safety, and usage.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { id: Date.now(), sender: 'user', text: trimmed };
    const aiMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: 'I am checking the latest water data. Here is what you should know.',
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  const suggestedQuestions = [
    'Is water safe in Chennai today?',
    'Why is TDS high?',
    'What does pH indicate?',
    'Can I use this water for drinking?',
    'What should I do during contamination alerts?',
  ];

  const handleSuggestion = (question) => {
    setInput(question);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="advisor-shell">
      <style>{`
        .advisor-shell {
          min-height: 100vh;
          background: linear-gradient(180deg, #e3f7ff 0%, #f7fdff 100%);
          color: #053f5e;
          padding: 32px;
          box-sizing: border-box;
        }

        .advisor-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 24px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .advisor-card {
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 18px 45px rgba(5, 63, 94, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .advisor-header {
          padding: 32px 32px 24px;
        }

        .advisor-header h1 {
          margin: 0;
          font-size: 2.4rem;
          letter-spacing: -0.04em;
          color: #0b3d91;
        }

        .advisor-header p {
          margin: 12px 0 0;
          color: #2d5f7f;
          font-size: 1rem;
        }

        .chat-window {
          flex: 1;
          padding: 0 32px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 460px;
        }

        .message {
          max-width: 78%;
          line-height: 1.6;
          font-size: 0.98rem;
          padding: 16px 18px;
          border-radius: 22px;
          box-shadow: 0 10px 25px rgba(12, 52, 90, 0.08);
        }

        .message.user {
          margin-left: auto;
          background: #d9f6ff;
          color: #03415d;
          border-bottom-right-radius: 6px;
        }

        .message.ai {
          margin-right: auto;
          background: #f1fbff;
          color: #1e516f;
          border-bottom-left-radius: 6px;
        }

        .input-bar {
          padding: 24px 32px 32px;
          display: flex;
          gap: 14px;
          align-items: center;
          background: #f6fcff;
        }

        .input-bar input {
          flex: 1;
          border: 1px solid #cbe9ff;
          border-radius: 18px;
          padding: 16px 18px;
          font-size: 1rem;
          outline: none;
          color: #073049;
          background: #ffffff;
        }

        .input-bar button {
          border: none;
          border-radius: 18px;
          padding: 16px 24px;
          background: #0f71c8;
          color: #ffffff;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .input-bar button:hover {
          background: #095ea1;
        }

        .suggestions-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .suggestions-card h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #005792;
        }

        .suggestions-card p {
          margin: 8px 0 0;
          color: #4a6d86;
          line-height: 1.6;
        }

        .suggestion-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }

        .suggestion-item {
          background: #f2faff;
          border: 1px solid #cdeefb;
          border-radius: 16px;
          padding: 14px 18px;
          cursor: pointer;
          color: #0c3f66;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .suggestion-item:hover {
          transform: translateY(-1px);
          background: #e0f3ff;
        }

        @media (max-width: 960px) {
          .advisor-grid {
            grid-template-columns: 1fr;
          }

          .chat-window {
            min-height: 380px;
          }
        }

        @media (max-width: 640px) {
          .advisor-shell {
            padding: 18px;
          }

          .advisor-header {
            padding: 24px 24px 18px;
          }

          .input-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .input-bar button {
            width: 100%;
          }
        }
      `}</style>

      <div className="advisor-grid">
        <section className="advisor-card">
          <div className="advisor-header">
            <h1>AI Water Advisor</h1>
            <p>Ask questions about local water quality, safety and usage.</p>
          </div>

          <div className="chat-window">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="input-bar">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              aria-label="Ask a question"
            />
            <button type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>

        <aside className="advisor-card suggestions-card">
          <h2>Suggested Questions</h2>
          <p>Tap a question to start a conversation about water safety and quality.</p>
          <ul className="suggestion-list">
            {suggestedQuestions.map((question) => (
              <li
                key={question}
                className="suggestion-item"
                onClick={() => handleSuggestion(question)}
              >
                {question}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Advisor;
