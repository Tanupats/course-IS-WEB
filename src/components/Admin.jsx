import React, { useState, useEffect, useContext } from "react";
import { Nav } from "react-bootstrap";
import { Container, Row, Col, Card, Form, Image } from "react-bootstrap";
import "./Admin.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FormPlos from "./FormPlos";
import ClearIcon from "@mui/icons-material/Clear";

const Admin = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("name") === "") {
    navigate("/login");
  }

  const [formName, setFormName] = useState(
    "บันทึกความสอดคล้องกับนโยบายหรือทิศทางการศึกษา"
  );
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

  //แนบไฟล์เอกสาร
  const [file, setFile] = useState("");

  const onSelectTopic = (event) => {
    setSelectedValue(event.value);
    setTopicName(event.value);
  };

  const getSubtopics = async (id) => {
    let subtopis = [];
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/topics/getOne/${id}`)
      .then((res) => {
        subtopis = res.data.map((data) => {
          return { label: data.topic, value: data.topic };
        });
        setOptionToppics(subtopis);
      });
  };

  const addTopicData = () => {
    const checkTitle = topicsData.filter((obj) => obj.title === topicName);
    console.log("check", checkTitle);

    //ยังไม่ได้เลือกหัวข้อ
    if (topicName === "") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "กรุณาเลือกหัวข้อที่จะบันทึก",
        showConfirmButton: true,
        timer: 1000,
      });
    } else {
      if (topicsData.length === 0) {
        setTopicData([
          ...topicsData,
          {
            title: topicName,
            anwsers: [
              { list: "", Id: 1 },
              { list: "", Id: 2 },
              { list: "", Id: 3 },
            ],
          },
        ]);
      }

      if (topicsData.length > 0) {
        if (checkTitle.length) {
          alert("ได้เลือกหัวข้อนี้ไปแล้ว กรุณาเลือกใหม่อีกครั้ง");
        } else {
          setTopicData([
            ...topicsData,
            {
              title: topicName,
              anwsers: [
                { list: "", Id: 1 },
                { list: "", Id: 2 },
                { list: "", Id: 3 },
              ],
            },
          ]);
        }
      }
    }
  };

  // ลบกลุ่มหัวข้อใหญ่
  const deleteToppic = (title) => {
    let result = topicsData.filter((obj) => obj.title !== title);
    setTopicData(result);
  };

  // ลบช่องคำตอบ
  const deleteAnswerFil = (gindex, id) => {
    if (topicsData[gindex].anwsers.length > 1) {
      let result = topicsData[gindex].anwsers.filter((obj) => obj.Id !== id);
      topicsData[gindex].anwsers = result;
      console.log(result);
      setCounter(counter + 1);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ไม่สามารถลบได้ จะต้องมีคำตอบอย่างน้อย 1 คำตอบ",
        showConfirmButton: true,
        timer: 1000,
      });
    }
  };

  const addPOLdata = (title) => {
    setLerningName(title);
    setTopicData([
      {
        title: title,
        anwsers: [
          { list: "", Id: 1 },
          { list: "", Id: 2 },
          { list: "", Id: 3 },
        ],
      },
    ]);
  };

  const onSelectForm = (name, id) => {
    if (name === "บันทึกส่วนประกอบของหลักสูตร") {
      setLerningName("PLOs");
      addPOLdata("PLOs");
      setFormName(name);
    } else {
      setTopicData([]);
      setFormName(name);
      getSubtopics(id);
    }
  };

  const uploadFile = (id) => {
    file.map((fileList) => {
      let formData = new FormData();
      formData.append("name", fileList.name);
      formData.append("photo", fileList);
      formData.append("detail", id);
      axios.post(`${import.meta.env.VITE_BASE_URL}/document/upload`, formData);
    });
  };

  const addAwnser = (index) => {
    console.log(topicsData[index].anwsers);
    let newID = Math.floor(Math.random() * 100);

    topicsData[index].anwsers.push({ list: "", Id: newID });
    setCounter(counter + 1);
  };

  const updateAwnser = (index, anser, value) => {
    topicsData[index].anwsers[anser].list = value;
    console.log(topicsData[index].anwsers);
    setCounter(counter + 1);
  };

  // บันทึกความสอดคล้อง
  const postData = () => {
    let id = "";
    if (topicsData.length > 0) {
      //post toppics
      topicsData.map((item) => {
        //upload file this

        let body = { name: item.title, groupName: formName };
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/education/add`, body)
          .then((respone) => {
            //education Id
            id = respone.data.id;

            //detail
            item.anwsers.map((data) => {
              let body = { answer: data.list, educationId: id };
              axios.post(`${import.meta.env.VITE_BASE_URL}/education/detail`, body);
            });
          });
      });

      uploadFile(id);
      //upload file

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
          .post(`${import.meta.env.VITE_BASE_URL}/education/addProgram`, body)
          .then((respone) => {
            if (respone.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "บันทึกข้อมูล PLOs สำเร็จ",
                showConfirmButton: true,
                timer: 1500,
              });
            }
          });
      });

      
      setTopicData([]);
    } else if (lerningName === "CLOs") {
      //post toppics
      topicsData[0].anwsers.map((item) => {
        let body = { name: lerningName, answer: item.list };
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/education/addProgram`, body)
          .then((respone) => {
            let id = respone.data.id;

            let body = { source: yloValue, target: id };

            //for connect node Ylo to clo
            axios.post(`${import.meta.env.VITE_BASE_URL}/education/addDetail`, body);
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
          .post(`${import.meta.env.VITE_BASE_URL}/education/addProgram`, body)
          .then((respone) => {
            id = respone.data.id;

            let body = { source: ploValue, target: id };

            //for connect node Ylo to plo
            axios.post(`${import.meta.env.VITE_BASE_URL}/education/addDetail`, body);
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
      .get(`${import.meta.env.VITE_BASE_URL}/education/getPlo/PLOs`)
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
      .get(`${import.meta.env.VITE_BASE_URL}/education/getPlo/YLOs`)
      .then((res) => {
        console.log(res.data);
        clos = res.data.map((item) => {
          return { label: item.answer, value: item.programlerningId };
        });
      });

    setYlos(clos);
  };

  const getTopics = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/topics`).then((res) => {
      settopicsMenu(res.data);
    });
  };

  const handelUploadFiles = (e) => {
    setFile((item) => [...item, e.target.files[0]]);
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
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={3} id="sidebar-wrapper">
            <Nav className="d-md-block  sidebar">
              <div className="text-center mb-4">
                <Image
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "12px",
                  }}
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/${localStorage.getItem(
                    "profile"
                  )}`}
                />

                <h5> {localStorage.getItem("name")} </h5>
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
                  <FormPlos
                    file={file}
                    setFile={setFile}
                    ylos={ylos}
                    plos={plos}
                    yloValue={yloValue}
                    ploValue={ploValue}
                    addPOLdata={addPOLdata}
                    topicsData={topicsData}
                    setYloValue={setYloValue}
                    setPloValue={setPloValue}
                    addAwnser={addAwnser}
                    updateAwnser={updateAwnser}
                    deleteAnswerFil={deleteAnswerFil}
                    postDataPlo={postDataPlo}
                  />
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
                            + เพิ่มหัวข้อ
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
                                    <Col sm={4}>
                                      <Card.Title>{data.title}</Card.Title>
                                      <Button
                                        variant="light"
                                        onClick={() => addAwnser(indexp)}
                                      >
                                        + เพิ่มฟิลด์คำตอบ
                                      </Button>
                                    </Col>
                                    <Col sm={4}>
                                      <Form>
                                        <Form.Label>
                                          แนบไฟล์เพิ่มเติม
                                        </Form.Label>
                                        <Form.Control
                                          type="file"
                                          onChange={(e) => handelUploadFiles(e)}
                                        />
                                      </Form>
                                    </Col>

                                    <Col sm={4}>
                                      <Button
                                        variant="light"
                                        onClick={() => deleteToppic(data.title)}
                                        style={{ float: "right" }}
                                        className="text-right"
                                      >
                                        <ClearIcon
                                          style={{
                                            color: "red",
                                            float: "right",
                                          }}
                                        />
                                      </Button>
                                    </Col>
                                  </Row>

                                  <div className="anwser mt-3">
                                    <Row>
                                      {data.anwsers.map((item, index) => {
                                        return (
                                          <>
                                            <Col sm={5} className="d-flex">
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
                                            <Col sm={1}>
                                              <div
                                                style={{ marginTop: "12px" }}
                                                onClick={() =>
                                                  deleteAnswerFil(
                                                    indexp,
                                                    item.Id
                                                  )
                                                }
                                              >
                                                <DeleteIcon />
                                              </div>
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
                    </div>
                    <Row>
                      <Col sm={6}>
                        <Button variant="success" onClick={() => postData()}>
                          บันทึกข้อมูล
                        </Button>
                      </Col>
                      <Col sm={6}>
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
