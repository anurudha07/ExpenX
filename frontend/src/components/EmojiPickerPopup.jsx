
import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

export default function EmojiPickerPopup({ icon, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close on outside click
  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">

      <div
        className="w-10 h-10 flex items-center justify-center text-2xl bg-purple-50 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(o => !o)}
      >
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <LuImage />
        )}
      </div>

      {isOpen && (
        <div
          className="
            absolute z-50
            w-[200px] sm:w-[240px]
            h-[240px] sm:h-[280px]
            bg-white rounded-lg shadow-lg
            backdrop-blur-sm overflow-hidden
            top-full left-1/2 transform -translate-x-1/2 mt-2
            sm:top-0 sm:left-full sm:translate-x-0 sm:ml-2 sm:mt-0
          "
        >
 
          <button
            className="absolute top-1 right-1 p-1 text-gray-600 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

         
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setIsOpen(false);
            }}
            height={220}
            width="100%"
            searchDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}
