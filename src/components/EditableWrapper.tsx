import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableWrapperProps {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  showControls?: boolean;
  className?: string;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  onEdit,
  onDelete,
  showControls = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {showControls && isHovered && (
        <div className="absolute -top-3 -right-3 flex gap-1 z-50">
          {onEdit && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
              className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
              className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface AddButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  label = 'Add New',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors ${className}`}
    >
      <Plus className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
            
            {/* Footer */}
            {onSave && (
              <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { onSave(); onClose(); }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditableWrapper;
