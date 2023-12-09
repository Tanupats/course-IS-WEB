import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row, Container, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment/moment";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
const ReportPLO = () => {
  const [show, setShow] = useState(false);
  const [Id, setId] = useState("");
  const [name, setName] = useState("");

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id, name) => {
    setId(id);
    setName(name);
    setShow(true);
  };

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/education/getPlos`)
      .then((res) => {
        setData(res.data);
      });
  };

  const updateProgramId = async () => {
    const body = { answer: name };
    await axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/education/updateProgram/${Id}`,
        body
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            showConfirmButton: true,
            timer: 1000,
          });
        }
      });
    await getData();
    handleClose();
  };

  const deleteProgramId = async (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BASE_URL}/education/deleteProgram/${id}`
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "ลบข้อมูลสำเร็จ",
                showConfirmButton: true,
                timer: 1000,
              });

              getData();
            }
          });
        axios.delete(
          `${import.meta.env.VITE_BASE_URL}/education/programDetail/${id}`
        );
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <center>
            <Col sm={8} className="text-center" style={{ marginTop: "30px" }}>
              <div className="text-center mt-4 mb-4">
                <h5>ข้อมูลส่วนประกอบของหลักสูตร</h5>
              </div>
              <Table bordered hover variant="white">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>ผลลัพธ์</th>
                    <th>วันที่เขียน</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => {
                    return (
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.answer}</td>
                        <td>{moment(data.Datecreated).format("YYYY-MM-DD")}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() =>
                              handleShow(data.programlerningId, data.answer)
                            }
                          >
                            {" "}
                            <ModeEditIcon /> แก้ไข{" "}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              deleteProgramId(data.programlerningId)
                            }
                          >
                            {" "}
                            <DeleteIcon /> ลบ{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </center>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขข้อมูล</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label>ชื่อเรื่อง</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => updateProgramId()}>
              บันทึกข้อมูล
            </Button>
            <Button onClick={() => handleClose()} variant="danger">
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ReportPLO;
