import React, { Fragment, useCallback, useState, useEffect } from "react";
import ReactFlow, {



    useNodesState,
    useEdgesState,
    addEdge,
} from "react-flow-renderer";
import { Form, Button, Col, Row } from 'react-bootstrap'
const initialNodes = [
    { id: '1', position: { x: 40, y: 0.5 }, data: { label: 'PLOs' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'PLOs' } },
    { id: '3', position: { x: 0, y: 200 }, data: { label: 'PLOs' } },
    { id: '4', position: { x: 0, y: 300 }, data: { label: 'PLOs' } },
    { id: '5', position: { x: 0, y: 400 }, data: { label: 'CLOs' } },
    { id: '6', position: { x: 0, y: 500 }, data: { label: 'YLOs' } },
    { id: '7', position: { x: 0, y: 600 }, data: { label: 'YLOs' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3' }];
const MindNode = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [name, setName] = useState("");
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const addNode = () => {
        setNodes([
            ...initialNodes,
            {
                id: '7',
                data: { label: `${name}` },
                position: { x: 0, y: 0 }
            }])

    }

    useEffect(() => {
        console.log(nodes)
    }, [])

    return (
        <Row>
           
            <Col sm={12}>
                <div>
                    <ReactFlow
                        fitView
                        nodes={initialNodes}
                        edges={initialEdges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        style={{ width: '100%', height: '90vh', border: '1px solid #000' }}

                    />



                </div>
            </Col>


        </Row>)
}
export default MindNode;