import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Image, Card, Alert } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigae = useNavigate();

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("photo", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("systemName", "course");
    formData.append("role", "admin");

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/register`, formData)
      .then((res) => {
        if (res.status === 200) {
          navigae("/login");
        }
      })
      .catch((err) => {
        if (err) {
          setMessage("ผู้ใช้นี้ได้ลงทะเบียนแล้ว");
        }
      });
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div>
      <Row>
        <Col sm={4}></Col>

        <Col sm={4} className="p-0">
          <div className="login-form">
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={12} className="p-0">
                    <center>
                      {" "}
                      <Image
                        src={file ? URL.createObjectURL(file) : "profile.png"}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50px",
                        }}
                      />
                    </center>
                  </Col>
                  <Col sm={12}>
                    <Form
                      className="section-form"
                      onSubmit={(e) => handelSubmit(e)}
                      enctype="multipart/form-data"
                    >
                      <h4 className="text-center"> ลงทะเบียน</h4>

                      <Form.Group className="mb-4">
                        <Form.Label>อัพโหลดโปรไฟล์</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>ชื่อ-นามสกุล</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          placeholder="ชื่อ"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>อีเมล</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          placeholder="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="***"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <br />
                      {message ? <Alert variant="danger" className="text-center"> {message} </Alert> : <></>}
                      <br />
                      <a href="/login">หากมีบัญชีอยู่แล้ว คลิกเข้าสู่ระบบ</a>
                      <Button type="submit" className=" w-100 mt-4">
                        ลงทะเบียน
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </div>
  );
};

export default Register;
