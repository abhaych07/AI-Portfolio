import { useState } from "react";
import axios from "axios";
import {
  Bot,
  Send,
  Sparkles,
  User,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const suggestedQuestions = [
  "What are Abhay's technical skills?",
  "Tell me about his projects.",
  "What is his educational background?",
  "What backend technologies does he know?",
];

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Abhay's AI assistant. You can ask me anything about his resume, skills, projects, education, experience, or technical background.",
    },
  ]);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = question) => {
    const trimmedQuestion = text.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    // Add user's message immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: trimmedQuestion,
      },
    ]);

    setQuestion("");

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          question: trimmedQuestion,
        }
      );

      const answer = response.data.answer;

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: answer,
        },
      ]);

    } catch (error) {

      console.error("Chat error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI backend. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage();
  };

  return (
    <section id="ai" className="ai-section">

      <div className="section-label">
        <span>01</span>
        AI ASSISTANT
      </div>

      <div className="ai-intro">

        <div className="ai-title-icon">
          <Sparkles size={22} />
        </div>

        <h2>
          Ask Abhay's <span>AI</span>
        </h2>

        <p>
          Want to know more about my skills, projects,
          education or experience? Just ask.
        </p>

      </div>

      <div className="ai-chat-window">

        {/* Header */}

        <div className="ai-chat-header">

          <div className="ai-profile">

            <div className="ai-avatar">
              <Bot size={22} />
            </div>

            <div>

              <h3>
                Abhay's AI Assistant
              </h3>

              <div className="ai-status">
                <span></span>
                {loading ? "Thinking..." : "Online"}
              </div>

            </div>

          </div>

          <div className="ai-header-badge">
            Resume AI
          </div>

        </div>

        {/* Messages */}

        <div className="ai-messages">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`message-row ${
                message.role === "user"
                  ? "user-message"
                  : "assistant-message"
              }`}
            >

              <div className="message-avatar">

                {message.role === "assistant" ? (
                  <Bot size={17} />
                ) : (
                  <User size={17} />
                )}

              </div>

              <div className="message-bubble">
                {message.content}
              </div>

            </div>

          ))}

          {/* Loading message */}

          {loading && (
            <div className="message-row assistant-message">

              <div className="message-avatar">
                <Bot size={17} />
              </div>

              <div className="message-bubble">
                Thinking...
              </div>

            </div>
          )}

        </div>

        {/* Suggested questions */}

        <div className="suggested-questions">

          <p>
            Try asking:
          </p>

          <div className="suggestion-list">

            {suggestedQuestions.map(
              (suggestion, index) => (

                <button
                  key={index}
                  onClick={() =>
                    sendMessage(suggestion)
                  }
                  disabled={loading}
                >
                  {suggestion}
                </button>

              )
            )}

          </div>

        </div>

        {/* Input */}

        <form
          className="ai-input-container"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Ask something about Abhay..."
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            disabled={loading}
          />

          <button
            type="submit"
            disabled={
              !question.trim() || loading
            }
            aria-label="Send message"
          >
            <Send size={19} />
          </button>

        </form>

      </div>

      <p className="ai-disclaimer">
        AI answers are generated from Abhay's
        resume information.
      </p>

    </section>
  );
}

export default AIChat;