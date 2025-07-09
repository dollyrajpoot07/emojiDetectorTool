'use client';
import React, { useState } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import styles from './emojiDetectorTool.module.css';

export default function EmojiDetectorTool() {
  const [input, setInput] = useState('');
  const [emojis, setEmojis] = useState([]);

  const splitter = new GraphemeSplitter();
  const emojiRegex = /\p{Extended_Pictographic}/u;

  const handleChange = (e) => {
    const text = e.target.value;
    setInput(text);
    const graphemes = splitter.splitGraphemes(text);

    const matches = graphemes
      .map((char, idx) => ({
        char,
        index: idx,
        isEmoji: emojiRegex.test(char)
      }))
      .filter(g => g.isEmoji);

    setEmojis(matches);
  };

  const copyEmojis = () => {
    const all = emojis.map(e => e.char).join(' ');
    navigator.clipboard.writeText(all);
    alert('Emojis copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <h2>Emoji Detector Tool 🎉</h2>
      <textarea
        rows="5"
        placeholder="Type or paste emoji-rich text here..."
        value={input}
        onChange={handleChange}
      />
      
      <div className={styles.resultBox}>
        <p><strong>Detected Emojis:</strong> {emojis.length ? emojis.map(e => e.char).join(' ') : 'None'}</p>
        <p><strong>Total:</strong> {emojis.length}</p>
        <p><strong>Indexes:</strong> {emojis.length ? emojis.map(e => e.index).join(', ') : 'None'}</p>
        {emojis.length > 0 && (
          <button onClick={copyEmojis}>📋 Copy Emojis</button>
        )}
      </div>
    </div>
  );
}
