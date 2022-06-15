import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"

export default function Material() {
  const [material, setMaterial] = useState([]);

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
              <Nav.Link as={Link} to="material">Material</Nav.Link>
              <Nav.Link as={Link} to="/transaksi">Transaksi</Nav.Link>
              <Nav.Link as={Link} to="warehouse">Warehouse</Nav.Link>
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
                <td></td>
              </tr>
            })}

          </tbody>
        </Table>
      </Container>
    </div>
  )
}
