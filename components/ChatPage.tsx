
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChatMessage } from '../types';
import { getFlowiseChatResponse, getCreativeLoadingMessage } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner'; 
import { 
    AppLogoIcon, SendIcon, SmallAppLogo, LightbulbIcon, XMarkIcon, ROUTES,
    BookOpenIcon, DocumentTextIcon, BriefcaseIcon, PencilSquareIcon 
} from '../constants';

// renderStructuredContent function remains the same
const renderStructuredContent = (text: string): string => {
  if (!text) return "";

  let processedText = text;
  const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  processedText = processedText.replace(emojiRegex, ''); 
  processedText = processedText.replace(/\[(.*?)\]/g, ''); 
  processedText = processedText.replace(/#/g, ''); 

  const lines = processedText.split('\n');
  let htmlOutput = '';
  let inList = false;

  const firstNonEmptyLineIndex = lines.findIndex(line => line.trim().length > 0);
  if (firstNonEmptyLineIndex !== -1) {
    const potentialTitle = lines[firstNonEmptyLineIndex].trim();
    if (potentialTitle.length < 80 && 
        !potentialTitle.startsWith('•') && 
        !potentialTitle.startsWith('* ') && 
        !potentialTitle.startsWith('- ') &&
        !/^(Tip:|Consejo:|Protip:|Definición|Concepto|Mecanismos|Importancia|Conclusión|Resumen|Introducción|Objetivos|Resultados|Discusión|Ejemplo):/i.test(potentialTitle) &&
        !potentialTitle.endsWith(':')
      ) {
      let titleContent = potentialTitle;
      titleContent = titleContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => `<strong class="font-bold">${p1 || p2}</strong>`);
      titleContent = titleContent.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => `<em class="italic">${p1 || p2}</em>`);
      titleContent = titleContent.replace(/\*/g, '');

      htmlOutput += `<h1 class="text-center text-primary font-bold text-xl md:text-2xl mb-4 font-sans">${titleContent}</h1>`;
      lines.splice(firstNonEmptyLineIndex, 1); 
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line === '') {
      if (inList) { htmlOutput += '</ul>'; inList = false; }
      if (!(htmlOutput.endsWith('</h1>') || htmlOutput.endsWith('</h2>'))) {
          htmlOutput += '<div class="my-1.5"></div>'; 
      }
      continue;
    }
    
    const tipMatch = line.match(/^(Tip:|Consejo:|Protip:)(.*)/im);
    if (tipMatch) {
        if (inList) { htmlOutput += '</ul>'; inList = false; }
        const keyword = tipMatch[1];
        const restOfLine = tipMatch[2].trim();
        let styledLine = `<span class="font-semibold text-accent">${keyword}</span>`;
        if (restOfLine) {
             let content = restOfLine;
             content = content.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => `<strong class="font-semibold">${p1 || p2}</strong>`);
             content = content.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => `<em class="italic">${p1 || p2}</em>`);
             content = content.replace(/\*/g, '');
             styledLine += ` ${content}`;
        }
        htmlOutput += `<p class="text-text-primary-light dark:text-text-primary-dark mb-2 leading-relaxed text-sm">${styledLine}</p>`;
        continue; 
    }

    // Erroneous block removed from here.
    // The original logic for subtitles (h2) and other elements follows:

    const subtitleKeywords = /^(Definición|Concepto|Mecanismos|Importancia|Conclusión|Resumen|Introducción|Objetivos|Resultados|Discusión|Relevancia):$/i;
    const potentialSubtitleEndsWithColon = line.length < 100 && 
                                          !line.startsWith('•') && !line.startsWith('* ') && !line.startsWith('- ') && 
                                          !line.match(/^Ejemplo:/i) && 
                                          line.endsWith(':');
    
    if (line.match(subtitleKeywords) || potentialSubtitleEndsWithColon) {
      if (inList) { htmlOutput += '</ul>'; inList = false; }
      let subtitleContent = line;
      subtitleContent = subtitleContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => `<strong class="font-semibold">${p1 || p2}</strong>`);
      subtitleContent = subtitleContent.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => `<em class="italic">${p1 || p2}</em>`);
      subtitleContent = subtitleContent.replace(/\*/g, '');

      htmlOutput += `<h2 class="font-semibold text-primary text-lg md:text-xl mt-4 mb-2">${subtitleContent}</h2>`;
    }
    else if (line.match(/^Ejemplo:/i)) {
      if (inList) { htmlOutput += '</ul>'; inList = false; }
      const examplePrefixMatch = line.match(/^(Ejemplo:)/i);
      const examplePrefix = examplePrefixMatch ? examplePrefixMatch[0] : "Ejemplo:";
      let exampleContent = line.substring(examplePrefix.length).trim();
      
      exampleContent = exampleContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => `<strong class="font-semibold">${p1 || p2}</strong>`);
      exampleContent = exampleContent.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => `<em class="italic">${p1 || p2}</em>`);
      exampleContent = exampleContent.replace(/\*/g, '');

      htmlOutput += `<p class="text-text-primary-light dark:text-text-primary-dark mb-2.5 text-sm"><strong class="font-semibold text-text-primary-light dark:text-text-primary-dark">${examplePrefix}</strong> ${exampleContent}</p>`;
    }
    else if (line.startsWith('•') || line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        htmlOutput += '<ul class="list-disc list-inside pl-1 sm:pl-2 mb-2.5 space-y-0.5 text-text-primary-light dark:text-text-primary-dark text-sm">';
        inList = true;
      }
      let listItemContent = line.substring(line.startsWith('•') ? 1 : 2).trim();
      listItemContent = listItemContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => `<strong class="font-semibold">${p1 || p2}</strong>`);
      listItemContent = listItemContent.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => `<em class="italic">${p1 || p2}</em>`);
      listItemContent = listItemContent.replace(/\*/g, '');
      htmlOutput += `<li>${listItemContent}</li>`;
    }
    else {
      if (inList) { htmlOutput += '</ul>'; inList = false; }
      let paragraphLine = line;
      paragraphLine = paragraphLine.replace(/\*\*(.*?)\*\*|__(.*?)__/g, (m, p1, p2) => 
        `<strong class="font-semibold text-text-primary-light dark:text-text-primary-dark">${p1 || p2}</strong>`
      );
      paragraphLine = paragraphLine.replace(/\*(.*?)\*|_(.*?)_/g, (m, p1, p2) => 
        `<em class="italic text-text-primary-light dark:text-text-primary-dark">${p1 || p2}</em>`
      );
      paragraphLine = paragraphLine.replace(/\*/g, '');

      htmlOutput += `<p class="text-text-primary-light dark:text-text-primary-dark mb-2 leading-relaxed text-sm">${paragraphLine}</p>`;
    }
  }

  if (inList) { htmlOutput += '</ul>'; }
  return htmlOutput.trim();
};


const PersistentChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [creativeLoadingText, setCreativeLoadingText] = useState<string>("Consultando a Blasto AI...");
  const currentQueryForLoadingRef = useRef<string>(""); 
  const loadingIntervalRef = useRef<number | null>(null);

  const getApiKey = () => (window as any).APP_CONFIG?.FLOWISE_API_KEY;
  const [isChatServiceConfigured, setIsChatServiceConfigured] = useState(!!getApiKey());

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    const state = location.state as { initialChatPrompt?: string } | undefined;
    if (state?.initialChatPrompt) {
      handleSendMessage(state.initialChatPrompt, true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);


  useEffect(() => {
    const keyIsPresent = !!getApiKey();
    if (isChatServiceConfigured !== keyIsPresent) {
      setIsChatServiceConfigured(keyIsPresent);
    }
    if (!keyIsPresent) {
      setError(`CRITICAL: La clave API para Blasto AI no está configurada. La funcionalidad de chat está deshabilitada.`);
      setIsLoading(false);
    } else if (error && error.includes("API para Blasto AI")) { 
      setError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatServiceConfigured]); 

  useEffect(() => {
    if (isLoading) {
      getCreativeLoadingMessage(currentQueryForLoadingRef.current).then(setCreativeLoadingText);
      loadingIntervalRef.current = window.setInterval(async () => {
        try {
          const newText = await getCreativeLoadingMessage(currentQueryForLoadingRef.current);
          setCreativeLoadingText(newText);
        } catch (err) { console.warn("Failed to refresh creative loading message:", err); }
      }, 15000); 
    } else {
      if (loadingIntervalRef.current !== null) window.clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
      setCreativeLoadingText("Consultando a Blasto AI..."); 
    }
    return () => { if (loadingIntervalRef.current !== null) window.clearInterval(loadingIntervalRef.current); };
  }, [isLoading]);

  const getContextForActionButtons = (): string => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Try to get a meaningful snippet from the last message
      let contextText = lastMessage.text.substring(0, 100); // Get first 100 chars
      // Basic cleanup
      contextText = contextText.replace(/^(Clase:|Resumen:|Caso Clínico:|Examen:)\s*/i, "").trim();
      if (contextText.length > 10) return `"${contextText.split('\n')[0]}"`; // Use first line if multi-line
    }
    return "el tema actual";
  };

  const handleActionPrompt = (action: 'Clase' | 'Resumen' | 'Caso Clínico' | 'Examen') => {
    const context = getContextForActionButtons();
    let prompt = "";
    switch (action) {
      case 'Clase':
        prompt = `Explícame en formato de clase sobre: ${context}`;
        break;
      case 'Resumen':
        prompt = `Haz un resumen conciso sobre: ${context}`;
        break;
      case 'Caso Clínico':
        prompt = `Preséntame un caso clínico relacionado con: ${context}`;
        break;
      case 'Examen':
        prompt = `Créame un examen breve sobre: ${context}`;
        break;
    }
    handleSendMessage(prompt, true);
  };

  const handleSendMessage = useCallback(async (text: string, isSystemPrompt: boolean = false) => {
    if (!getApiKey()) { 
      setError(`CRITICAL: La clave API para Blasto AI no está configurada.`);
      return;
    }
    if (!text.trim()) return;
    
    currentQueryForLoadingRef.current = text; 

    const userMessage: ChatMessage = { id: 'user-' + Date.now(), text, sender: 'user', timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    if (!isSystemPrompt) setInput('');
    
    setIsLoading(true);
    setError(null);

    const aiMessageId = 'ai-' + Date.now();
    setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai', timestamp: Date.now(), isLoading: true }]);

    try {
      const aiResponseText = await getFlowiseChatResponse(text);
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: aiResponseText, isLoading: false } : msg));
    } catch (e) {
      console.error("Error getting response from Flowise:", e);
      const errorMsg = e instanceof Error ? e.message : "Ocurrió un error.";
      setError(`Error de Blasto AI: ${errorMsg}`);
      setMessages(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, text: `Error: ${errorMsg}`, isLoading: false } : msg));
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && getApiKey()) handleSendMessage(input.trim());
    else if (!getApiKey()) setError(`CRITICAL: La clave API para Blasto AI no está configurada.`);
  };

  const handleCloseChat = () => {
    navigate(ROUTES.DASHBOARD); 
  };

  const actionButtons = [
    { label: "Clase", icon: <BookOpenIcon className="w-4 h-4 mr-1.5"/>, action: () => handleActionPrompt("Clase") },
    { label: "Resumen", icon: <DocumentTextIcon className="w-4 h-4 mr-1.5"/>, action: () => handleActionPrompt("Resumen") },
    { label: "Caso Clínico", icon: <BriefcaseIcon className="w-4 h-4 mr-1.5"/>, action: () => handleActionPrompt("Caso Clínico") },
    { label: "Examen", icon: <PencilSquareIcon className="w-4 h-4 mr-1.5"/>, action: () => handleActionPrompt("Examen") },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-surface-light dark:bg-surface-dark animate-fade-in-up">
      <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
        <div className="flex items-center space-x-3">
          <AppLogoIcon className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Blasto AI</h2>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Tu cerebro de guardia</p>
          </div>
        </div>
        <button 
            onClick={handleCloseChat} 
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-text-secondary-light dark:text-text-secondary-dark"
            aria-label="Cerrar chat y volver al dashboard"
        >
          <XMarkIcon className="w-5 h-5" />
          <span className="sr-only">Cerrar chat</span>
        </button>
      </header>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
            <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                <AppLogoIcon className="w-16 h-16 mx-auto text-primary opacity-50 mb-4"/>
                <p className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                    Bienvenido a Blasto AI
                </p>
                <p className="text-md text-text-secondary-light dark:text-text-secondary-dark">
                    ¿Cómo puedo ayudarte hoy? <br/> Escribe tu consulta abajo o usa una acción rápida.
                </p>
            </div>
        )}
        {messages.map(msg => {
          const isTipMessage = /^(Tip:|Consejo:|Protip:)/i.test(msg.text);
          return (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' ? (
                <div className="flex items-end space-x-2 max-w-[90%]">
                   <SmallAppLogo className="w-6 h-6 text-primary shrink-0 self-start mt-1" />
                  <div className="p-3 rounded-t-xl rounded-br-xl shadow-soft bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
                    {msg.isLoading && !msg.text ? (
                      <div className="flex items-center py-0.5">
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce delay-0"></div>
                          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce delay-150"></div>
                          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce delay-300"></div>
                        </div>
                        {creativeLoadingText && msg.isLoading && (
                          <p key={creativeLoadingText} className="text-xs text-text-secondary-light dark:text-text-secondary-dark ml-2 animate-fade-in-up">
                            {creativeLoadingText}
                          </p>
                        )}
                      </div>
                    ) : (
                       <div className="text-sm leading-relaxed prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-h1:text-lg prose-h2:text-base">
                        {isTipMessage && (
                          <LightbulbIcon className="w-4 h-4 mr-1.5 text-accent inline-block align-middle" />
                        )}
                        <span dangerouslySetInnerHTML={{ __html: renderStructuredContent(msg.text) }} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-[85%] p-3 rounded-t-xl rounded-bl-xl shadow-soft bg-primary text-white">
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        {error && <p className="pb-1.5 text-red-500 text-xs text-center whitespace-pre-wrap">{error}</p>}
        
        <div className="mb-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {actionButtons.map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              disabled={isLoading || !getApiKey()}
              className="flex items-center justify-center px-2.5 py-1.5 text-xs font-medium text-primary dark:text-primary-dark bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={`Solicitar ${btn.label.toLowerCase()} a Blasto AI`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-bg-light dark:bg-bg-dark rounded-full p-1.5 shadow-inner border border-border-light dark:border-border-dark focus-within:ring-2 focus-within:ring-accent/70">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={!getApiKey() ? "Chat deshabilitado: API Key no configurada" : "Pregunta a Blasto AI..."}
            className="flex-grow pl-3 py-1.5 bg-transparent text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:outline-none text-sm"
            disabled={isLoading || !getApiKey()}
            aria-label="Escribe tu mensaje a Blasto AI"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !getApiKey()}
            className="w-8 h-8 flex items-center justify-center bg-accent hover:bg-accent-dark text-white rounded-full disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Enviar mensaje a Blasto AI"
          >
            {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : <SendIcon className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersistentChat;
