import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TextMessageNode from './components/TextMessageNode';
import SaveButton from './components/SaveButton';
import ErrorNotification from './components/ErrorNotification';

// Define custom node types
const nodeTypes = {
  textMessage: TextMessageNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'textMessage',
    position: { x: 250, y: 100 },
    data: { 
      title: 'Send Message',
      message: 'test message 1',
    },
  },
  {
    id: '2',
    type: 'textMessage',
    position: { x: 600, y: 50 },
    data: { 
      title: 'Send Message',
      message: 'test message 2',
    },
  },
  {
    id: '3',
    type: 'textMessage',
    position: { x: 600, y: 300 },
    data: { 
      title: 'Send Message',
      message: 'textNode',
    },
  },
];

const initialEdges = [
  {
    id: 'edge-1',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#14b8a6', strokeWidth: 2 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handle new connections between nodes
  const onConnect = useCallback((params) => {
    // Check if source already has an outgoing edge
    const sourceHasEdge = edges.some(edge => edge.source === params.source);
    
    if (sourceHasEdge) {
      setError('Each node can only have one outgoing connection!');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#14b8a6', strokeWidth: 2 },
    }, eds));
    
    // Clear any existing errors when a successful connection is made
    setError(null);
  }, [edges, setEdges]);

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // Handle canvas click (deselect node)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle drag over for drop functionality
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop of new nodes from panel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { 
          title: 'Send Message',
          message: 'New message',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Update node data when editing in settings panel
  const updateNodeData = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, [setNodes]);

  // Delete a specific node and its connected edges
  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  // Clear all nodes and edges
  const clearAllNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setError(null);
  }, [setNodes, setEdges]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Error Notification */}
      {error && (
        <ErrorNotification 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Save Button */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Chatbot Flow Builder</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={clearAllNodes}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-300 active:scale-95"
            >
              <span>Clear All</span>
            </button>
            <SaveButton 
              nodes={nodes} 
              edges={edges} 
              onError={(errorMessage) => setError(errorMessage)}
            />
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            className="bg-gray-100"
            fitView
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              color="#d1d5db"
            />
            <Controls 
              className="bg-white shadow-lg border border-gray-200 rounded-lg"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Right Sidebar - Nodes Panel or Settings Panel */}
      <div className="w-72 bg-white border-l border-gray-200 shadow-lg">
        {selectedNode ? (
          <SettingsPanel 
            node={selectedNode} 
            onUpdateNode={updateNodeData}
            onDeleteNode={deleteNode}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel 
            nodeCount={nodes.length}
            onClearAll={clearAllNodes}
          />
        )}
      </div>
    </div>
  );
}

export default App;
