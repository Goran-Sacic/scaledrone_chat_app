import React from 'react';
import { useState } from 'react';

export default function Input ({onSendMessage}) {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        console.log('change')
        setText(e.target.value);
    }

    const handleAddPoruka = (e) => {
        console.log('addporuka')
        e.preventDefault();
        setText('');
        onSendMessage(text);
    }

    return (
        <div className="Input">
            <form onSubmit={handleAddPoruka}>
                <input required placeholder="Unesi poruku i pritisni ENTER" autoFocus={true} value={text} onChange={handleChange} />
                <button>Pošalji poruku</button>
            </form>
        </div>
    )
}