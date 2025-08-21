import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageSquare } from 'lucide-react';

const TextMessageNode = ({ data, selected }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 min-w-[240px] max-w-[300px] ${
      selected 
        ? 'border-teal-500 shadow-xl ring-2 ring-teal-200' 
        : 'border-gray-200 hover:border-teal-300 hover:shadow-xl'
    }`}>
      {/* Target Handle (Left side - for incoming connections) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full hover:bg-teal-500 transition-colors duration-200 shadow-sm"
      />

      {/* Node Header */}
      <div className="bg-gradient-to-r from-teal-400 to-emerald-500 text-gray-800 px-4 py-2.5 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare size={16} />
          <span className="font-semibold text-sm">Send Message</span>
        </div>
      </div>

      {/* Node Content */}
      <div className="p-4 bg-white rounded-b-xl">
        <p className="text-sm text-gray-700 leading-relaxed">
          {data.message}
        </p>
      </div>

      {/* Source Handle (Right side - for outgoing connections) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full hover:bg-teal-500 transition-colors duration-200 shadow-sm"
      />
    </div>
  );
};

export default TextMessageNode;
