import { createContext, useContext, useReducer } from 'react';
import { initialChatState, chatReducers } from '..';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    return (
        <ChatContext.Provider value={useReducer(chatReducers, initialChatState)}>
            {children}
        </ChatContext.Provider>
    );
};
