import React from 'react';
import './style.css'; 

function NotificationCard({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="notification-card">
            <p>{message}</p>
            <button className="notification-close-button" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}

export default NotificationCard;
