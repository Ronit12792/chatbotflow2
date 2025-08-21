import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Trash2 } from 'lucide-react';

const SettingsPanel = ({ node, onUpdateNode, onDeleteNode, onClose }) => {
  const [message, setMessage] = useState(node.data.message);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update local state when node changes
  useEffect(() => {
    setMessage(node.data.message);
  }, [node.data.message]);

  // Handle message change with real-time updates
  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    onUpdateNode(node.id, { message: newMessage });
  };

  // Handle delete node
  const handleDeleteNode = () => {
    onDeleteNode(node.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Panel Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-2 rounded-lg text-white">
            <MessageSquare size={18} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Message Settings</h2>
        </div>
        <p className="text-sm text-gray-600 ml-12">
          Edit your message content below.
        </p>
      </div>

      {/* Node Settings */}
      <div className="flex-1 p-6 space-y-6">
        {/* Node Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Node ID</span>
            <span className="text-sm text-gray-500 font-mono">{node.id}</span>
          </div>
        </div>

        {/* Message Content */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Message Content
          </label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter your message here..."
            className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
          />
          <p className="text-xs text-gray-500">
            This message will be sent to users when they reach this node.
          </p>
        </div>

        {/* Character Count */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-teal-700 font-medium">Character count</span>
            <span className="text-sm font-bold text-teal-800">
              {message.length}
            </span>
          </div>
        </div>

        {/* Delete Node Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-red-800">Danger Zone</h3>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              <Trash2 size={16} />
              <span>Delete Node</span>
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-700">
                Are you sure you want to delete this node? This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleDeleteNode}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-xs text-emerald-700">
            <strong>Auto-saved:</strong> Changes are applied instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
