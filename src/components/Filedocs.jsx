import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import "../index.css";
import Swal from "sweetalert2";
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewFile from "./PreviewFile";
import ClearIcon from '@mui/icons-material/Clear';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const Filedocs = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [filePath, setFilePath] = useState("");
  const [Id, setId] = useState("");

  const handleClose = () => {
    setFilePath("")
    setShow(false);
  }

  const handleCloseUpdate = () => {
    setShowUpdate(false);

  }

  const handleShow = (path) => {
    setFilePath(path)
    setShow(true);
  }

  const handleShowUpdate = (item) => {
    setId(item.Id)
    setFilePath(item.filePath)
    setName(item.name)
    setDetail(item.detail)
    setShowUpdate(true);
  }

  const getData = async () => {
    await axios.get("http://localhost:3000/document").then((res) => {
      setData(res.data);
    });
  };


  const uploadFile = async (event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.append("name", name);
    formData.append("photo", file);
    formData.append("detail", detail);
    await axios
      .post("http://localhost:3000/document/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: true,
          });
        }
      });

    await getData();
  };

  const UpdateFileId = async () => {

    let formData = new FormData();

    formData.append("path", filePath);
    formData.append("name", name);
    formData.append("photo", file);
    formData.append("detail", detail);

    await axios
      .post("http://localhost:3000/document/updatefile/" + Id, formData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            showConfirmButton: true,
          });

        }
      });

    getData();
    handleCloseUpdate();
  };


  const deleteFile = async (id, path) => {
    const body = { docpath: path }

    Swal.fire({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3000/document/' + id, body)
          .then(res => {
            if (res.status === 200) {
              getData()
            }
          })

      }
    })




  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="text-center" style={{ marginTop: "30px" }}>
            <div className="text-center mt-4 mb-4">
              <h5>ข้อมูลไฟล์เอกสารทั้งหมด</h5>
            </div>

            <Form onSubmit={uploadFile}>
              <Row>
                <Col sm={4}>

                  <Form.Group>

                    <Form.Control
                      type="text"
                      placeholder="ชื่อไฟล์"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>

                    <Form.Control
                      required
                      placeholder="รายละเอียด"
                      type="text"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group>

                    <Form.Control
                      required
                      type="file"
                      name="photo"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group>
                    <Button
                      className="w-100"
                      style={{ marginTop: '0px' }}
                      type="submit">
                      <FileUploadIcon />  อัพโหลดไฟล์
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>

            {
              data.length > 0 && (
                <Row style={{ marginTop: '40px' }}>
                  {data?.map((item) => {
                    return (
                      <>
                        <Col className="mb-4 col-md-3">
                          <Card key={item.id}>
                            <Card.Body>
                              <Row className="mb-4">
                                <Col sm={12} onClick={() => handleShow(item.filePath)}>

                                  <div className="icon-docs" >
                                    <FolderIcon style={{ fontSize: '20vh', color: '#4c5cab' }} />
                                  </div>
                                  <h5 className="mt-2">  {item.name}</h5>
                                  <span> {item.detail}</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Button onClick={() => handleShowUpdate(item)} variant="warning" style={{ color: '#fff' }} > <EditIcon /></Button>
                                </Col>
                                <Col>
                                  <Button variant="danger" onClick={() => deleteFile(item.Id, item.filePath)}> <DeleteIcon /></Button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              )
            }



            {
              data.length === 0 && (
                <Alert className="mt-4" > <FileCopyIcon style={{ fontSize: '38px', marginTop: '12px', marginBottom: '12px' }} /><h5>ยังไม่มีข้อมูลไฟล์อัพโหลด</h5></Alert>
              )
            }
          </Col>
        </Row>

        <Modal
          size="lg"
          show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>พรีวิวไฟล์</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewFile filePath={filePath} />

          </Modal.Body>
          <Modal.Footer>

            <Button variant="danger" onClick={handleClose}>
              <ClearIcon />  ปิด
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขไฟล์</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form >
              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>ชื่อไฟล์ </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ชื่อไฟล์"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>รายละเอียด</Form.Label>
                    <Form.Control
                      required
                      placeholder="รายละเอียด"
                      type="text"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>อัพโหลดไฟล์</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      name="photo"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>

              </Row>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => UpdateFileId()}>
              บันทึก
            </Button>
            <Button variant="danger" onClick={handleCloseUpdate}>
              <ClearIcon />     ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Filedocs;
