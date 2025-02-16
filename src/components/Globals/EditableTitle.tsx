import React, { useState, useEffect, useRef } from 'react';

interface EditableTitleProps {
  initialTitle?: string;
  onTitleChange: (title: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ initialTitle = '', onTitleChange }) => {
  const [title, setTitle] = useState(initialTitle);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    if (titleRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(titleRef.current, titleRef.current.childNodes.length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [title]);

  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.textContent || '';
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  return (
    <div className="relative mb-4">
      <h1
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 leading-tight mb-2 whitespace-pre-wrap min-w-[1ch]"
        aria-label="Page title"
        role="textbox"
        onInput={handleInput}
      >
        {title}
      </h1>
      {!title && (
        <span className="absolute top-2 left-2 text-gray-400 pointer-events-none select-none">
          Add title
        </span>
      )}
    </div>
  );
};

export default EditableTitle;
