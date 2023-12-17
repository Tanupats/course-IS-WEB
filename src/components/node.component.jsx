import React, { Fragment, useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { Row, Col, Button } from "react-bootstrap";
import "./node.css";
import axios from "axios";
import SchemaIcon from "@mui/icons-material/Schema";
import Swal from "sweetalert2";
const MindNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onLoad = (ReactFlowInstance) => {
    ReactFlowInstance.fitView();
  };

  const getPlos = async () => {
    let nodelist = [];
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/education/getPlos`)
      .then((res) => {
        nodelist = res.data.map((item) => {
          return {
            id: item.programlerningId.toString(),
            position: {
              x: item.x ? item.x : Math.random() * window.innerWidth,
              y: item.y ? item.y : Math.random() * window.innerHeight,
            },
            data: {
              label: (
                <div className={`node-item-${item.name}`}> {item.answer}</div>
              ),
            },
          };
        });

        setNodes(nodelist);
      });
  };
  const getEage = async () => {
    let egelist = [];
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/education/getDetail`)
      .then((res) => {
        egelist = res.data.map((ege) => {
          return {
            id: `${"e" + ege.source.toString() + "-" + ege.target.toString()}`,
            source: ege.source.toString(),
            target: ege.target.toString(),
          };
        });
        setEdges(egelist);
      });
  };

  const UpdatePositions = async () => {
    nodes.map((data) => {
      let body = { x: data.position.x, y: data.position.y };
      axios.put(
        `${import.meta.env.VITE_BASE_URL}/education/updatePosition/${data.id}`,
        body
      );
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "แก้ไขข้อมูลสำเร็จ",
      timer: 1500,
    });

    await getPlos();
    await getEage();
  };

  useEffect(() => {
    getPlos();
    getEage();
  }, []);
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <Button 
          
           onClick={() => 
           UpdatePositions()} 
           variant="warning">
            {" "}
            <SchemaIcon  style={{color:'#fff'}} /> แก้ไขตำแหน่ง{" "}
          </Button>
        </Col>
      </Row>
      <ReactFlow
        style={{ width: "100%", height: "100vh" }}
        onLoad={onLoad}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </Fragment>
  );
};
export default MindNode;
