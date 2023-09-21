import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row, Container } from 'react-bootstrap';
import axios from "axios";
const ReportPLO = () => {
  const [data, setData] = useState([])
  const [dataP, setDataP] = useState([])
  const getData = async () => {

    await axios.get("https://mysql-deploy-8293b2207e7e.herokuapp.com/education/CLO_YLO")
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
    await axios.get("https://mysql-deploy-8293b2207e7e.herokuapp.com/education/YLO_PLO")
      .then(res => {
        setDataP(res.data)
        console.log(res.data)
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
                <h5>สรุปข้อมูล CLOs และ YLOs</h5>
              </div>
              <Table striped bordered hover variant="white">
                <thead>
                  <tr>

                    <th>CLO ID</th>
                    <th> YLO ID</th>
                    <th>ผลลัพธ์</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((data) => {

                      return (
                        <tr>
                          <td>{data.coursedetailId}</td>
                          <td>{data.yloId}</td>
                          <td>{data.answer}</td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </Table>
            </Col>
          </center>
        </Row>

        <Row >
          <center>
            <Col sm={8} className="text-center" style={{ marginTop: '30px' }}>
              <div className="text-center mt-4 mb-4">
                <h5>สรุปข้อมูล PLOs และ YLOs</h5>
              </div>
              <Table striped bordered hover variant="white">
                <thead>
                  <tr>

                    <th>YLO ID</th>
                    <th> PLO ID</th>
                    <th>ผลลัพธ์</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataP.map((data) => {

                      return (
                        <tr>
                          <td>{data.learningyearId}</td>
                          <td>{data.ploId}</td>
                          <td>{data.anwser}</td>
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