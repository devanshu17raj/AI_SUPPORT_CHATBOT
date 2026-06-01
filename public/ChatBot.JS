(function () {
  // 1. Grab the owner ID from the script tag attributes
  const scriptTag = document.currentScript || document.querySelector('script[data-owner-id]');
  const ownerId = scriptTag ? scriptTag.getAttribute('data-owner-id') : null;

  if (!ownerId) {
    console.error("AI Support Widget Error: Missing data-owner-id attribute.");
    return;
  }

  // Avatar URLs (Using clean placeholders)
  // Updated AI background to neutral gray for dark theme compatibility
  const AI_AVATAR = "https://api.dicebear.com/7.x/bottts/svg?seed=support&backgroundColor=d1d5db";
  const USER_AVATAR = "https://api.dicebear.com/7.x/adventurer/svg?seed=customer&backgroundColor=ffdfbf";

  // 2. Create the floating action button (FAB) - NOW BLACK
  const button = document.createElement("div");
  button.innerHTML = "💬";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "30px",
    backgroundColor: "#18181b", // Deep Black/Zinc shade
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "28px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
    zIndex: "999999",
    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  });
  
  // Hover effect remains smooth
  button.onmouseenter = () => button.style.transform = "scale(1.1)";
  button.onmouseleave = () => button.style.transform = "scale(1)";
  document.body.appendChild(button);

  // 3. Create the chat window container
  const chatWindow = document.createElement("div");
  Object.assign(chatWindow.style, {
    position: "fixed",
    bottom: "100px",
    right: "24px",
    width: "380px",
    height: "560px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    display: "none", 
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999999",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    border: "1px solid #f3f4f6",
    transition: "all 0.2s ease-in-out",
  });
  document.body.appendChild(chatWindow);

  // 4. Inject Premium Layout - HEADERS & ACCENTS CHANGED TO BLACK
  chatWindow.innerHTML = `
    <div style="background: linear-gradient(135deg, #18181b 0%, #000000 100%); color: white; padding: 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.1);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="${AI_AVATAR}" alt="AI" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); background: #fff;" />
        <div>
          <div style="font-weight: 600; font-size: 16px; letter-spacing: -0.01em;">Support Assistant</div>
          <div style="font-size: 12px; color: #a1a1aa; display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; background: #e4e4e7; border-radius: 50%; display: inline-block;"></span> Online
          </div>
        </div>
      </div>
      <span id="close-chat" style="cursor: pointer; font-size: 20px; padding: 4px; color: #71717a; transition: color 0.2s;">✕</span>
    </div>

    <div id="chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 10px; align-self: flex-start; max-width: 85%;">
        <img src="${AI_AVATAR}" style="width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; align-self: flex-end;" />
        <div style="background: #ffffff; color: #1e293b; padding: 12px 16px; border-radius: 16px 16px 16px 4px; font-size: 14px; line-height: 1.5; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
          Hello! How can I help you with our business services today?
        </div>
      </div>
    </div>

    <div style="padding: 16px; border-top: 1px solid #f1f5f9; display: flex; gap: 10px; background: #ffffff; align-items: center;">
      <input id="chat-input" type="text" placeholder="Type a message..." style="flex: 1; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 24px; outline: none; font-size: 14px; color: #334155; background: #f8fafc; transition: border-color 0.2s;" />
      <button id="chat-send" style="background: #18181b; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px; transform: rotate(45deg); margin-left: -2px; margin-top: 2px;">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.977a.75.75 0 0 0 .696.538h7.562a.75.75 0 0 1 0 1.5H5.68a.75.75 0 0 0-.696.538l-2.432 7.977a.75.75 0 0 0 .926.941l18.11-8.777a.75.75 0 0 0 0-1.354L3.478 2.404Z" />
        </svg>
      </button>
    </div>
  `;

  // 5. Interactive Functionality
  const messagesContainer = chatWindow.querySelector("#chat-messages");
  const inputField = chatWindow.querySelector("#chat-input");
  const sendButton = chatWindow.querySelector("#chat-send");
  const closeButton = chatWindow.querySelector("#close-chat");

  // Input Focus effect - neutral gray
  inputField.onfocus = () => inputField.style.borderColor = "#71717a";
  inputField.onblur = () => inputField.style.borderColor = "#e2e8f0";

  button.addEventListener("click", () => {
    const isHidden = chatWindow.style.display === "none";
    chatWindow.style.display = isHidden ? "flex" : "none";
  });

  closeButton.addEventListener("click", () => chatWindow.style.display = "none");

  async function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    inputField.value = "";

    const loadingWrapper = appendMessage("Thinking...", "ai", true);

    try {
      // Hits working API route hosted locally
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, ownerId: ownerId }),
      });

      const data = await res.json();
      loadingWrapper.remove(); 

      if (data.reply) {
        appendMessage(data.reply, "ai");
      } else {
        appendMessage("Sorry, I encountered an issue. Please try again.", "ai");
      }
    } catch (err) {
      console.error("Widget API Error:", err);
      loadingWrapper.remove();
      appendMessage("Unable to connect to the assistant server.", "ai");
    }
  }

  // Helper function - USER BUBBLES NOW BLACK
  function appendMessage(text, sender, isLoadingState = false) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "10px";
    wrapper.style.maxWidth = "85%";
    wrapper.style.alignSelf = sender === "user" ? "flex-end" : "flex-start";

    const img = document.createElement("img");
    img.src = sender === "user" ? USER_AVATAR : AI_AVATAR;
    img.style.cssText = "width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; align-self: flex-end;";

    const msg = document.createElement("div");
    msg.innerText = text;
    
    Object.assign(msg.style, {
      padding: "12px 16px",
      borderRadius: sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
      fontSize: "14px",
      lineHeight: "1.5",
      backgroundColor: sender === "user" ? "#27272a" : "#ffffff", // User bubble deep charcoal
      color: sender === "user" ? "#ffffff" : "#1e293b",
      boxShadow: sender === "user" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
      border: sender === "user" ? "none" : "1px solid #f1f5f9",
    });

    if (isLoadingState) {
      msg.style.color = "#94a3b8";
      msg.style.fontStyle = "italic";
    }

    if (sender === "user") {
      wrapper.appendChild(msg);
      wrapper.appendChild(img);
    } else {
      wrapper.appendChild(img);
      wrapper.appendChild(msg);
    }

    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    return wrapper;
  }

  sendButton.addEventListener("click", handleSend);
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
})();