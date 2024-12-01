import { useState, useEffect } from 'react';
import styles from './index.module.css';

import PropTypes from 'prop-types'

export function SystemNotification({ message, timeout = 2000, type = 'info', clearNotification }) {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            // take the first message off the stack (needs fix)
            clearNotification();
        }, timeout); // Dismiss after 3 seconds
        
        return () => clearTimeout(timer);
    }, [clearNotification, timeout]);
    
    if(!message) return null;
    if (!visible) return null;

    return (
        <div className={`${styles["system-notification"]} ${styles[type]}`} >
            {message}
        </div>
    );
}

SystemNotification.propTypes = {
    message: PropTypes.string,
    timeout: PropTypes.number,
    type: PropTypes.string,
    clearNotification: PropTypes.func
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


NotificationTrey.propTypes = {
    messages: PropTypes.array,
    clearNotification: PropTypes.func
}