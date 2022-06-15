import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ambilDataTransaksi = () => {
        setTransaksi([])
        // const token = JSON.parse(localStorage.getItem("token"))
        fetch("http://127.0.0.1:8000/api/transaction_all"


        )
            .then((res) => res.json())
            .then((json) => {

                //   dispatch(showAll());
                // json.data.forEach((item) => {
                setTransaksi(json.data)
                // })
                console.log(transaksi)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        ambilDataTransaksi();
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
                            <th>Name Material</th>
                            <th>Name Warehouse</th>
                            <th>Username</th>
                            <th>Date</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.map((item, index) => {
                            return <tr key={index}>
                                <td>{index}</td>

                                <td>{item.material_name}</td>
                                <td>{item.warehouse_name}</td>
                                <td>{item.user_name}</td>
                                <td>{item.date_transaction}</td>
                                <td>
                                    <Button variant="primary" onClick={handleShow}>EDIT</Button>
                                    <Button variant="danger">DELETE</Button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
