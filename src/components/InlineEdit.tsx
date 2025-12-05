import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

// Check if we're in viewer mode (deployed portfolio without editor)
const isViewerMode = import.meta.env.VITE_VIEWER_MODE === 'true';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onSave,
  className = '',
  inputClassName = '',
  multiline = false,
  placeholder = 'Click to edit...',
  children
}) => {
  // In viewer mode, just render the content without any editing capability
  if (isViewerMode) {
    return <span className={className}>{children || value}</span>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="inline-flex items-center gap-2 w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-500/50 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none w-full font-inherit text-inherit ${inputClassName}`}
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-500/50 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-full font-inherit text-inherit ${inputClassName}`}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={handleSave}
            className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-500/50 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-sm"
            title="Save"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-all shadow-sm"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span
      className={`relative cursor-pointer group inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      {children || value || <span className="text-gray-400/70 italic text-sm">{placeholder}</span>}
      {isHovered && (
        <span className="absolute -top-1 -right-5 p-1 bg-blue-500/90 backdrop-blur-sm text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <Pencil className="w-2.5 h-2.5" />
        </span>
      )}
      <span className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/40 rounded-lg pointer-events-none transition-colors" />
    </span>
  );
};

export default InlineEdit;
