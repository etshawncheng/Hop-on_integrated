import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React from 'react'
import Form from 'react-bootstrap/Form';
function Vote(props, index) {
    // console.log(props);
    return (
        <Row>
            <Col>
                <span>選項{index + 1}</span>
            </Col>
            <Col>
                <div key={props["user_id"]}><Form.Check type='radio'  label={props["user_id"]} /></div>
            </Col>
            <Col>
                <span>{props["user_id"]} 的行程</span>
            </Col>
            <Col><Button>查看行程:</Button></Col>
        </Row>
    )
}
export default Vote