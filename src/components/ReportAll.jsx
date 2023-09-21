import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import moment from "moment/moment";
const ReportAll = () => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [detail,setDetail] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {

    await axios.get("https://mysql-deploy-8293b2207e7e.herokuapp.com/education/educations")
      .then(res => {
        setData(res.data)

      })
  }

  const getDetail = (id) => {
  
    axios.get(`https://mysql-deploy-8293b2207e7e.herokuapp.com/education/educationOne/${id}`)
      .then(res => {

        setDetail( res.data) 


      })

      handleShow()
    
  }


  useEffect(() => {

    getData()

  }, [])

  return (
    <>
      <Container>

        <Row >
          <center>
            <Col sm={9} className="text-center" style={{ marginTop: '30px' }}>
              <div className="text-center mt-4 mb-4">
                <h5>สรุปความสอดคล้อง</h5>
              </div>


              <Table striped bordered hover variant="white">
                <thead>
                  <tr>

                    <th>กลุ่มของข้อมูล</th>
                    <th> เรื่อง</th>
                    <th>วันที่บันทึก</th>
                    <th>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((data) => {

                      return (
                        <tr>

                          <td>{data.groupName}</td>
                          <td>{data.name}</td>
                          <td>{ moment(  data.dateCreated).format("YYYY-MM-DD")}</td>
                          <td> 
                             <Button onClick={()=>getDetail(data.educationId)} >อ่านเพิ่มเติม</Button>  
                           
                           </td>


                        </tr>

                      )
                    })
                  }

                </tbody>
              </Table>
            </Col>
          </center>
        </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดความสอดคล้อง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    {

                      detail.map((item)=>{
                          return (
                            
                            <>
                            <p>{item.answer}</p>
                            </>
                          )
                      })
                    }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>

    </>
  )
}

export default ReportAll;