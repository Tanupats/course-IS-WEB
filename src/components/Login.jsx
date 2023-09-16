import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Image,
  Card
} from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {

  const navigae = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async () => {
    const body = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:3000/users/login", body)
      .then((res) => {
        if (res.status === 200) {
          
          localStorage.setItem("name", res.data.name)
          
          if( res.data.role==="admin"){
              navigae('/admin');
          }else{
            alert('ไม่สามารถเข้าสู่ระบบได้ เนื่องจากไม่ใช่อาจารย์ หรือ ผู้ดูแลระบบ')
          }
         
        }
      })
      .catch(({ response }) => {
        console.log(response.data.error);
      });
  };


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
               <center> <Image
                  src="./src/assets/logo.jpg"
                  style={{ width: "30%", height: "auto" }}
                /></center>
              </Col>
              <Col sm={12}>

                <Form className="section-form" >
                  <h4 className="text-center"> เข้าสู่ระบบ</h4>

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
                 

                </Form>
                <Button
                onClick={ () => handelSubmit()}
             
                  type="submit"
                  variant="primary"
                  className="w-100 mt-2"

                >
                  เข้าสู่ระบบ
                </Button>
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

export default Login;
