import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import axios from "axios";
import EdcationDetail from "./EducationDetail";
import '../index.css'
const ReportAll = () => {

  const [data, setData] = useState([]);
  const getData = async () => {
    await axios
      .get(
        "http://localhost:3000/education"
      )
      .then((res) => {
        setData(res.data);
      });
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Row>
         
            <Col sm={12} className="text-center" style={{ marginTop: "30px" }}>
              <div className="text-center mt-4 mb-4">
                <h5>สรุปความสอดคล้องการศึกษา</h5>
              </div>

              <Row>
                {data?.map((data) => {
                  return (
                    <>
                      <Col sm={4} className="mb-4">
                        <Card>

                          <Card.Title className="title-bg text-left">
                            <Row>

                           
                          <Col sm={12}>
                            {data.groupName}
                          
                          </Col>
                     
                             
                          </Row>
                          </Card.Title>
                      
                          <h5> {data.name}</h5>
      

                         <EdcationDetail id={data.educationId}/>
                        
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Col>
          
        </Row>

      </Container>
    </>
  );
};

export default ReportAll;
