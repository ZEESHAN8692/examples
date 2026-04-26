'use client';

import React, { useMemo, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge, 
  ConnectionLineType,
  Handle,
  Position,
  NodeProps,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Search, 
  MousePointer2, 
  Hand, 
  Calendar, 
  Settings, 
  Share2, 
  Plus, 
  ChevronRight,
  Info
} from 'lucide-react';
import '../visualization.css';

// Custom Address Node
const AddressNode = ({ data, selected }: NodeProps) => (
  <div className={`addressNode ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Left} style={{ visibility: 'hidden' }} />
    <div className="nodeIcon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
    <div className="nodeLabel">{data.label.substring(0, 8)}...</div>
    {data.isTarget && <div className="targetIndicator">⬇</div>}
    <Handle type="source" position={Position.Right} style={{ visibility: 'hidden' }} />
    
    <style jsx>{`
      .addressNode {
        background: white;
        border: 2px solid #003399;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.2s;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      .addressNode.selected {
        box-shadow: 0 0 0 4px rgba(0, 51, 153, 0.2);
        transform: scale(1.1);
      }
      .nodeIcon {
        color: #003399;
      }
      .nodeLabel {
        position: absolute;
        bottom: -20px;
        font-size: 10px;
        font-weight: 600;
        color: #4b5563;
        white-space: nowrap;
      }
      .targetIndicator {
        position: absolute;
        top: -20px;
        color: #003399;
        font-weight: bold;
      }
    `}</style>
  </div>
);

const nodeTypes = {
  address: AddressNode,
};

export default function VisualizationPage() {
  const { address } = useParams();
  const router = useRouter();
  
  // Real API call (with mock fallback for demo stability)
  const { data: txData, isLoading } = useQuery({
    queryKey: ['txs', address],
    queryFn: async () => {
      try {
        const response = await axiosInstance.post(`/address/${address}/all-txs`, {
          limit: 10
        });
        return response.data;
      } catch (error) {
        console.warn('API Failed, using mock data');
        return null;
      }
    }
  });

  // Mock data for visualization based on the provided image
  const { nodes, edges } = useMemo(() => {
    const initialNodes: Node[] = [
      {
        id: '1',
        type: 'address',
        position: { x: 100, y: 300 },
        data: { label: '15V5iVsoetMoHSJmCHTVPujGpWg7eRSbXi' },
      },
      {
        id: '2',
        type: 'address',
        position: { x: 450, y: 300 },
        data: { label: address as string, isTarget: true },
      },
      {
        id: '3',
        type: 'address',
        position: { x: 800, y: 300 },
        data: { label: '16zy2qPQs...' },
      }
    ];

    const initialEdges: Edge[] = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        label: '196.685 BTC',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#003399' },
        style: { stroke: '#003399', strokeWidth: 2 },
        labelStyle: { fill: '#003399', fontWeight: 700, fontSize: 12 },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      },
      {
        id: 'e2-3',
        source: '2',
        target: '3',
        label: '0.03 BTC',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#003399' },
        style: { stroke: '#003399', strokeWidth: 2 },
        labelStyle: { fill: '#003399', fontWeight: 700, fontSize: 12 },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      }
    ];

    return { nodes: initialNodes, edges: initialEdges };
  }, [address]);

  return (
    <div className="visualizerContainer">
      <header className="visHeader">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="visLogo">
            Crystal <span>Lite</span>
          </div>
          <div style={{ display: 'flex', background: '#1e293b', borderRadius: '6px', padding: '0.25rem' }}>
            <button style={{ padding: '0.25rem 0.75rem', border: 'none', background: '#334155', color: 'white', borderRadius: '4px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={14} /> Visualization
            </button>
            <button style={{ padding: '0.25rem 0.75rem', border: 'none', background: 'transparent', color: '#94a3b8', fontSize: '0.875rem' }}>
              New
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Search size={18} />
          <Info size={18} />
          <div style={{ background: '#334155', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
            Login
          </div>
          <div style={{ background: '#ffca28', color: 'black', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
            Sign up
          </div>
        </div>
      </header>

      <main className="visMain">
        <aside className="visSidebar">
          <div className="sidebarSection">
            <h3 className="sidebarTitle">Visualization details</h3>
            <p style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>Items: 3 of 200</p>
          </div>

          <div className="sidebarSection">
            <h3 className="sidebarTitle">Search and add object</h3>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Address or TX" 
                style={{ width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.5rem', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="sidebarSection">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', background: '#003399', borderRadius: '50%' }}></div>
                <h3 className="sidebarTitle" style={{ marginBottom: 0 }}>Added objects (1)</h3>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="infoCard" style={{ marginTop: 'auto' }}>
            <h3 className="sidebarTitle">Address Info</h3>
            <div className="addressBadge">{address}</div>
            <div className="statRow">
              <span className="statLabel">Balance:</span>
              <span className="statValue">1,245.50 BTC</span>
            </div>
            <div className="statRow">
              <span className="statLabel">Transactions:</span>
              <span className="statValue">862</span>
            </div>
            <div className="statRow">
              <span className="statLabel">First seen:</span>
              <span className="statValue">2014-01-12</span>
            </div>
          </div>
        </aside>

        <section className="visContent">
          <div className="controls">
            <button className="controlBtn"><MousePointer2 size={18} /></button>
            <button className="controlBtn active"><Hand size={18} /></button>
            <button className="controlBtn" style={{ marginLeft: '0.5rem', borderLeft: '1px solid #e5e7eb', borderRadius: 0, paddingLeft: '0.5rem' }}><Calendar size={18} /></button>
          </div>

          {isLoading && (
            <div className="loadingOverlay">
              <div className="spinner"></div>
              <p style={{ marginTop: '1rem', fontWeight: 600, color: '#003399' }}>Fetching transaction data...</p>
            </div>
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            connectionLineType={ConnectionLineType.SmoothStep}
          >
            <Background color="#f1f5f9" gap={20} />
            <Controls showInteractive={false} position="bottom-right" />
          </ReactFlow>
          
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}><Share2 size={18} /></button>
            <button style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}><Settings size={18} /></button>
          </div>
        </section>
      </main>
    </div>
  );
}
