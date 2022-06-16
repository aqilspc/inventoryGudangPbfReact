import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import Gudang from "../assets/img/gudang.jpg"
import { Link } from "react-router-dom"

import '../App.css'
const keluar =() => {
    localStorage.removeItem('token');
     window.location.reload(); 
}
const Home = () => {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">INVENTORY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link}to="/">Home</Nav.Link>
                            <Nav.Link as={Link}to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link}to="/material">Material</Nav.Link>
                            <Nav.Link as={Link}to="/transaksi">Transaksi</Nav.Link>
                            <Nav.Link as={Link}to="/warehouse">Warehouse</Nav.Link>
                            <Nav.Link href="#"><a onClick={keluar}>Log Out</a></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
            <Row className="my-5 align-items-center">
                <Col md={6} className="text-center">
                    <h1> WELCOME TO INVENTORY </h1>
                    <h6>Perkenalkan kami dari kelompok inventory</h6>
                </Col>
                <Col md={6}>
                    <Image
                        src={Gudang}
                        className="w-100"
                    />
                </Col>
            </Row>
            </Container>

        </div>
    );
};

export default Home;