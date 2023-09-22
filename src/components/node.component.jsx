import React, { Fragment, useCallback, useState } from "react";
import ReactFlow,{Controls} from "react-flow-renderer";
import { Form, Button, Col, Row } from 'react-bootstrap';

const initialNodes = [
    { id: '1', position: { x: 300, y: 300 }, data: { label: 'PLOs1' } },
    { id: '2', position: { x: 500, y: 300 }, data: { label: 'PLOs2' } },
    { id: '3', position: { x: -50, y: 500 }, data: { label: 'YLOs1' } },
    { id: '4', position: { x:150, y: 500 }, data: { label: 'YLOs2' } },
    { id: '5', position: { x:500, y: 500 }, data: { label: 'YLOs3' } },
    { id: '6', position: { x:700, y: 500 }, data: { label: 'YLOs4' } },
]

const initialEdges = [{ id: 'e1', source: '1', target: '3' }, 
                      { id: 'e2', source: '1', target: '4' } ,
                      { id: 'e3', source: '1', target: '5' },
                      { id: 'e4', source: '1', target: '5' }
                    ];

const MindNode = () => {

    const [nodes, setNodes, onNodesChange] = useState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useState(initialEdges);
    const [name, setName] = useState("");

    



    return (
       <Fragment>
           
     
                    <ReactFlow
                        style={{ width: '100%', height: '100vh' }}
                        fitView
                        nodes={initialNodes}
                        edges={initialEdges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                   
                       
                       
                    />


                  </Fragment>


              
            


       )
}
export default MindNode;