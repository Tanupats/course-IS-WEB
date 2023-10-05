import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button,Form } from "react-bootstrap";
import axios from "axios";
import '../index.css'
const Filedocs = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {
    await axios
      .get(
        "http://localhost:3000/document"
      )
      .then((res) => {
        setData(res.data);
      });
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Row>
         
            <Col sm={12} className="text-center" style={{ marginTop: "30px" }}>
              <div className="text-center mt-4 mb-4">
                <h5>เอกสาร และไฟล์ทั้งหมด</h5>
              </div>

                <Row>
                    
                    <Form.Group>
                        <Form.Label>
                                ชื่อไฟล์
                        </Form.Label>
                        <Form.Control type="text"/>
                        
                    </Form.Group>

                </Row>
              <Row>



                {data.map((data) => {
                  return (
                    <>
                      <Col sm={3} className="mb-4">
                        <Card>

                        <div className="file-components mt-4 mb-4">
                               
                          <h5> {data.filePath}</h5>
                        </div>

                        <Row className="mb-4">
                   
                          <Col sm={12}>
                            {data.name}
                            {data.detail}
                          
                          </Col>
                                          
                          </Row>
                        

      
                       
                       <Row className="mb-4">

                      

                        <Col>
                        <Button>แก้ไข</Button>
                        </Col>  
                        <Col>
                         <Button>ลบ</Button>
                        </Col>
                         
                       
                       </Row>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Col>
          
        </Row>

      </Container>
    </>
  );
};

export default Filedocs;
