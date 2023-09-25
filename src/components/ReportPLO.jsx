import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row, Container } from 'react-bootstrap';
import axios from "axios";
import moment from "moment/moment";
const ReportPLO = () => {
  const [data, setData] = useState([])
  const getData = async () => {

    await axios.get("http://localhost:3000/education/getPlos")
      .then(res => {
        setData(res.data)
     
      })
    
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