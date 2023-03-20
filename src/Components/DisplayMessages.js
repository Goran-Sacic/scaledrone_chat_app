import React from "react";
import { v4 as uuidv4 } from 'uuid';
const randomId = uuidv4();

function DisplayMessages({messages, currentMember}) {
    
    const renderMessage = (message, index) => {
        const { member, text } = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? "Messages-message currentMember" : "Messages-message";

        return (
            <li key={index} className={className}>
                <span className="avatar" style={{backgroundColor: member.clientData.color}} />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text"><p>{text}</p></div>
                </div>
            </li>
        );
    };

    return (
        <ul className="Messages-list">
            {messages.map((m, index) => renderMessage(m, index))}
        </ul>
    );
}

export default DisplayMessages;