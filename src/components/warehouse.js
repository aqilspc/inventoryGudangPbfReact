import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
export default function Warehouse() {
  const [gudang, setGudang] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ambilDataGudang = () => {
    setGudang([])
    // const token = JSON.parse(localStorage.getItem("token"))
    fetch("http://127.0.0.1:8000/api/gudang_all"


    )
      .then((res) => res.json())
      .then((json) => {

        //   dispatch(showAll());
        // json.data.forEach((item) => {
        setGudang(json.data)
        // })
        console.log(gudang)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    ambilDataGudang();
  }, []
  )
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/material">Material</Nav.Link>
              <Nav.Link as={Link} to="/transaksi">Transaksi</Nav.Link>
              <Nav.Link as={Link} to="/warehouse">Warehouse</Nav.Link>
              <Nav.Link href="#link">Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>MAX</th>
              <th>MIN</th>
            </tr>
          </thead>
          <tbody>
            {gudang.map((item, index) => {
              return <tr key={index}>
                <td>{index}</td>

                <td>{item.name}</td>
                <td>{item.max_capacity}</td>
                <td>{item.min_capacity}</td>
                <td>
                  <Button variant="primary" onClick={handleShow}>EDIT</Button>
                  <Button variant="danger">DELETE</Button>
                </td>
              </tr>
            })}

          </tbody>
        </Table>
      </Container>
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT MATERIAL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MAX</Form.Label>
                <Form.Control type="nummber" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MIN</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}
