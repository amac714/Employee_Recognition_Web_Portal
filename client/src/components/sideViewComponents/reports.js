import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false
    };
  }

  toggle = (e) => {
    this.setState({
      [e.target.name]: this.state.modal1 ? !this.state.modal1 : !this.state.modal2
    });
  }

  render() {
    return (
      <div>
        <Row>
          <h3>View Reports</h3>
          <Col>
            <Button name="modal1" color="danger" onClick={this.toggle}>Report 1</Button>
            <Modal isOpen={this.state.modal1} toggle={this.toggle} className={this.props.className}>
              <ModalHeader name="modal1">Modal title</ModalHeader>
              <ModalBody>
                Report 1 goes here
              </ModalBody>
              <ModalFooter>
                <Button name="modal1" color="secondary" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
            <Button name="modal2" color="danger" onClick={this.toggle}>Report 2</Button>
            <Modal isOpen={this.state.modal2} toggle={this.toggle} className={this.props.className}>
              <ModalHeader name="modal2">Modal title</ModalHeader>
              <ModalBody>
                Report 2 goes here
              </ModalBody>
              <ModalFooter>
                <Button name="modal2" color="secondary" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Reports;