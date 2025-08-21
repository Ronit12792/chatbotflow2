import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

// Individual draggable node item
const NodeItem = ({ type, icon: Icon, title, description }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="bg-white border-2 border-teal-200 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-lg hover:border-teal-300 transition-all duration-200 hover:scale-105 shadow-md"
      onDragStart={onDragStart}
      draggable
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-3 rounded-xl text-white shadow-md">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const NodesPanel = ({ nodeCount, onClearAll }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Panel Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800">Nodes Panel</h2>
          {nodeCount > 0 && (
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {nodeCount} nodes
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Drag nodes to the canvas to build your flow.
        </p>
      </div>

      {/* Available Nodes */}
      <div className="flex-1 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            Available Nodes
          </h3>
          <NodeItem
            type="textMessage"
            icon={MessageSquare}
            title="Message"
            description="Send a text message"
          />
        </div>

        {/* Placeholder for future node types */}
        <div className="pt-8">
          <p className="text-xs text-gray-400 italic text-center">
            More node types coming soon...
          </p>
        </div>
      </div>

      {/* Canvas Management Section */}
      {nodeCount > 0 && (
        <div className="p-6 border-t border-gray-200 bg-white space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Canvas Management</h3>
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 font-medium"
            >
              <Trash2 size={16} />
              <span>Clear All Nodes</span>
            </button>
            <p className="text-xs text-red-500">
              This will remove all nodes and connections from the canvas.
            </p>
          </div>
        </div>
      )}

      {/* Footer with Instructions */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
          <p className="text-xs text-teal-700">
            <strong>Tip:</strong> Click on any node to edit its content or delete it individually.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
