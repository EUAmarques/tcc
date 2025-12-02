document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const messagesContainer = document.getElementById("chatMessages");

  const knowledgeBase = {
    "leao": {
  keywords: ["leao", "leão", "o leao", "o leão"],
  response:
    "Acho que você quis dizer **“Leão”** 😉. Esse é o apelido do Imposto de Renda — o pessoal fala assim porque a Receita ‘morde’ quando algo tá errado 😂. Então, sempre que falar do Leão, estamos falando do Imposto de Renda mesmo."
},

"quem_precisa_declarar": {
  keywords: ["quem precisa declarar", "obrigado declarar", "sou obrigado", "preciso declarar"],
  response:
    "Você precisa declarar se ganhou acima do limite anual da Receita, vendeu bens, investiu, teve renda no exterior ou possui bens acima dos valores obrigatórios. Se pintou dúvida, melhor conferir pra não ter problema com o Leão 😉."
},

"malha_fina": {
  keywords: ["malha fina", "cair na malha", "malha", "mordida do leao"],
  response:
    "‘Malha fina’ é quando a Receita segura sua declaração pra revisar. Normalmente por erro, falta de recibo ou informação que não bate. Nada de desespero — só corrigir certinho."
},

"retificadora": {
  keywords: ["retificar", "corrigir declaração", "declaracao errada", "retificadora"],
  response:
    "Errou alguma coisa? Sem pânico! Dá pra corrigir enviando uma **declaração retificadora** no mesmo programa do IR. Quanto antes ajustar, melhor."
},

"dependentes": {
  keywords: ["dependente", "dependentes", "colocar dependente", "quem pode ser dependente"],
  response:
    "Dependentes ajudam a aumentar deduções. Pode ser filho, cônjuge ou parentes que você sustenta. Mas cuidado: colocar dependente também puxa a renda dele pra sua declaração."
},

"conjunta_ou_separada": {
  keywords: ["conjunta", "separada", "declarar junto", "casal declarar"],
  response:
    "Casal pode declarar junto ou separado. Junto pode compensar quando um ganha menos. O ideal é testar os dois jeitos pra ver qual dá mais vantagem."
},

"cpf_irregular": {
  keywords: ["cpf irregular", "regularizar cpf", "cpf pendente"],
  response:
    "Se o CPF tá irregular, a declaração pode travar. Isso acontece por pendências antigas, dívidas ou falta de declaração. No site da Receita dá pra ver e regularizar rapidinho."
},

"venda_imovel": {
  keywords: ["venda imóvel", "vendi casa", "lucro imobiliário", "imposto imóvel"],
  response:
    "Ao vender um imóvel com lucro, pode ter imposto de **ganho de capital**. Mas tem exceções, como usar o dinheiro pra comprar outro imóvel em até 180 dias."
},

"bolsa_valores": {
  keywords: ["bolsa", "ações", "investimentos", "renda variável", "bolsa de valores"],
  response:
    "Se você investe em ações, FIIs ou renda variável, precisa declarar tudo — mesmo com prejuízo. Dependendo da operação, pode ter imposto a pagar. O Leão acompanha tudo 👀."
},

"declaracao_atrasada": {
  keywords: ["atrasada", "declarar atrasado", "perdi prazo", "esqueci declarar"],
  response:
    "Perdeu o prazo? Dá pra declarar mesmo assim, mas rola multa mínima e juros. Quanto antes enviar, melhor pro bolso."
},

"documento_faltando": {
  keywords: ["faltando documento", "perdi recibo", "nao tenho comprovante", "sem informe"],
  response:
    "Perdeu documento? Peça segunda via ao banco, empresa ou médico. Não inventa valores — o Leão confere tudo. Se depois conseguir o documento, dá pra retificar."
},

    "imposto de renda": {
      keywords: ["imposto de renda", "ir", "irpf", "declaração", "imposto rend"],
      response:
        "O Imposto de Renda é um tributo federal cobrado anualmente sobre rendimentos. Pessoas físicas devem declarar se ultrapassarem limites da Receita ou possuírem bens acima de certos valores.",
    },
    "tipos de impostos": {
      keywords: ["tipos", "quais impostos", "impostos existem", "categorias", "tipos de imposto"],
      response:
        "No Brasil existem impostos federais, estaduais e municipais. Exemplos: IR, IPI, IOF, ICMS, IPVA, IPTU, ISS. Cada um tem regras e base de cálculo próprias.",
    },
    "como declarar": {
      keywords: ["como declarar", "declarar impostos", "fazer declaração", "declarar ir", "declaro"],
      response:
        "Para declarar IR: baixe o programa/app da Receita, reúna informes de rendimento e comprovantes, preencha rendimentos e deduções, revise e envie. Guarde o recibo.",
    },
    "saudacoes": {
      keywords: ["oi", "olá", "ola", "boa tarde", "bom dia", "boa noite", "e aí"],
      response:
        "Olá! 👋 Sou o assistente da IMPOLINE. Posso ajudar com prazos, deduções, tipos de imposto e dúvidas sobre declaração. Sobre o que quer saber?",
    },
    "deducoes": {
      keywords: ["dedução", "deducoes", "deduzir", "despesas dedutíveis", "desconto"],
      response:
        "Deduções comuns: despesas médicas, educação (limitadas), dependentes, contribuição à previdência oficial. Guarde recibos e notas fiscais para comprovação.",
    },
    "prazo": {
      keywords: ["prazo", "data", "quando declarar", "vencimento", "entrega"],
      response:
        "O período de entrega geralmente ocorre entre março e abril/maio (varia por ano). Consulte o calendário da Receita Federal no ano corrente.",
    },
    "multas": {
      keywords: ["multa", "penalidade", "multa por atraso", "atraso declaração"],
      response:
        "A entrega fora do prazo pode gerar multa. Há também juros sobre impostos devidos não pagos. Verifique valores e condições no site da Receita.",
    },
    "mei_simples": {
      keywords: ["mei", "simples nacional", "simples", "microempreendedor"],
      response:
        "MEI e empresas no Simples têm regras diferentes do IRPF. MEI faz declaração anual do faturamento (DASN-SIMEI) e pode ter guia DAS mensal.",
    },
    "restituicao": {
      keywords: ["restituição", "restituicao", "receber imposto", "restituir"],
      response:
        "Se você pagou mais imposto do que devia, pode ter direito à restituição. A Receita publica lotes de restituição aos contribuintes elegíveis.",
    },
    "documentos": {
      keywords: ["documentos", "comprovantes", "informes", "recibos", "notas fiscais"],
      response:
        "Reúna informes de rendimento (bancos, empregadores), recibos de despesas médicas, comprovantes de educação, documentos de bens e imóveis.",
    },
    "consulta": {
      keywords: ["consultar", "status", "acompanhar declaração", "consulta recibo"],
      response:
        "Você pode consultar o status da declaração e recibo no site e no app da Receita Federal usando CPF e código de acesso ou gov.br.",
    },
    "parcelamento": {
      keywords: ["parcelamento", "parcelar", "parcela imposto", "parcelas"],
      response:
        "Imposto devido pode, em alguns casos, ser parcelado pela Receita. Consulte opções de parcelamento e condições no portal da Receita Federal.",
    },
    "isenção": {
      keywords: ["isenção", "isento", "isento imposto", "isencao"],
      response:
        "Há situações de isenção (por exemplo rendimentos abaixo do limite). Verifique as regras específicas para cada ano e tipo de rendimento.",
    },
    "atendimento": {
      keywords: ["ajuda", "contato", "telefone", "atendimento", "suporte"],
      response:
        "Para atendimento oficial, use os canais da Receita Federal ou o portal gov.br. Posso fornecer orientações gerais, não substituo atendimento oficial.",
    },
    "fallback": {
      keywords: ["imposto", "renda", "declar", "restitu", "prazo", "deduç", "document"],
      response:
        "Desculpe, não entendi exatamente. Pode reformular? Você pode perguntar sobre: Imposto de Renda, prazos, deduções, documentos ou restituição.",
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
