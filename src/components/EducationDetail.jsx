import React,{useState,useEffect} from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import axios from "axios";
const EdcationDetail = (props)=>{

    const {id} = props;
    const [data,setData] = useState([])
    const getDetail = (id) => {
      
        axios
          .get(
            `https://mysql-deploy-8293b2207e7e.herokuapp.com/education/educationOne/${id}`
          )
          .then((res) => {
                 setData(res.data) 
          });
          
       
        
      };

      useEffect(()=>{
          getDetail(id)      

      },[])
    return (
        <>
        <Row>

     
        {
            data.map((ans)=>{

                return (<>
                <Col sm={12} className="text-left">
               
                        <h5>

                            { ans.answer}
                        </h5>
                            </Col>
                </>)
            })
        }
   </Row>
        </>
    )
}

export default EdcationDetail;