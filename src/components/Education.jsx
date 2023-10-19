import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Select from 'react-select';
import Swal from 'sweetalert2'

const Education = () => {
    const [show, setShow] = useState(false);
    const [showGroup, setShowGroup] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [title, setTitle] = useState("");


    const [getOne, setGetone] = useState([]);
    //topics
    const [option, setOption] = useState([]);
    const [topics, setTopics] = useState([]);

    //education
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState([]);

    const [selectedValue, setSelectedValue] = useState("");

    const [educationId, setEducationId] = useState("");
    const [educationTopic, setEducationTopic] = useState("");
    const [name, setName] = useState("");
    const [nameGroup, setNameGroup] = useState("");

    const [itemId, setItemID] = useState("");
    const [forUpdateGroup, setforUpdateGroup] = useState("");
    const [GroupId, setGroupId] = useState("");
    const [selectTable, setSelectTable] = useState("");

    const handleClose = () => {
          setShow(false);
          setItemID("");
          setName("");
    }

    const handleCloseGroup = () => {
          setShowGroup(false);
    }

    const handleCloseDetail = () => {
          setShowDetail(false);
    }

    const handleShow = (id, name) => {
          setItemID(id);
          setName(name);
          setShow(true);
    };


    //หัวข้อใหญ่
    const getTopic = async () => {
        let topics = [];
        await axios.get("http://localhost:3000/topics").then((res) => {
            topics = res.data.map((data) => {
                return ({ label: data.topic, value: data.id })
            })

            setTopics(res.data);
            setOption(topics);
        })

    }



    const getOneEducation = async (id) => {
        await axios.get(`http://localhost:3000/topics/getOne/${id}`).then(res => {
            setGetone(res.data);
        })
    }


    const getAllEducation = async () => {
        await axios.get(`http://localhost:3000/topics/getAll`).then(res => {
            setGetone(res.data);
        })
    }

    const onSelectTopic = (event) => {
        setSelectedValue(event);
        getOneEducation(event.value);
        setforUpdateGroup(event.label);
        setGroupId(event.value);
    }


    const onSelectEducationTopic = (event) => {
        setEducationTopic(event);
        setEducationId(event.value)
    }


    const updateItem = async () => {
        const body = { topic: name }
        await axios.put(`http://localhost:3000/topics/updateItem/${itemId}`, body)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'แก้ไขข้อมูลสำเร็จ',
                        showConfirmButton: true,
                        timer: 1500
                    })

                }
            })
    }

    const updateGroupId = async () => {
        const body = { topic: forUpdateGroup }
        await axios.put(`http://localhost:3000/topics/updateGroup/${GroupId}`, body)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'แก้ไขข้อมูลสำเร็จ',
                        showConfirmButton: true,
                        timer: 1500
                    })
                    getTopic();
                }
            })
    }

    const addGroup = async () => {
        const body = { topic: nameGroup }
        await axios.post(`http://localhost:3000/topics/addGroup`, body)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                        showConfirmButton: true,
                        timer: 1500
                    })

                }
            })

        await getTopic();
        handleCloseGroup()
    }


    const DeleteItemId = async (id) => {

        Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/topics/deleteItem/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'ลบข้อมูลสำเร็จ',
                                showConfirmButton: true,
                                timer: 1500
                            })

                        }
                    })
                getAllEducation();
            }
        })

        setShow(false);

    }

    const DeleteGroup = async (Id) => {

        Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/topics/deleteGroup/${Id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'ลบข้อมูลสำเร็จ',
                                showConfirmButton: true,
                                timer: 1500
                            })

                        }
                    })

            }
        })

        await getAllEducation();
        setShow(false);

    }


    const handelSubmitGroup = async () => {
        addGroup();
    }

    const handelSubmit = async () => {

        if (itemId) {
            updateItem()
        } else {
            let body = { topic: name, topicId: educationId }
            await axios.post("http://localhost:3000/topics/addItem", body)
                .then(res => {
                    if (res.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'บันทึกข้อมูลสำเร็จ',
                            showConfirmButton: true,
                            timer: 1500
                        })

                    }
                })

        }

        await getAllEducation();
        setShow(false);
    }


    const onSelectTable = (val) => {
        setSelectTable(val)
        if (val === "ข้อมูลที่บันทึกความสอดคล้อง") {
            getEducations();
        }
    }


    const getEducations = async () => {
        await axios .get("http://localhost:3000/education")
            .then((res) => {
                setData(res.data);
            });
    };


    const getDetail = (id,title) => {
        setTitle(title);
        axios.get(`http://localhost:3000/education/educationOne/${id}`
            )
            .then((res) => {
                setDetail(res.data)
            });

            setShowDetail(true);
    };



    useEffect(() => {
        getTopic();
        getAllEducation();
        getEducations();
        onSelectTable("ข้อมูลความสอดคล้อง");
    }, [])

    useEffect(() => {

    }, [getOne])
    useEffect(() => {

    }, [option])

    return (
        <>
            <Container fluid>
                <Row className="mb-4">

                    <Col sm={12}>
                        <Row className="mt-4">

                            <Col sm={4}>

                            </Col>



                        </Row>
                        <Row className="mb-4">


                            <Col sm={12}>
                                <Form.Group>

                                    <Button variant="light" onClick={() => onSelectTable("ข้อมูลที่บันทึกความสอดคล้อง")} className="mt-4">ข้อมูลที่บันทึกความสอดคล้อง</Button> {' '}
                                    <Button variant="light" onClick={() => onSelectTable("ข้อมูลความสอดคล้อง")} className="mt-4">หัวข้อความสอดคล้อง</Button> {' '}
                                    <Button variant="light" onClick={() => onSelectTable("ข้อมูลกลุ่มความสอดคล้อง")} className="mt-4">ข้อมูลกลุ่มความสอดคล้อง</Button> {' '}


                                </Form.Group>
                            </Col>
                        </Row>


                        <TableContainer component={Paper} className="mt-2">
                            <div className="title text-center mt-4">
                                <h5>{selectTable}</h5>
                            </div>

                            {
                                selectTable === "ข้อมูลที่บันทึกความสอดคล้อง" && (<>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับ</TableCell>
                                                <TableCell >ชื่อเรื่อง</TableCell>
                                                <TableCell >กลุ่ม</TableCell>
                                                <TableCell >รายละเอียด</TableCell>
                                                <TableCell >จัดการ</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {data.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.educationId}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.groupName}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row">
                                                        <Button onClick={()=>getDetail(row.educationId,row.name)} >รายละเอียด</Button>
                                                    </TableCell>

                                                    <TableCell component="th" scope="row">
                                                        <Button variant="warning" style={{ color: '#fff' }} onClick={() => handleShow(row.id, row.topic)}>แก้ไข</Button> {' '}
                                                        <Button variant="danger" onClick={() => DeleteItemId(row.id)}>ลบ</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>


                                </>)
                            }
                            {
                                selectTable === "ข้อมูลความสอดคล้อง" && (<>

                                    <Row>
                                        <Col sm={4}>
                                            <Form.Group>
                                                <Form.Label>เลือกกลุ่มสำหรับแสดงข้อมูล </Form.Label>
                                                <Select
                                                    onChange={onSelectTopic}
                                                    options={option}
                                                    value={selectedValue}

                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col>

                                            <Button variant="success" onClick={() => setShow(true)} className="mt-4">
                                                <i className="fa-solid fa-plus"></i>เพิ่มข้อมูลความสอดคล้อง</Button> {' '}
                                        </Col>
                                    </Row>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับ</TableCell>
                                                <TableCell >ชื่อเรื่อง</TableCell>
                                                <TableCell >จัดการ</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {getOne.map((row) => (
                                                <TableRow
                                                    key={row.id}

                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row">
                                                        {row.topic}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <Button variant="warning" style={{ color: '#fff' }} onClick={() => handleShow(row.id, row.topic)}>แก้ไข</Button> {' '}
                                                        <Button variant="danger" onClick={() => DeleteItemId(row.id)}>ลบ</Button>
                                                    </TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>


                                </>)
                            }

                            {
                                selectTable === "ข้อมูลกลุ่มความสอดคล้อง" && (<>

                                    <Row>
                                        <Col sm={4}>
                                            <Button onClick={() => setShowGroup(true)}>เพิ่มกลุ่มข้อมูลความสอดคล้อง</Button>
                                        </Col>
                                    </Row>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ลำดับ</TableCell>
                                                <TableCell >ชื่อกลุ่ม</TableCell>
                                                <TableCell >จัดการ</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {topics.map((row) => (
                                                <TableRow
                                                    key={row.id}

                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row">
                                                        {row.topic}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <Button variant="warning" style={{ color: '#fff' }} onClick={() => handleShow(row.id, row.topic)}>แก้ไข</Button> {' '}
                                                        <Button variant="danger" onClick={() => DeleteGroup(row.id)}>ลบ</Button>
                                                    </TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </>)
                            }

                        </TableContainer>
                    </Col>

                </Row>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {itemId ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูลความสอดคล้อง'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >

                            {
                                itemId === "" && (


                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>เลือกกลุ่มของข้อมูล</Form.Label>
                                        <Select
                                            onChange={onSelectEducationTopic}
                                            options={option}
                                            value={educationTopic}


                                        />



                                    </Form.Group>
                                )
                            }
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ชื่อเรื่อง</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="ตัวอย่าง ทักษะศตวรรษที่ 21"
                                    value={name} required />
                            </Form.Group>



                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            form="save"
                            onClick={() => handelSubmit()}
                        >

                            {itemId ? "แก้ไข" : "บันทึกข้อมูล"}
                        </Button>
                        <Button
                            onClick={() => handleClose()}
                            variant="primary">ยกเลิก</Button>
                    </Modal.Footer>
                </Modal>

                <Modal

                    show={showGroup}
                    onHide={handleCloseGroup}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> เพิ่มกลุ่มข้อมูล </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>กลุ่มของข้อมูล</Form.Label>
                                <Form.Control
                                    onChange={(e) => setNameGroup(e.target.value)}
                                    type="text"
                                    placeholder="ตัวอย่าง ความสอดคล้องกับนโยบาย"
                                    value={nameGroup}
                                    required />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            form="save"
                            onClick={() => handelSubmitGroup()}
                        >

                            บันทึกข้อมูล
                        </Button>
                        <Button
                            onClick={() => handleCloseGroup()}
                            variant="primary">ยกเลิก</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showDetail}
                    onHide={handleCloseDetail}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {
                                detail.map((ans) => {
                                    return (<>
                                        <Col sm={12} className="text-left mb-4">
                                            <Form>


                                           
                                            <Form.Group>
                                                <Form.Control type="text"  defaultValue={ans.answer} />
                                            </Form.Group>
                                            </Form>
                                        </Col>
                                    </>)
                                })
                            }
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"
                            form="save"
                          
                        >

                            แก้ไขข้อมูล
                        </Button>
                        <Button
                            onClick={() => handleCloseDetail()}
                            variant="danger">ปิด</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )

}

export default Education;