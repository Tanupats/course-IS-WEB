import React, { useState, useEffect, useContext } from "react";
import { Nav } from "react-bootstrap";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "./Admin.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Swal from "sweetalert2";
import Select from "react-select";
import { AuthData } from "../AuthContext";
import { Link } from "react-router-dom";

const Admin = () => {
  const { isLogin } = useContext(AuthData);

  const [formName, setFormName] = useState("บันทึกความสอดคล้องกับนโยบาย");
  const [topicsMenu, settopicsMenu] = useState([]);

  const [optionToppics, setOptionToppics] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [counter, setCounter] = useState(0);
  const [topicsData, setTopicData] = useState([]);
  const [topicName, setTopicName] = useState("");

  const [lerningName, setLerningName] = useState("");

  const [plos, setPlos] = useState([]);
  const [ylos, setYlos] = useState([]);
  const [yloValue, setYloValue] = useState(0);
  const [ploValue, setPloValue] = useState(0);

  const onSelectTopic = (event) => {
    setSelectedValue(event.value);
    setTopicName(event.value);
  };

  const getSubtopics = async (id) => {
    let subtopis = [];
    await axios.get(`http://localhost:3000/topics/getOne/${id}`).then((res) => {
      subtopis = res.data.map((data) => {
        return { label: data.topic, value: data.topic };
      });
      setOptionToppics(subtopis);
    });
  };

  const addTopicData = () => {
    if (topicName === "") {
      alert("กรุณาเลือกหัวข้อที่จะบันทึก");
    } else {
      setTopicData([
        ...topicsData,
        {
          title: topicName,
          anwsers: [{ list: "" }, { list: "" }, { list: "" }],
        },
      ]);
    }
  };

// ลบกลุ่มหัวข้อใหญ่ 
  const deleteToppic = (title) => {
    let result = topicsData.filter((obj) => obj.title !== title);
    setTopicData(result);
  };

  // ลบช่องคำตอบ
  const deleteAnswerFil = (gindex, list) => {
    let result = topicsData[gindex].anwsers.filter((obj) => obj.list !== list);

      topicsData[gindex].anwsers=result;
      console.log(result);
      setCounter(counter + 1);
  };

  const addPOLdata = (title) => {
    setLerningName(title);
    setTopicData([
      {
        title: title,
        anwsers: [{ list: "" }, { list: "" }, { list: "" }],
      },
    ]);
  };

  const onSelectForm = (name, id) => {
    if (name === "บันทึกส่วนประกอบของหลักสูตร") {
      setLerningName("PLOs");
      addPOLdata("PLOs");
    }

    setFormName(name);
    getSubtopics(id);
  };

  const addAwnser = (index) => {
    console.log(topicsData[index].anwsers);
    topicsData[index].anwsers.push({ list: "" });
    setCounter(counter + 1);
  };

  const updateAwnser = (index, anser, value) => {
    topicsData[index].anwsers[anser].list = value;
    console.log(topicsData[index].anwsers);
    setCounter(counter + 1);
  };

  // บันทึกความสอดคล้อง
  const postData = () => {
    if (topicsData.length > 0) {
      //post toppics
      topicsData.map((item) => {
        let body = { name: item.title, groupName: formName };
        axios
          .post("http://localhost:3000/education/add", body)
          .then((respone) => {
            let id = respone.data.id;
            //detail
            item.anwsers.map((data) => {
              let body = { answer: data.list, educationId: id };
              axios.post("http://localhost:3000/education/detail", body);
            });
          });
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      });
      setTopicData([]);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยังไม่มีข้อมูลสำหรับบันทึก",
        showConfirmButton: true,
      });
    }
  };

  const postDataPlo = () => {
    if (lerningName === "PLOs") {
      //post plos
      topicsData[0].anwsers.map((item) => {
        let body = { name: lerningName, answer: item.list };
        axios
          .post("http://localhost:3000/education/addProgram", body)
          .then((respone) => {
            if (respone.status === 200)
              Swal.fire({
                position: "center",
                icon: "success",
                title: "บันทึกข้อมูล PLOs สำเร็จ",
                showConfirmButton: true,
                timer: 1500,
              });
          });
      });

      setTopicData([]);
    } else if (lerningName === "CLOs") {
      //post toppics
      topicsData[0].anwsers.map((item) => {
        let body = { name: lerningName, answer: item.list };
        axios
          .post("http://localhost:3000/education/addProgram", body)
          .then((respone) => {
            let id = respone.data.id;

            let body = { source: yloValue, target: id };
            //for connect node Ylo to clo
            axios.post("http://localhost:3000/education/addDetail", body);
          });
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูล CLOs สำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      });
      setTopicData([]);
    } else if (lerningName === "YLOs") {
      //post toppics
      topicsData[0].anwsers.map((item) => {
        let body = { name: lerningName, answer: item.list };
        axios
          .post("http://localhost:3000/education/addProgram", body)
          .then((respone) => {
            let id = respone.data.id;

            let body = { source: ploValue, target: id };

            //for connect node Ylo to plo
            axios.post("http://localhost:3000/education/addDetail", body);
          });
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูล YLOs สำเร็จ",
        showConfirmButton: true,
        timer: 1500,
      });

      setTopicData([]);
    }
  };

  const getPLOs = async () => {
    let plos = [];
    await axios
      .get("http://localhost:3000/education/getPlo/PLOs")
      .then((res) => {
        console.log(res.data);
        plos = res.data.map((item) => {
          return { label: item.answer, value: item.programlerningId };
        });
      });
    setPlos(plos);
  };

  const getYLOs = async () => {
    let clos = [];
    await axios
      .get("http://localhost:3000/education/getPlo/YLOs")
      .then((res) => {
        console.log(res.data);
        clos = res.data.map((item) => {
          return { label: item.answer, value: item.programlerningId };
        });
      });

    setYlos(clos);
  };

  const getTopics = async () => {
    await axios.get("http://localhost:3000/topics/").then((res) => {
      settopicsMenu(res.data);
    });
  };

  useEffect(() => {
    getSubtopics(1);
    getTopics();
    getPLOs();
    getYLOs();
  }, []);

  useEffect(() => {
    console.log(topicsData);
  }, [topicsData]);

  useEffect(() => {}, [counter]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={3} id="sidebar-wrapper">
            <Nav className="d-md-block  sidebar">
              <div className="text-center mb-2">
                {" "}
                <span>ผู้ใช้ : {localStorage.getItem("name")} </span>
              </div>

              {topicsMenu.map((data) => {
                return (
                  <Nav.Item
                    key={data.id}
                    onClick={() => onSelectForm(data.topic, data.id)}
                  >
                    <Nav.Link style={{ color: "#fff" }}>{data.topic}</Nav.Link>
                  </Nav.Item>
                );
              })}

              <Nav.Item>
                <Nav.Link
                  onClick={() => onSelectForm("บันทึกส่วนประกอบของหลักสูตร")}
                  style={{ color: "#fff" }}
                >
                  บันทึกส่วนประกอบของหลักสูตร
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/education"} style={{ color: "#fff" }}>
                  จัดการข้อมูลความสอดคล้อง
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/file-docs"} style={{ color: "#fff" }}>
                  บันทึกไฟล์ และเอกสาร
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9} id="page-content-wrapper ">
            <Card className="mt-4 mb-4">
              <Card.Body>
                <Card.Title className="text-center mt-4 mb-4">
                  {formName}
                </Card.Title>

                {formName === "บันทึกส่วนประกอบของหลักสูตร" && (
                  <Form>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        onClick={() => addPOLdata("PLOs")}
                        variant="primary"
                      >
                        PLOs
                      </Button>
                      <Button
                        onClick={() => addPOLdata("CLOs")}
                        variant="primary"
                      >
                        CLOs
                      </Button>
                      <Button
                        onClick={() => addPOLdata("YLOs")}
                        variant="primary"
                      >
                        YLOs
                      </Button>
                    </ButtonGroup>

                    {topicsData.map((data, indexp) => {
                      return (
                        <Row className="mb-3 mt-3" key={indexp}>
                          <Col>
                            <Card>
                              <Card.Body>
                                <Row>
                                  <Col sm={4}>

                                      {data.title==='PLOs' && (
                                               <Card.Title> เขียนผลลัพธ์การศึกษาของหลักสูตร {data.title}</Card.Title>

                                      )} 
                                   
                                      {data.title==='CLOs' && (
                                               <Card.Title> เขียนผลลัพธ์การศึกษาของรายวิชา {data.title}</Card.Title>

                                      )} 
                                   
                                      {data.title==='YLOs' && (
                                               <Card.Title> เขียนผลลัพธ์การศึกษาระดับชั้นปี {data.title}</Card.Title>

                                      )} 
                                   

                                    {data.title === "CLOs" && (
                                      <Form.Group className="mt-4">
                                        <Form.Label>
                                          เลือก YLOs {yloValue}
                                        </Form.Label>
                                        <Select
                                          options={ylos}
                                          onChange={(e) => setYloValue(e.value)}
                                        />
                                      </Form.Group>
                                    )}
                                    {data.title === "YLOs" && (
                                      <Form.Group className="mt-4" >
                                        <Form.Label>
                                          เลือก PLOs {ploValue}
                                        </Form.Label>
                                        <Select
                                          options={plos}
                                          onChange={(e) => setPloValue(e.value)}
                                        />
                                      </Form.Group>
                                    )}

                                    <Button
                                      variant="light mt-4"
                                      onClick={() => addAwnser(indexp)}
                                    >
                                      {" "}
                                      + เพิ่มช่องคำตอบ
                                    </Button>
                                  </Col>
                               
                                </Row>

                                <div className="anwser mt-3">
                                  <Row>
                                    {data.anwsers.map((item, index) => {
                                      return (
                                        <>
                                        <Col sm={4}  >
                                          <Form.Group>
                                          <Form.Label> ข้อที่ {index+1}</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder={`ข้อมูล ${data.title}`}
                                            className="mt-2"
                                            defaultValue={item.list}
                                            onChange={(e) =>
                                              updateAwnser(
                                                indexp,
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                         
                                          </Form.Group> 
                                           <Button
                                            variant="danger"
                                            onClick={() =>
                                              deleteAnswerFil(indexp, item.list)
                                            }
                                          >
                                          ลบ    
                                          </Button>
                                        </Col>
                                      
                                        
                                        </>
                                      );
                                    })}
                                  </Row>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      );
                    })}

                    <Row className="mt-4 ">
                      <Col sm={4}>
                        <Button
                          variant="success w-50"
                          onClick={() => postDataPlo()}
                        >
                          บันทึกข้อมูล 
                        </Button>
                      </Col>
                      <Col sm={4}>
                        <Button variant="danger w-50">ยกเลิก</Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                {formName !== "บันทึกส่วนประกอบของหลักสูตร" && (
                  <Form>
                    <Row>
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Label>
                            เลือกหัวข้อสำหรับบันทึกข้อมูล{" "}
                          </Form.Label>
                          <Select
                            onChange={onSelectTopic}
                            options={optionToppics}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Label>กำหนดเอง </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="อื่นๆ"
                            onChange={(e) => setTopicName(e.target.value)}
                          />
                        </Form.Group>
                        <br />
                      </Col>
                      <Col>
                        <Form.Group style={{ marginTop: "29px" }}>
                          <Button onClick={() => addTopicData()}>
                            + เพิ่มข้อมูล
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="topic">
                      {topicsData.map((data, indexp) => {
                        return (
                          <Row className="mb-3 ">
                            <Col>
                              <Card>
                                <Card.Body>
                                  <Row>
                                    <Col sm={10}>
                                      <Card.Title>{data.title}</Card.Title>
                                      <Button
                                        variant="light"
                                        onClick={() => addAwnser(indexp)}
                                      >
                                        + เพิ่มฟิลด์คำตอบ
                                      </Button>
                                    </Col>
                                    <Col sm={2}>
                                      <Button
                                        variant="danger"
                                        onClick={() => deleteToppic(data.title)}
                                        style={{ float: "right" }}
                                        className="text-right"
                                      >
                                        X
                                      </Button>
                                    </Col>
                                  </Row>

                                  <div className="anwser mt-3">
                                    <Row>
                                      {data.anwsers.map((item, index) => {
                                        return (
                                          <Col sm={4} className="d-flex">
                                            <Form.Control
                                              type="text"
                                              placeholder="กรกอกข้อมูล"
                                              className="mt-2"
                                              defaultValue={item.list}
                                              onChange={(e) =>
                                                updateAwnser(
                                                  indexp,
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </Col>
                                        );
                                      })}
                                    </Row>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                    <Row>
                      <Col>
                        <Button variant="success" onClick={() => postData()}>
                          บันทึกข้อมูล
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="danger">ยกเลิก</Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
