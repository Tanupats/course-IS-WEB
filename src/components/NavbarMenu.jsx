import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import ReportPLO from "./ReportPLO";
import ReportAll from "./ReportAll";
import MindMapping from "./MindMapping";
import { AuthData } from "../AuthContext";
import Education from "./Education";
import Filedocs from "./Filedocs"
import Register from "./Register";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
const NavbarMenu = () => {

  const { isLogin,setIsLogin } = useContext(AuthData);

  const Logout = () => {
    setIsLogin("nologin");
    localStorage.setItem("name","")
  }
  
  return (
    <div>
      <Router>

        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#B57DDE' }}
        >

          <Navbar.Brand>
            {" "}
            <Image
              src="logo.jpg"
              style={{ width: "50px", height: "50px", borderRadius: '50%', marginLeft: '12px', objectFit: "cover" }}
            />{" "}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{ backgroundColor: '#B57DDE' }}>
            <Nav className="me-auto p-2">
              <Nav.Link style={{ color: '#fff' }}>ระบบจัดทำหลักสูตร</Nav.Link>
              <Nav.Link as={Link} to={"/"} style={{ color: '#fff' }}>
                หน้าหลัก
              </Nav.Link>
              <Nav.Link as={Link} to={"/reportPLO"} style={{ color: '#fff' }}>
                สรุป PLOs
              </Nav.Link>
              <Nav.Link as={Link} to={"/all"} style={{ color: '#fff' }}>
                สรุปความสอดคล้อง
              </Nav.Link>
              <Nav.Link as={Link} to={"/Mindmap"} style={{ color: '#fff' }}>
                แผนผังความคิด PLOs

              </Nav.Link>
            </Nav>
            <Nav className="p-2">

              {

                isLogin === "loginged" ? ( 
                <>
                <Nav.Link style={{ color: '#fff' }}> <PersonIcon /> {localStorage.getItem("name") } </Nav.Link>
                <Nav.Link as={Link} to={"/admin"} style={{ color: '#fff' }}>
                  จัดการข้อมูลหลักสูตร
                </Nav.Link>
                <Nav.Link
                as={Link} to={"/login"}
                style={{ color: '#fff' }}
                onClick={() => Logout()}
              >

              <LogoutIcon />  ออกจากระบบ
              </Nav.Link>
              </>
                ) : (

                     <Nav.Link as={Link} to={"/login"} style={{ color: '#fff' }}>
                เข้าสู่ระบบ
              </Nav.Link>
                )


              }


           



            </Nav>
          </Navbar.Collapse>


        </Navbar>

        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/all" Component={ReportAll}></Route>
          <Route path="/admin" Component={Admin}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/reportPLO" Component={ReportPLO}></Route>
          <Route path="/Mindmap" Component={MindMapping}></Route>
          <Route path="/education" Component={Education}></Route>
          <Route path="/file-docs" Component={Filedocs}></Route>
          <Route path="/register" Component={Register}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default NavbarMenu;
