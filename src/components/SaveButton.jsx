import React from 'react';
import { Save, Download } from 'lucide-react';

const SaveButton = ({ nodes, edges, onError }) => {
  const validateAndSaveFlow = () => {
    // Validation: Check if there are more than 1 nodes
    if (nodes.length <= 1) {
      onError('Flow must have more than 1 node to be saved.');
      return;
    }

    // Validation: Check if more than one node has empty target handles (no incoming connections)
    const nodesWithoutIncoming = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );

    if (nodesWithoutIncoming.length > 1) {
      onError('Cannot save Flow');
      return;
    }

    // Create the flow data
    const flowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      })),
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0.0',
        totalNodes: nodes.length,
        totalEdges: edges.length
      }
    };

    // Create and download the JSON file
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `chatbot-flow-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getButtonState = () => {
    if (nodes.length === 0) {
      return { disabled: true, text: 'No Nodes to Save', icon: Save };
    }
    if (nodes.length === 1) {
      return { disabled: true, text: 'Need More Nodes', icon: Save };
    }
    return { disabled: false, text: 'Save Changes', icon: Download };
  };

  const buttonState = getButtonState();

  return (
    <button
      onClick={validateAndSaveFlow}
      disabled={buttonState.disabled}
      className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 border ${
        buttonState.disabled
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
          : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 active:scale-95 shadow-md hover:shadow-lg'
      }`}
    >
      <buttonState.icon size={18} />
      <span>{buttonState.text}</span>
    </button>
  );
};

export default SaveButton;
