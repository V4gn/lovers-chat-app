import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const users = {
  "7beb-wareef": {
    password: "7beb-wareef",
  },
  "dlo3t-naif": {
    password: "dlo3t-naif",
  },
};

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const handleLogin = () => {
    if (users[username] && users[username].password === password) {
      setLoggedIn(true);
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { user: username, text: input };
      setMessages([...messages, newMessage]);
      triggerHeartsIfNeeded(input);
      setInput("");
    }
  };

  const triggerHeartsIfNeeded = (text) => {
    const triggers = ["نايف", "احبك", "وريف"];
    if (triggers.some((word) => text.includes(word))) {
      createFlyingHearts();
    }
  };

  const createFlyingHearts = () => {
    const heartContainer = document.createElement("div");
    heartContainer.className = "heart-container";
    document.body.appendChild(heartContainer);

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heartContainer.appendChild(heart);
    }

    setTimeout(() => {
      document.body.removeChild(heartContainer);
    }, 3000);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <h1>💕 Lovers Login 💕</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <h2>💌 Lovers Chat 💌</h2>
      <div ref={chatRef} className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.user === username ? "me" : "them"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          placeholder="Send something sweet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
