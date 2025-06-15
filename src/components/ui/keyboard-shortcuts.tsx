
import React, { useEffect, useState } from 'react';
import { Command, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface KeyboardShortcut {
  key: string;
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for Ctrl/Cmd + key combinations
      if (event.ctrlKey || event.metaKey) {
        const shortcut = shortcuts.find(s => s.key.toLowerCase() === event.key.toLowerCase());
        if (shortcut) {
          event.preventDefault();
          shortcut.action();
        }
      }

      // Show shortcuts on Ctrl/Cmd + /
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        setShowShortcuts(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);

  const [showShortcuts, setShowShortcuts] = useState(false);

  return { showShortcuts, setShowShortcuts };
};

export const KeyboardShortcutsDialog = ({ 
  isOpen, 
  onClose, 
  shortcuts 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  shortcuts: KeyboardShortcut[];
}) => {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifierKey = isMac ? '⌘' : 'Ctrl';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl flex items-center">
              <Command className="h-5 w-5 mr-2" />
              Keyboard Shortcuts
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">General</h3>
              <div className="space-y-2">
                {shortcuts.slice(0, Math.ceil(shortcuts.length / 2)).map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-300">{shortcut.description}</span>
                    <kbd className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm border border-gray-700">
                      {modifierKey} + {shortcut.key.toUpperCase()}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Actions</h3>
              <div className="space-y-2">
                {shortcuts.slice(Math.ceil(shortcuts.length / 2)).map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-300">{shortcut.description}</span>
                    <kbd className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm border border-gray-700">
                      {modifierKey} + {shortcut.key.toUpperCase()}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">{modifierKey} + /</kbd> to toggle this dialog
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
