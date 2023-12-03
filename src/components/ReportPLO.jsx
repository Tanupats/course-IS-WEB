import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row, Container,Button } from 'react-bootstrap';
import axios from "axios";
import moment from "moment/moment";
import Swal from "sweetalert2";
const ReportPLO = () => {
  const [data, setData] = useState([])
  const getData = async () => {

    await axios.get(`${import.meta.env.VITE_BASE_URL}/education/getPlos`)
      .then(res => {
        setData(res.data)
     
      })
    
  }
  const deleteProgramId = async (id) => {

    await axios.delete(`${import.meta.env.VITE_BASE_URL}/education/deleteProgram/${id}`)
      .then(res => {
          if(res.status===200){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
              showConfirmButton: true,
              timer: 1000,
            });
             
              getData()
          }
     
      })

    await axios.delete(`${import.meta.env.VITE_BASE_URL}/education/programDetail/${id}`)
    
    
  }


  useEffect(() => {

    getData()

  }, [])

  return (
    <>
      <Container>

        <Row >
          <center>
            <Col sm={8} className="text-center" style={{ marginTop: '30px' }}>
              <div className="text-center mt-4 mb-4">
                <h5>สรุปข้อมูล PLos ของหลักสูตรทั้งหมด</h5>
              </div>
              <Table  bordered hover variant="white">
                <thead>
                  <tr>

                    <th>name</th>       
                    <th>ผลลัพธ์</th>
                    <th>วันที่เขียน</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((data) => {

                      return (
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.answer}</td>
                          <td>{ moment(data.Datecreated	).format('YYYY-MM-DD')   }</td>
                          <td><Button variant="danger" onClick={()=>deleteProgramId(data.programlerningId)}> ลบ  </Button></td>

                        </tr>
                      )
                    })
                  }

                </tbody>
              </Table>
            </Col>
          </center>
        </Row>

        

      </Container>

    </>
  )
}

export default ReportPLO;