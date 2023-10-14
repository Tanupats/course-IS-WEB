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


    const [getOne, setGetone] = useState([]);
    const [option, setOption] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const [educationId, setEducationId] = useState("");
    const [educationTopic, setEducationTopic] = useState("");
    const [name, setName] = useState("");
    const [nameGroup, setNameGroup] = useState("");

    const [itemId, setItemID] = useState("");
    const [forUpdateGroup, setforUpdateGroup] = useState("");
    const [GroupId, setGroupId] = useState("");



    const handleClose = () => {

        setShow(false);
        setItemID("");
        setName("");
    }

    const handleCloseGroup = () => {
        setShowGroup(false);
    }

    const handleShow = (id, name) => {
        setItemID(id);
        setName(name);
        setShow(true);
    };


    const getEducation = async () => {
        let topics = [];
        await axios.get("http://localhost:3000/topics").then((res) => {

            topics = res.data.map((data) => {

                return ({ label: data.topic, value: data.id })
            })
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
                    getEducation();
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

        await getEducation();
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

    const DeleteGroup = async () => {

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
                axios.delete(`http://localhost:3000/topics/deleteGroup/${GroupId}`)
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
        
        await  getAllEducation();
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

    useEffect(() => {
        getEducation();
        getAllEducation();
    }, [])

    useEffect(() => {

    }, [getOne])
    useEffect(() => {

    }, [option])

    return (
        <>
            <Container fluid>
                <Row className="mb-4">
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <Row className="mt-4">

                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>เลือกหัวข้อสำหรับแสดงข้อมูล </Form.Label>
                                    <Select
                                        onChange={onSelectTopic}
                                        options={option}
                                        value={selectedValue}

                                    />

                                </Form.Group>
                            </Col>
                            
                            {
                                forUpdateGroup !== "" && (
                                    <>
                                    <Col sm={6}>
                                <Form.Group >
                                    <Form.Label>หัวข้อที่เลือก {GroupId}</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setforUpdateGroup(e.target.value)}
                                        type='text'
                                        value={forUpdateGroup} />

                                </Form.Group>
                            </Col>
                                    <Col sm={2}>
                                        <Button onClick={() => updateGroupId()} style={{ marginTop: '32px' }} variant="warning">แก้ไข</Button> {'  '}
                                        <Button onClick={() => DeleteGroup()} style={{ marginTop: '32px' }} variant="danger">ลบ</Button>

                                    </Col>


                                    </> )
                            }


                        </Row>
                        <Row className="mb-4">


                            <Col sm={6}>
                                <Form.Group>

                                    <Button variant="primary" onClick={getAllEducation} className="mt-4">แสดงทั้งหมด</Button> {' '}
                                    <Button variant="success" onClick={() => setShow(true)} className="mt-4"><i className="fa-solid fa-plus"></i>เพิ่มข้อมูล</Button> {' '}
                                    <Button variant="success" onClick={() => setShowGroup(true)} className="mt-4"><i className="fa-solid fa-plus"></i>เพิ่มกลุ่มข้อมูล</Button>
                                </Form.Group>
                            </Col>
                        </Row>

                        <TableContainer component={Paper} className="mt-2">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#ID</TableCell>
                                        <TableCell >Topic</TableCell>
                                        <TableCell >Action</TableCell>

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
                        </TableContainer>
                    </Col>
                    <Col sm={2}></Col>
                </Row>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title> {itemId ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ชื่อเรื่อง</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="ตัวอย่าง ทักษะศตวรรษที่ 21"
                                    value={name} required />
                            </Form.Group>
                            {
                                itemId === "" && (


                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>เลือกกลุ่มของข้อมูล {educationId}</Form.Label>
                                        <Select
                                            onChange={onSelectEducationTopic}
                                            options={option}
                                            value={educationTopic}

                                        />



                                    </Form.Group>
                                )
                            }




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
            </Container>
        </>
    )

}

export default Education;