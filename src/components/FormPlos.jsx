import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Select from "react-select";
import DeleteIcon from '@mui/icons-material/Delete';
const FormPlos = (props) => {
    const { topicsData, ylos, plos, yloValue, ploValue } = props;

    return (
        <>
            <Form >
                <ButtonGroup aria-label="Basic example">
                    <Button
                        onClick={() => props.addPOLdata("PLOs")}
                        variant="primary"
                    >
                        PLOs
                    </Button>
                    <Button
                        onClick={() => props.addPOLdata("CLOs")}
                        variant="primary"
                    >
                        CLOs
                    </Button>
                    <Button
                        onClick={() => props.addPOLdata("YLOs")}
                        variant="primary"
                    >
                        YLOs
                    </Button>
                </ButtonGroup>

                {topicsData.map((data, indexp) => {
                    return (
                        <Row className="mb-3 mt-3" key={indexp}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={12}>
                                                {data.title === "PLOs" && (
                                                    <Card.Title>
                                                        {" "}
                                                        เขียนผลลัพธ์การศึกษาของหลักสูตร
                                                        {data.title}
                                                    </Card.Title>
                                                )}

                                                {data.title === "CLOs" && (
                                                    <Card.Title>
                                                        {" "}
                                                        เขียนผลลัพธ์การศึกษาของรายวิชา{" "}
                                                        {data.title}
                                                    </Card.Title>
                                                )}

                                                {data.title === "YLOs" && (
                                                    <Card.Title>
                                                        {" "}
                                                        เขียนผลลัพธ์การศึกษาระดับชั้นปี{" "}
                                                        {data.title}
                                                    </Card.Title>
                                                )}

                                                {data.title === "CLOs" && (
                                                    <Form.Group className="mt-4">
                                                        <Form.Label>
                                                            เลือก YLOs {yloValue}
                                                        </Form.Label>
                                                        <Select
                                                            options={ylos}
                                                            onChange={(e) => props.setYloValue(e.value)}
                                                        />
                                                    </Form.Group>
                                                )}
                                                {data.title === "YLOs" && (
                                                    <Form.Group className="mt-4">
                                                        <Form.Label>
                                                            เลือก PLOs {ploValue}
                                                        </Form.Label>
                                                        <Select
                                                            options={plos}
                                                            onChange={(e) => props.setPloValue(e.value)}
                                                        />
                                                    </Form.Group>
                                                )}

                                                <Button
                                                    variant="light mt-4"
                                                    onClick={() => props.addAwnser(indexp)}
                                                >
                                                    {" "}
                                                    + เพิ่มช่องคำตอบ
                                                </Button>
                                            </Col>
                                        </Row>

                                        <div className="anwser mt-4">
                                            <Row>
                                                {data.anwsers.map((item, index) => {
                                                    return (
                                                        <>
                                                            <Col sm={5}>
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        {" "}
                                                                        ข้อที่ {index + 1}
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder={`ข้อมูล ${data.title}`}
                                                                        className="mt-2 w-100"
                                                                        defaultValue={item.list}
                                                                        onChange={(e) =>
                                                                            props.updateAwnser(
                                                                                indexp,
                                                                                index,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />

                                                                </Form.Group>

                                                            </Col>
                                                            <Col sm={1}>
                                                                <div
                                                                    style={{marginTop:'46px'}}
                                                                    onClick={() =>
                                                                        props.deleteAnswerFil(indexp, item.Id)
                                                                    }
                                                                >
                                                                    <DeleteIcon />
                                                                </div>
                                                            </Col>
                                                        </>
                                                    );
                                                })}
                                            </Row>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    );
                })}

                <Row className="mt-4 ">
                    <Col sm={4}>
                        <Button
                            variant="success w-50"
                            onClick={() => props.postDataPlo()}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Col>
                    <Col sm={4}>
                        <Button variant="danger w-50">ยกเลิก</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )

}

export default FormPlos;