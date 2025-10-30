document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const messagesContainer = document.getElementById("chatMessages");

  const knowledgeBase = {
    "imposto de renda": {
      keywords: ["imposto de renda", "ir", "irpf", "declaração"],
      response:
        "O Imposto de Renda é um tributo federal cobrado anualmente sobre os rendimentos de pessoas físicas e jurídicas. Para pessoas físicas, é obrigatório declarar se você recebeu rendimentos tributáveis acima de R$ 28.559,70 no ano anterior, possui bens acima de R$ 300 mil, ou se enquadra em outras condições específicas.",
    },
    "tipos de impostos": {
      keywords: ["tipos", "quais impostos", "impostos existem", "categorias"],
      response:
        "No Brasil, existem diversos tipos de impostos:\n\n• Impostos Federais: IR, IPI, IOF, CSLL, PIS, COFINS\n• Impostos Estaduais: ICMS, IPVA, ITCMD\n• Impostos Municipais: IPTU, ISS, ITBI\n\nCada um tem suas características e incide sobre diferentes atividades econômicas.",
    },
    "como declarar": {
      keywords: ["como declarar", "declarar impostos", "fazer declaração", "declarar ir"],
      response:
        "Para declarar o Imposto de Renda:\n\n1. Baixe o programa da Receita Federal ou use o aplicativo\n2. Reúna seus documentos (informes de rendimentos, recibos, etc.)\n3. Preencha os dados pessoais e rendimentos\n4. Informe deduções permitidas (saúde, educação, dependentes)\n5. Revise e envie a declaração\n6. Guarde o recibo de entrega\n\nO prazo geralmente é de março a maio de cada ano.",
    },
    "saudacoes": {
      keywords: ["oi", "olá", "ola", "boa tarde", "bom dia", "boa noite"],
      response:
        "Olá! 👋 Eu sou o assistente virtual da IMPOLINE. Posso ajudar você com informações sobre impostos, prazos, deduções e muito mais. Sobre o que você quer aprender primeiro?",
    },
  };

  function findResponse(message) {
    const text = message.toLowerCase();
    for (const key in knowledgeBase) {
      const kb = knowledgeBase[key];
      if (kb.keywords.some((kw) => text.includes(kw))) {
        return kb.response;
      }
    }
    return "Desculpe, não entendi. Você pode perguntar sobre Imposto de Renda, tipos de impostos ou como declarar.";
  }

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";

    avatarDiv.innerHTML = isUser
      ? `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>`
      : `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
         </svg>`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    const textP = document.createElement("p");
    textP.textContent = text;
    textP.style.whiteSpace = "pre-line";

    contentDiv.appendChild(textP);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message";
    typingDiv.id = "typingIndicator";

    typingDiv.innerHTML = `
      <div class="message-avatar">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="message-content">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
  }

  function sendMessage(event) {
    if (event) event.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, true); 
    messageInput.value = "";

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const botReply = findResponse(message);
      addMessage(botReply, false);
    }, 800); 
  }

  chatForm.addEventListener("submit", sendMessage);

 
  window.sendQuickReply = function (text) {
    messageInput.value = text;
    sendMessage();
  };
});
