import React, { useEffect, useRef, useState } from 'react';
import { getAdvisorResponse } from '../services/advisorApi';

const Advisor = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am your AI water advisor. Ask me about local water quality, safety, and usage.' },
  ]);
  const [input, setInput] = useState('');
  const [waterContext, setWaterContext] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('waterContext');
    if (saved) {
      try {
        setWaterContext(JSON.parse(saved));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
  };

  recognitionRef.current = recognition;
}, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || aiLoading) return;

    const userMessage = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAiLoading(true);

    let aiResponseText = 'I am checking the latest water data. Here is what you should know.';

    if (waterContext) {
      try {
        const result = await getAdvisorResponse(
          trimmed,
          waterContext.district,
          waterContext.waterData,
          waterContext.prediction,
          waterContext.status
        );
        aiResponseText = result.answer || aiResponseText;
      } catch (error) {
        aiResponseText = `I encountered an issue: ${error.message}. Please try again.`;
      }
    }

    setAiLoading(false);
    const aiMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText,
    };

    const speech = new SpeechSynthesisUtterance(aiResponseText);

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
    setMessages((prev) => [...prev, aiMessage]);
  };

  const startListening = () => {
  if (recognitionRef.current) {
    recognitionRef.current.start();
  }
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
    if (event.key === 'Enter' && !aiLoading) {
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
          padding: 32px 22px 48px;
          box-sizing: border-box;
        }

        .advisor-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 26px;
          max-width: 1360px;
          margin: 0 auto;
        }

        .advisor-card {
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 22px 56px rgba(5, 63, 94, 0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(13, 61, 101, 0.08);
        }

        .advisor-header {
          padding: 32px 34px 24px;
          border-bottom: 1px solid rgba(7, 60, 99, 0.06);
        }

        .advisor-header h1 {
          margin: 0;
          font-size: 2.55rem;
          letter-spacing: -0.04em;
          color: #0b3d91;
        }

        .advisor-header p {
          margin: 14px 0 0;
          color: #2d5f7f;
          font-size: 1rem;
          line-height: 1.7;
        }

        .chat-window {
          flex: 1;
          padding: 24px 32px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 500px;
          background: #f6fbff;
        }

        .message {
          max-width: 82%;
          line-height: 1.7;
          font-size: 0.99rem;
          padding: 18px 20px;
          border-radius: 24px;
          box-shadow: 0 12px 28px rgba(12, 52, 90, 0.08);
        }

        .message.user {
          margin-left: auto;
          background: #d8f3ff;
          color: #03415d;
          border-bottom-right-radius: 8px;
          border-top-right-radius: 8px;
        }

        .message.ai {
          margin-right: auto;
          background: #eef6ff;
          color: #1e516f;
          border-bottom-left-radius: 8px;
          border-top-left-radius: 8px;
        }

        .input-bar {
          padding: 24px 32px 28px;
          display: flex;
          gap: 14px;
          align-items: center;
          background: #f8fcff;
          border-top: 1px solid rgba(7, 60, 99, 0.06);
        }

        .input-bar input {
          flex: 1;
          border: 1px solid #cfeaf8;
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
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .input-bar button:hover {
          background: #095ea1;
          transform: translateY(-1px);
        }

        .suggestions-card {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .suggestions-card h2 {
          margin: 0;
          font-size: 1.55rem;
          color: #005792;
        }

        .suggestions-card p {
          margin: 8px 0 0;
          color: #4a6d86;
          line-height: 1.75;
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
          padding: 16px 20px;
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
            min-height: 420px;
          }
        }

        @media (max-width: 640px) {
          .advisor-shell {
            padding: 18px 16px 36px;
          }

          .advisor-header {
            padding: 24px 20px 18px;
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

          {waterContext && (
            <div style={{
              margin: '0 32px 18px',
              padding: '18px',
              background: '#f0f8ff',
              borderRadius: '18px',
              borderLeft: '4px solid #017b9d',
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0b5f7f', marginBottom: '10px' }}>Current Water Context</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#045269', fontWeight: 600 }}>District:</span> {waterContext.district}</div>
                <div><span style={{ color: '#045269', fontWeight: 600 }}>Status:</span> {waterContext.status}</div>
                <div><span style={{ color: '#045269', fontWeight: 600 }}>pH:</span> {waterContext.waterData?.ph}</div>
                <div><span style={{ color: '#045269', fontWeight: 600 }}>Solids:</span> {waterContext.waterData?.Solids}</div>
              </div>
            </div>
          )}

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
              disabled={aiLoading}
            />
            <button type="button" onClick={sendMessage} disabled={aiLoading}>
              {aiLoading ? 'Analyzing...' : 'Send'}
            </button>
            <button
                 type="button"
                 onClick={startListening}
               >
  {isListening ? "Listening..." : "🎤"}
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
