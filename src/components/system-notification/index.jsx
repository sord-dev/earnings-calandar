import { useState, useEffect } from 'react';
import styles from './index.module.css';

function SystemNotification({ message, timeout = 2000, type = 'info', setMessages }) {
    const [visible, setVisible] = useState(true);
    if(!message) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            // take the first message off the stack (needs fix)
            setMessages((messages) => messages.slice(1));
        }, timeout); // Dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`${styles["system-notification"]} ${styles[type]}`} >
            {message}
        </div>
    );
}

const NotificationTrey = ({ messages, setMessages }) => {
    return (
      <div className={`${styles["system-notification-trey"]}`}>
        {messages.length >= 1 && messages.map((message, index) => (
            <SystemNotification key={index} message={message.notification} type={message.type} setMessages={setMessages} />
          ))}
      </div>
    )
}

export default NotificationTrey