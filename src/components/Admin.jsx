import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Container, Row, Col, Card, Form, Image, Modal } from "react-bootstrap";
import "./Admin.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Swal from 'sweetalert2'
import Select from 'react-select';

const Admin = () => {

  const options = [
    { value: 'ทักษะศตวรรษที่ 21', label: 'ทักษะศตวรรษที่ 21' },
    { value: 'นโยบายการศึกษาระดับประเทศ', label: 'นโยบายการศึกษาระดับประเทศ' },
    { value: 'นโยบายมหาวิทยาลัย', label: 'นโยบายมหาวิทยาลัย' },
    { value: 'แนวโน้มความเสี่ยงภายนอก', label: 'แนวโน้มความเสี่ยงภายนอก' }
  ];



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formName, setFormName] = useState("บันทึกความสอดคล้องกับนโยบาย");
  const [selectedValue, setSelectedValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [topicsData, setTopicData] = useState([]);
  const [topicName, setTopicName] = useState("");

  const [lerningName, setLerningName] = useState("");

  const [plos, setPlos] = useState([]);
  const [ylos, setYlos] = useState([]);
  const [yloValue,setYloValue] = useState(null);
  const [ploValue,setPloValue] = useState(null);


  const onSelectTopic = (event) => {

    setSelectedValue(event.value);
    setTopicName(event.value);
  }

  const onSelectForm = (name) => {
    if (name === "บันทึกส่วนประกอบของหลักสูตร") {
      setTopicData([]);
    }
    setFormName(name);


  };

  const addTopicData = () => {
    setTopicData([...topicsData, {
      title: topicName,
      anwsers: [
        { list: "" },
        { list: "" },
        { list: "" }
      ]
    }])
  }

  const addPOLdata = (title) => {

    setLerningName(title);
    setTopicData([{
      title: title,
      anwsers: [
        { list: "" },
        { list: "" },
        { list: "" },
      

      ]

    }])


  }



  const addAwnser = (index) => {

    console.log(topicsData[index].anwsers)
    topicsData[index].anwsers.push({ list: '' })
    setCounter(counter + 1)
  }

  const updateAwnser = (index, anser, value) => {
    topicsData[index].anwsers[anser].list = value;
    console.log(topicsData[index].anwsers);
    setCounter(counter + 1)
  }

  // บันทึกความสอดคล้อง
  const postData = () => {

    //post toppics 
    topicsData.map((item) => {

      let body = { name: item.title, groupName: formName };
      axios.post("http://localhost:3000/education/add", body).then((respone) => {

        let id = respone.data.id;
        //detail
        item.anwsers.map((data) => {
          let body = { answer: data.list, educationId: id };
          axios.post("http://localhost:3000/education/detail", body)
        })

      })

    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      showConfirmButton: true,
      timer: 1500
    })
    setTopicData([]);

  };

  const postDataPlo = () => {

    if (lerningName === "PLOs") {


      //post toppics 
      topicsData.map((item) => {

        let body = { name: item.title, course: 'หลักสูตรภาษาอังกฤษเพื่อการจัดการธุรกิจ' };
        axios.post("http://localhost:3000/education/addProgram", body).then((respone) => {

          let id = respone.data.id;
          //detail PLOs
          item.anwsers.map((data) => {
            let body = { programId: id, anwser: data.list };
            axios.post("http://localhost:3000/education/addDetail", body)
          })

        })

      })  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูล PLOs สำเร็จ',
        showConfirmButton: true,
        timer: 1500
      })
       setTopicData([]);
    }

  else if (lerningName === "CLOs") {

      //post toppics 
      topicsData.map((item) => {

        let body = { name: item.title, course: 'หลักสูตรภาษาอังกฤษเพื่อการจัดการธุรกิจ' };
        axios.post("http://localhost:3000/education/saveCLO", body).then((respone) => {

          let id = respone.data.id;
          //detail CLOs
          item.anwsers.map((data) => {
            let body = { courselearningId: id, answer: data.list,yloId:yloValue };
            axios.post("http://localhost:3000/education/cloDetail", body)
          })

        })

      })


      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูล CLOs สำเร็จ',
        showConfirmButton: true,
        timer: 1500
      })
      setTopicData([]);
    }

  else if (lerningName === "YLOs") {

      //post toppics 
      topicsData.map((item) => {

        let body = { name: item.title, course: 'หลักสูตรภาษาอังกฤษเพื่อการจัดการธุรกิจ' };
        axios.post("http://localhost:3000/education/saveYLO", body).then((respone) => {

          let id = respone.data.id;
          //detail YLOs
          item.anwsers.map((data) => {
            let body = { learningyearId: id, answer: data.list,ploId:ploValue };
            axios.post("http://localhost:3000/education/yloDetail", body)
          })

        })

      })
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'บันทึกข้อมูล YLOs สำเร็จ',
        showConfirmButton: true,
        timer: 1500
      })
     
      setTopicData([]);
    }


  };


  const getPLOs = async () => {
    let plos = [];
    await axios.get("http://localhost:3000/education/PLO")
      .then(res => {
        console.log(res.data)
        plos = res.data.map(item => {
          return ({ label: item.PLO, value: item.programdetailId })
        })
      })
    setPlos(plos);
  }

  const getYLOs = async () => {
    let clos = [];
    await axios.get("http://localhost:3000/education/YLO")
      .then(res => {
        console.log(res.data)
        clos = res.data.map(item => {
          return ({ label: item.YLO, value: item.id })
        })
      })

    setYlos(clos);

  }

  useEffect(() => {
    getPLOs();
    getYLOs();
  }, [])

  useEffect(() => {

  }, [topicsData]);

  useEffect(() => {

  }, [counter])
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={3} id="sidebar-wrapper">
            <Nav className="d-md-block  sidebar">
              <div className="text-center mb-4">
                {" "}
                <span>ผู้ใช้ : {localStorage.getItem("name")} </span>
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
                <Card.Title className="text-center mt-4 mb-4">
                    {formName}
                </Card.Title>

                {
                  formName === "บันทึกส่วนประกอบของหลักสูตร" && (
                    <Form>
                      <ButtonGroup aria-label="Basic example">
                        <Button onClick={() => addPOLdata('PLOs')} variant="secondary">PLOs</Button>
                        <Button onClick={() => addPOLdata('CLOs')} variant="secondary" >CLOs</Button>
                        <Button onClick={() => addPOLdata('YLOs')} variant="secondary">YLOs</Button>
                      </ButtonGroup>

                      {
                        topicsData.map((data, indexp) => {
                          return (
                            <Row className="mb-3 mt-3" key={indexp}>
                              <Col>
                                <Card>
                                  <Card.Body>
                                    <Row>
                                      <Col sm={4}>

                                        <Card.Title> เขียน {data.title}</Card.Title>
                                        {
                                          data.title === "CLOs" && (
                                            <Form.Group>
                                              <Form.Label>เลือก YLOs {yloValue}</Form.Label>
                                              <Select options={ylos}  onChange={(e)=>setYloValue(e.value)} />
                                            </Form.Group>
                                          )
                                        }
                                        {
                                          data.title === "YLOs" && (
                                            <Form.Group>
                                              <Form.Label>เลือก PLOs {ploValue}</Form.Label>
                                              <Select options={plos}  onChange={(e)=>setPloValue(e.value)}/>
                                            </Form.Group>
                                          )
                                        }

                                        <Button variant="light mt-4" onClick={() => addAwnser(indexp)}> + เพิ่มฟิลด์ข้อมูล</Button>

                                      </Col>

                                      <Col sm={8} >
                                        <Button variant="danger" style={{ float: 'right' }} className="text-right">X</Button>
                                      </Col>
                                    </Row>

                                    <div className="anwser mt-3">
                                      <Row>
                                        {
                                          data.anwsers.map((item, index) => {

                                            return (
                                              <Col sm={4} className="d-flex">
                                                <Form.Control type="text"
                                                  placeholder={`กรกอกข้อมูล ${data.title}`}
                                                  className="mt-2"
                                                  defaultValue={item.list}
                                                  onChange={(e) => updateAwnser(indexp, index, e.target.value)}
                                                />
                                              </Col>
                                            )
                                          })
                                        }


                                      </Row>

                                    </div>

                                  </Card.Body>

                                </Card>
                              </Col>
                            </Row>

                          )

                        })
                      }


                      <Row className="mt-4">
                        <Col>
                          <Button
                            variant="success w-50"
                            onClick={() => postDataPlo()}>
                            บันทึกข้อมูล { lerningName}
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger w-50"
                          >
                            ยกเลิก
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}


                {
                  formName !== "บันทึกส่วนประกอบของหลักสูตร" && (


                    <Form>
                      <Row>
                        <Col sm={4}>
                          <Form.Group>
                            <Form.Label>เลือกหัวข้อสำหรับบันทึกข้อมูล </Form.Label>
                            <Select
                              onChange={onSelectTopic}
                              options={options}
                              defaultValue={options[0]}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={4}>
                          <Form.Group>
                            <Form.Label>กำหนดเอง </Form.Label>
                            <Form.Control type="text" placeholder="อื่นๆ"
                              onChange={(e) => setTopicName(e.target.value)}
                              value={topicName} />
                          </Form.Group>
                          <br />
                        </Col>
                        <Col>
                          <Form.Group style={{ marginTop: '29px' }}>

                            <Button
                              onClick={() => addTopicData()}
                            >

                              เพิ่มข้อมูล
                            </Button>
                          </Form.Group>
                        </Col>
                      </Row>



                      <div className="topic">


                        {
                          topicsData.map((data, indexp) => {
                            return (
                              <Row className="mb-3 ">
                                <Col>
                                  <Card>
                                    <Card.Body>
                                      <Row>
                                        <Col sm={10}>
                                          <Card.Title>{data.title}</Card.Title>
                                          <Button variant="light" onClick={() => addAwnser(indexp)}>+ เพิ่มฟิลด์คำตอบ</Button>
                                        </Col>
                                        <Col sm={2} >
                                          <Button variant="danger" style={{ float: 'right' }} className="text-right">X</Button>
                                        </Col>
                                      </Row>

                                      <div className="anwser mt-3">
                                        <Row>
                                          {
                                            data.anwsers.map((item, index) => {

                                              return (
                                                <Col sm={4} className="d-flex">

                                                  <Form.Control type="text"
                                                    placeholder="กรกอกข้อมูล"
                                                    className="mt-2"
                                                    defaultValue={item.list}
                                                    onChange={(e) => updateAwnser(indexp, index, e.target.value)}
                                                  />
                                                </Col>
                                              )
                                            })
                                          }


                                        </Row>

                                      </div>

                                    </Card.Body>

                                  </Card>
                                </Col>
                              </Row>

                            )

                          })
                        }


                      </div>
                      <Row>
                        <Col>
                          <Button
                            variant="success"
                            onClick={() => postData()}>
                            บันทึกข้อมูล
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger"
                          >
                            ยกเลิก
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )
                }

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
                  <Select options={options} />
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
