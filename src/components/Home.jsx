import React from "react";
import { Container, Row, Col,Image,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="mt-4 text-center">

            <Col className="mt-4 mb-4" > 
            <h1 className="mb-4">ยินดีต้อนรับเข้าสู่ ระบบจัดทำหลักสูตร</h1>

              <div className="cover" >
                <Image style={{width:'100%'}}  src="Nkc_86011713544421.jpg"/>
              </div>
            <Button style={{width:'300px',marginTop:'60px'}}   onClick={()=>{ navigate('/login') }}>เข้าสู่ระบบ</Button>
            </Col>
            
            <p>{import.meta.env.VITE_BASE_URL}</p>
       

      </Row>
    </Container>
  );
};

export default Home;
