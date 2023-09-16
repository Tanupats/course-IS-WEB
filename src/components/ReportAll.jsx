import React,{useEffect,useState} from "react";
import Table from "react-bootstrap/Table";
import {Col,Row,Container} from 'react-bootstrap';
import axios  from "axios";

const ReportAll = ()=>{
    const [data,setData]  = useState([])
    const getData =  async()=>{

        await axios.get("http://localhost:3000/education/educations")
        .then(res=>{
                setData(res.data)
              
        })
    }
   

    useEffect(()=>{

        getData()
        
    },[])

    return (
            <>
            <Container>

                <Row >
<center>
                    <Col sm={8} className="text-center" style={{marginTop:'30px'}}>
                    <div className="text-center mt-4 mb-4">
                               <h5>สรุปความสอดคล้อง</h5>
                    </div>
             
                    
                    <Table striped bordered hover variant="white">
      <thead>
        <tr>
        
          <th>กลุ่มของข้อมูล</th>
          <th> เรื่อง</th>
          <th>วันที่บันทึก</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((data)=>{

                return (
                     <tr>
     
          <td>{data.groupName}</td>
          <td>{data.name}</td>
       
          <td>{data.dateCreated}</td>
     
        
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

export default ReportAll;