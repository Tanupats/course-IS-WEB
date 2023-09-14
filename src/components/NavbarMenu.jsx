import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";

const NavbarMenu = () => {
  const [userId, setUserId] = useState(null);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    window.location.href = "/";
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <div>
      <Router>
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#853aba'}}
>
          <Container>
            <Navbar.Brand>
              {" "}
              <Image
                src="./src/assets/logo-lead.jpg"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />{" "}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={{color:'#fff'}}>ระบบจัดทำหลักสูตร</Nav.Link>
                <Nav.Link as={Link} to={"/"} style={{color:'#fff'}}>
                  หน้าหลัก
                </Nav.Link>
                <Nav.Link as={Link} to={"/service"} style={{color:'#fff'}}>
                สรุปความสอดคล้อง PLOs 
                </Nav.Link>
                <Nav.Link as={Link} to={"/contact"} style={{color:'#fff'}}>
                แผนผังความคิด PLOs
 
                </Nav.Link>
              </Nav>
              <Nav>
                {userId && (
                  <Nav.Link as={Link} to={"/admin"} style={{color:'#fff'}}>
                    จัดการข้อมูลหลักสูตร
                  </Nav.Link>
                )}

                {userId === null && (
                  <>
                    <Nav.Link as={Link} to={"/login"} style={{color:'#fff'}}>
                      เข้าสู่ระบบ
                    </Nav.Link>
                  </>
                )}
                {userId && (
                  <Nav.Link
                    onClick={() => {
                      logout();
                    }}
                  >
                    ออกจากระบบ
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/admin" Component={Admin}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default NavbarMenu;
