import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button, Form, Modal, Alert, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import "../index.css";
import Swal from "sweetalert2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewFile from "./PreviewFile";
import ClearIcon from '@mui/icons-material/Clear';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const Filedocs = () => {

  const [docFilter, setDocFilter] = useState("docs");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  //upload new file
  const [file, setFile] = useState("");

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");


  const [filePath, setFilePath] = useState("");


  //for update 
  const [Id, setId] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [detailUpdate, setDetailUpdate] = useState("");


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
    setNameUpdate(item.name)
    setDetailUpdate(item.detail)
    setShowUpdate(true);
  }

  const getData = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/document/${docFilter}`).then((res) => {
      setData(res.data);
    });
  };


  const uploadFile = async (event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.append("name", name);
    formData.append("photo", file);
    formData.append("detail", detail);
    formData.append("group", docFilter);
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/document/upload`, formData)
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
        .post(`${import.meta.env.VITE_BASE_URL}/document/updatefile/${Id}`, formData)
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
        axios.post(`${import.meta.env.VITE_BASE_URL}/document/${id}`, body)
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

  useEffect(() => {
    getData();
  }, [docFilter]);

  useEffect(() => {
   
  }, [data]);

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
                <Col sm={6}>

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
                <Col sm={6}>
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
                <Col sm={6} className="mt-4">

                  <Form.Group>
                    <Form.Label>
                      เลือกประเภทของไฟล์
                    </Form.Label>
                    <ButtonGroup aria-label="Basic example" className="w-100">                
                      <Button onClick={() => setDocFilter("docs")} variant="secondary">DOCS</Button>
                      <Button onClick={() => setDocFilter("image")} variant="secondary">IMAGE</Button>
                    </ButtonGroup>

                  </Form.Group>
                </Col>
                <Col sm={6} className="mt-4">
                  <Form.Group>
                  <Form.Label>
                      อัพโหลดไฟล์
                    </Form.Label>
                    <Form.Control
                      required
                      type="file"
                      name="photo"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group>
                    <Button
                      variant="success"
                      className="w-100 mt-4"
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
                  <h5>
                    {docFilter}
                  </h5>
                  {data?.map((item) => {
                    return (
                      <>
                        <Col className="mb-4 col-md-3">
                          <Card key={item.id}>
                            <Card.Body>
                              <Row className="mb-4">
                                <Col sm={12} onClick={() => handleShow(item.filePath)}>

                                  <div className="icon-docs" >


                                  <PreviewFile filePath={item.filePath} /> </div>
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

            <Form>
              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>ชื่อไฟล์ </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ชื่อไฟล์"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
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
                      value={detailUpdate}
                      onChange={(e) => setDetailUpdate(e.target.value)}
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
              <Row>
                <Col>
                
                </Col>

             
              <Button variant="success" type="submit" onClick={()=>UpdateFileId()}>
                บันทึก
              </Button> 
                <Button variant="danger" onClick={handleCloseUpdate}>
                <ClearIcon />     ยกเลิก
              </Button>
              </Row>
            </Form>


          </Modal.Body>

        </Modal>

      </Container>
    </>
  );
};

export default Filedocs;
