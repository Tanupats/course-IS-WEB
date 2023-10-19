import React from "react";
import { Container, Row, Col,Image,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="mt-4 text-center">

            <Col className="mt-4" > 
            <h1>ยินดีต้อนรับเข้าสู่ ระบบจัดทำหลักสูตร</h1>

            <Button onClick={()=>{ navigate('/login') }}>เข้าสู่ระบบ</Button>
            </Col>
            
       

      </Row>
    </Container>
  );
};

export default Home;
