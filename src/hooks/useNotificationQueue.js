import { useEffect, useState } from 'react'

function useNotificationQueue() {
    const [messages, setMessages] = useState([]);
    
    const appendNotification = (message, type) => {
        if(!message || !type) return;
        setMessages(prev => [...prev, { notification: message, type }]);
    }
    
    const removeLastNotification = () => {
        if(messages.length === 0) return;
        setMessages(prev => prev.slice(1));
    }

    useEffect(()=> {
        console.log(messages)
    }, [messages])

    return { messages, appendNotification, removeLastNotification };
}

export default useNotificationQueue;