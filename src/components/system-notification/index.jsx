import { useState, useEffect } from 'react';
import styles from './index.module.css';

export function SystemNotification({ message, timeout = 2000, type = 'info', clearNotification }) {
    const [visible, setVisible] = useState(true);
    if(!message) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            // take the first message off the stack (needs fix)
            clearNotification();
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

export const NotificationTrey = ({ messages, clearNotification }) => {
    if(!messages) return null;
    return (
      <div className={`${styles["system-notification-trey"]}`}>
        {messages.length > 0 && messages.map((message, index) => (
            <SystemNotification key={index}  {...message} {...{...clearNotification }} />
          ))}
      </div>
    )
}
