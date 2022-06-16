import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
export default function Profile() {

    const [user, setUser]= useState([]);
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUserName] = useState('');
   // const [username, setUserName] = useState('');
    const token = JSON.parse(localStorage.getItem("token"))
    const ambilDataUser = ()=> {
         setUser([])
        fetch("http://127.0.0.1:8000/api/user_by_id/" + token,
        ).then((res) => res.json())
            .then((json) => {
                console.log(json)
                setUser(json.data)
                setPwd(json.data.password)
                setName(json.data.name)
                setUserName(json.data.username)
                //console.log(pwd);
            })
        .catch((err) => {
          console.log(err);
        });
    }
        useEffect(() => {
            ambilDataUser();
        }, []
    )

     const updateProfile =() => {
         fetch('http://127.0.0.1:8000/api/user_update', {
           method: 'put',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ id: token,
                name: name,
                username: username,
                password: pwd
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil update profile');
                   window.location.reload(); 
                }else{
                    alert('gagal update profile');
                   window.location.reload(); 
                }
            });
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
            <Container className="my-5">
                 <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nama</Form.Label>
                <input class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <input class="form-control" type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
               <input class="form-control" type="password" placeholder="isi password jika ingin diubah!" onChange={(e) => setPwd(e.target.value)}/>
              </Form.Group>
               <Button variant="primary" onClick={updateProfile}>Update</Button>
            </Form>
            </Container>
        </div>
    )
}
