import React from 'react';
import { useState } from 'react';

export default function Input ({onSendMessage}) {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleAddPoruka = (e) => {
        e.preventDefault();
        setText('');
        onSendMessage(text);
    }

    return (
        <div className="Input">
            <form onSubmit={handleAddPoruka}>
                <input placeholder="Unesi poruku ..." autoFocus={true} value={text} onChange={handleChange} />
                <button disabled={!text} className={!text ? "button-disabled" : "button-active"}>Pošalji →</button> 
            </form>
        </div>
    )
}