import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom"

export default function Profile() {
    const [user, setUser]= useState(null);

    const ambilDataUser = ()=> {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch("http://127.0.0.1:8000/api/user_by_id/" + token,
        

    )
    .then((res) => res.json())
    .then((json) => {
      //   dispatch(showAll());
        console.log(json)
        setUser(json.data)
    })
    .catch((err) => {
      console.log(err);
    });
    }
    useEffect(() => {
        ambilDataUser();
    }
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
            <Container className="my-5">
                <ListGroup>
                    <ListGroup.Item>Nama :{user?.name}</ListGroup.Item>
                    <ListGroup.Item>Username : {user?.username}</ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    )
}
