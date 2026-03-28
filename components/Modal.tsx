import React from 'react';

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: ModalAction[];
}

export default function Modal({ isOpen, onClose, title, description, children, actions }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">{title}</h3>
        {description && (
          <p className={`text-gray-500 dark:text-zinc-400 text-sm ${children || (actions && actions.length > 0) ? 'mb-6' : ''}`}>
            {description}
          </p>
        )}
        {children}
        {actions && actions.length > 0 && (
          <div className="flex gap-3 justify-end">
            {actions.map((action, index) => {
              const baseClasses = "px-4 py-2 rounded-xl text-sm font-medium transition-colors";
              let variantClasses = "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"; // default/secondary
              
              if (action.variant === 'primary') {
                variantClasses = "bg-blue-600 hover:bg-blue-700 text-white";
              } else if (action.variant === 'danger') {
                variantClasses = "bg-red-600 hover:bg-red-700 text-white";
              }

              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`${baseClasses} ${variantClasses}`}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
