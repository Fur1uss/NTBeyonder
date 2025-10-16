import React, { useState, useEffect, useRef } from 'react';
import { AZURE_OPENAI_CONFIG, getPlanetPersonality, generateContextualPrompt } from '../../config/azureOpenAIConfig';
import './PlanetChatbot.css';

const PlanetChatbot = ({ currentPlanet, isVisible, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const planetPersonality = getPlanetPersonality(currentPlanet);

    // Mensaje de bienvenida
    useEffect(() => {
        if (isVisible && messages.length === 0) {
            const welcomeMessage = {
                id: Date.now(),
                type: 'bot',
                message: planetPersonality.welcomeMessage,
                timestamp: new Date(),
                isFirst: true
            };
            setMessages([welcomeMessage]);
        }
    }, [isVisible, currentPlanet]);

    // Auto-scroll y focus
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (isVisible) {
            inputRef.current?.focus();
        }
    }, [messages, isVisible]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            message: inputMessage.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);
        setIsTyping(true);

        // Simular delay de escritura
        setTimeout(async () => {
            try {
                const response = await generatePlanetResponse(currentInput, currentPlanet);
                const botMessage = {
                    id: Date.now() + 1,
                    type: 'bot',
                    message: response,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            } catch (error) {
                console.error('Error:', error);
                const errorMessage = {
                    id: Date.now() + 1,
                    type: 'bot',
                    message: "Lo siento, estoy teniendo problemas para responder. ¿Puedes intentar de nuevo?",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
                setIsTyping(false);
            }
        }, 1500);
    };

    const generatePlanetResponse = async (userMessage, planet) => {
        const prompt = generateContextualPrompt(userMessage, planet);
        
        // Construir la URL de Azure OpenAI
        const url = `${AZURE_OPENAI_CONFIG.ENDPOINT}/openai/deployments/${AZURE_OPENAI_CONFIG.DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_CONFIG.API_VERSION}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': AZURE_OPENAI_CONFIG.API_KEY
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente útil que responde como un planeta del sistema solar.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 150,
                temperature: 0.8
            })
        });
    
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Azure OpenAI API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from Azure OpenAI API');
        }
        
        return data.choices[0].message.content;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    if (!isVisible) return null;

    return (
        <div className="planet-chatbot-overlay">
            <div className="planet-chatbot-container">
                {/* Header */}
                <header className="planet-chatbot-header">
                    <div className="planet-chatbot-bot-info">
                        <div className="planet-chatbot-avatar">
                            <span className="planet-chatbot-emoji">{planetPersonality.emoji}</span>
                        </div>
                        <div className="planet-chatbot-bot-details">
                            <h2 className="planet-chatbot-bot-name">{planetPersonality.name}</h2>
                            <span className={`planet-chatbot-status ${isTyping ? 'typing' : 'online'}`}>
                                {isTyping ? '⚪ Escribiendo...' : '🟢 En línea'}
                            </span>
                        </div>
                    </div>
                    <button className="planet-chatbot-close-btn" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </header>

                {/* Messages Container */}
                <div className="planet-chatbot-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`planet-chatbot-message ${msg.type}`}>
                            {msg.type === 'bot' && msg.isFirst && (
                                <div className="planet-chatbot-avatar-small">
                                    <span className="planet-chatbot-emoji-small">{planetPersonality.emoji}</span>
                                </div>
                            )}
                            <div className="planet-chatbot-message-bubble">
                                <p className="planet-chatbot-message-text">{msg.message}</p>
                                <span className="planet-chatbot-message-time">{formatTime(msg.timestamp)}</span>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="planet-chatbot-message bot">
                            <div className="planet-chatbot-avatar-small">
                                <span className="planet-chatbot-emoji-small">{planetPersonality.emoji}</span>
                            </div>
                            <div className="planet-chatbot-message-bubble typing">
                                <div className="planet-chatbot-typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="planet-chatbot-input-area">
                    <div className="planet-chatbot-input-container">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={`Pregúntale a ${planetPersonality.name}...`}
                            disabled={isLoading}
                            maxLength={200}
                            className="planet-chatbot-input"
                        />
                        <button 
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            className="planet-chatbot-send-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22,2 15,22 11,13 2,9"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetChatbot;