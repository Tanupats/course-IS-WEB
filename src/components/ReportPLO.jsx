import React,{useEffect,useState} from "react";
import Table from "react-bootstrap/Table";
import {Col,Row,Container} from 'react-bootstrap';
import axios  from "axios";
const ReportPLO = ()=>{
    const [data,setData]  = useState([])
    const getData =  async()=>{

        await axios.get("http://localhost:3000/education/")
        .then(res=>{
                setData(res.data)
                console.log(res.data)
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
                               <h5>สรุปความสอดคล้อง POLs , COLs ,YOLs</h5>
                    </div>
             
                    
                    <Table striped bordered hover variant="white">
      <thead>
        <tr>
        
          <th>หลักสูตร</th>
          <th> ผลลัพธ์การเรียนรู้</th>
          <th>PLOs</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((data)=>{

                return (
                     <tr>
          <td>{data.course}</td>
          <td>{data.name}</td>
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