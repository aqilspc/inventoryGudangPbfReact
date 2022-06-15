import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Material() {
  const [material, setMaterial] = useState([]);
  const [detail, setDetail] = useState({});
  const [name, setName] = useState("");
  const [jenismaterial, setJenisMaterial] = useState("");
  const [jumlahmaterial, setJumlahMaterial] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ambilDataMaterial = () => {
    setMaterial([])
    // const token = JSON.parse(localStorage.getItem("token"))
    fetch("http://127.0.0.1:8000/api/material_all"


    )
      .then((res) => res.json())
      .then((json) => {

        //   dispatch(showAll());
        // json.data.forEach((item) => {
        setMaterial(json.data)
        // })
        console.log(material)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    ambilDataMaterial();
  }, []
  )
  const ambilDataDetail = (data) => () => {  
    setShow(true);
    setDetail (data)
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">INVENTORY</Navbar.Brand>
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
              <th>Jenis Material</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {material.map((item, index) => {
              return <tr key={index}>
                <td>{index}</td>

                <td>{item.name}</td>
                <td>{item.jenis_material}</td>
                <td>{item.stock}</td>
                <td>
                  <Button variant="primary" onClick={ambilDataDetail(item)}>EDIT</Button>
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
                <Form.Label>Jenis Material</Form.Label>
                <Form.Control type="nummber" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Jumlah Material</Form.Label>
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
