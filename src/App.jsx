import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMenu from './components/NavbarMenu';
import Container from 'react-bootstrap/esm/Container';
const  App =()=> {

  return (
    <>
    <Container fluid >

           <NavbarMenu />
           
    </Container>
    </>
  )
}

export default App
