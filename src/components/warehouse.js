import React from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from "react-router-dom"

export default function Warehouse() {
  return (
    <div>
        <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link}to="/">Home</Nav.Link>
                            <Nav.Link as={Link}to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link}to="/material">Material</Nav.Link>
                            <Nav.Link as={Link}to="/transaksi">Transaksi</Nav.Link>
                            <Nav.Link as={Link}to="/warehouse">Warehouse</Nav.Link>
                            <Nav.Link href="#link">Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </div>
  )
}
