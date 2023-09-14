import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Container, Row, Col, Card, Form, Image, Modal } from "react-bootstrap";
import "./Admin.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";

const Admin = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState([]);
  const [coursesType, setcoursesType] = useState([]);
  const [formName, setFormName] = useState("บันทึกความสอดคล้องกับนโยบาย");

  const onSelectForm = (name) => {
    setFormName(name);
    handleShow();
  };

  const getData = async () => {
    await axios.get("http://localhost:3000/").then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={3} id="sidebar-wrapper">
            <Nav className="d-md-block  sidebar">
              <div className="text-center mb-4">
                {" "}
                <span>ADMIN : NKC </span>
              </div>
              <Nav.Item>
                <Nav.Link
                  onClick={() => onSelectForm("บันทึกความสอดคล้องกับนโยบาย")}
                  style={{ color: "#fff" }}
                >
                  บันทึกความสอดคล้องกับนโยบาย
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => onSelectForm("บันทึกความสอดคล้องกับนทฤษฏี")}
                  style={{ color: "#fff" }}
                >
                  บันทึกความสอดคล้องกับนทฤษฏี{" "}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() =>
                    onSelectForm("บันทึกความสอดคล้องกับการประเมิน")
                  }
                  style={{ color: "#fff" }}
                >
                  บันทึกความสอดคล้องกับการประเมิน
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() =>
                    onSelectForm("บันทึกความสอดคล้องกับความต้องการ")
                  }
                  style={{ color: "#fff" }}
                >
                  บันทึกความสอดคล้องกับความต้องการ
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() => onSelectForm("บันทึกส่วนประกอบของหลักสูตร")}
                  style={{ color: "#fff" }}
                >
                  บันทึกส่วนประกอบของหลักสูตร
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9} id="page-content-wrapper ">
            <Card className="mt-4">
              <Card.Body>
                <Card.Title className="text-center">
                  ตารางแสดงข้อมูลจัดทำหลักสูตร
                </Card.Title>
                <Table striped bordered hover className="mt-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ชื่อสารสนเทศ</th>
                      <th>กลุ่มสารสนเทศ</th>
                      <th>ประเภทสารสนเทศ</th>
                      <th>ไฟล์</th>
                      <th>รายละเอียด</th>
                      <th>คีย์เวิร์ด</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((data) => {
                      return (
                        <tr key={data.informationId}>
                          <td>{data.informationId}</td>
                          <td>{data.informationName}</td>
                          <td>{data.InformationTypeId}</td>
                          <td>{data.subname}</td>
                          <td>{data.sources}</td>
                          <td> {data.detail}</td>
                          <td>{data.keyword}</td>
                          <td>
                            <Button variant="warning">แก้ไข</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>{formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>เลือกหัวข้อสำหรับบันทึกข้อมูล </Form.Label>
                  <Form.Select>
                    {coursesType.map((data) => {
                      return (
                        <option value={data.InformationTypeId}>
                          {data.typeName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>กำหนดเอง </Form.Label>
                  <Form.Control type="text" placeholder="หัวข้อแบบกำหนดเอง" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            บันทึกข้อมูล
          </Button>
          <Button variant="danger" onClick={handleClose}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admin;
