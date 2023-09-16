import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import ReportPLO from "./ReportPLO";
import ReportAll from "./ReportAll";

const NavbarMenu = () => {

  
  return (
    <div>
      <Router>
      
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#B57DDE' }}
        >
            <Container fluid>
            <Navbar.Brand>
              {" "}
              <Image
                src="./src/assets/logo.jpg"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />{" "}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={{ color: '#fff' }}>ระบบจัดทำหลักสูตร</Nav.Link>
                <Nav.Link as={Link} to={"/"} style={{ color: '#fff' }}>
                  หน้าหลัก
                </Nav.Link>
                <Nav.Link as={Link} to={"/reportPLO"} style={{ color: '#fff' }}>
                  สรุปความสอดคล้อง PLOs
                </Nav.Link>
                <Nav.Link as={Link} to={"/all"} style={{ color: '#fff' }}>
                  สรุปความสอดคล้อง 
                </Nav.Link>
                <Nav.Link as={Link} to={"/PLOMindmap"} style={{ color: '#fff' }}>
                  แผนผังความคิด PLOs

                </Nav.Link>
              </Nav>
              <Nav>
                
                  <Nav.Link as={Link} to={"/admin"} style={{ color: '#fff' }}>
                    จัดการข้อมูลหลักสูตร 
                  </Nav.Link>
                
                  <Nav.Link as={Link} to={"/login"} style={{ color: '#fff' }}>
                  เข้าสู่ระบบ
                  </Nav.Link>
                

                  <Nav.Link
                  as={Link} to={"/login"}
                    style={{ color: '#fff' }}
                    
                  >
                    ออกจากระบบ
                  </Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
     </Container>
        </Navbar>
      
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/all" Component={ReportAll}></Route>
          <Route path="/admin" Component={Admin}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/reportPLO" Component={ReportPLO}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default NavbarMenu;
