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
  const [showcreate, setShowCreate] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShow = () => setShow(true);
  const handleShowCreate = () => setShowCreate(true);
  const ambilDataMaterial = () => {
    setMaterial([])
    fetch("http://127.0.0.1:8000/api/material_all")
      .then((res) => res.json())
      .then((json) => {
        setMaterial(json.data)
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
    setName(data.name);
    setJenisMaterial(data.jenis_material);
    setJumlahMaterial(data.stock);
    setDetail(data);
    setShow(true);
  }

  const deleteMaterial = (id) => () => {
    fetch("http://127.0.0.1:8000/api/material_delete"+"/"+id,{
       method: 'delete',
       headers: {'Content-Type':'application/json'},
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.status === "success"){
            alert('berhasil delete material');
            window.location.reload(); 
        }else{
            alert('gagal delete material');
            window.location.reload(); 
        }
      })
      .catch((err) => {
        console.log(err);
      });  
  }

  const updateMaterial =() => {
         fetch('http://127.0.0.1:8000/api/material_update', {
           method: 'put',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ 
                id: detail.id,
                name: name,
                jenis_material: jenismaterial
               // stock: jumlahmaterial
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil update material');
                  window.location.reload(); 
                }else{
                    alert('gagal update material');
                   window.location.reload(); 
                }
            });
      }

    const storeMaterial =() => {
         fetch('http://127.0.0.1:8000/api/material_insert', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ 
                name: name,
                jenis_material: jenismaterial,
                stock: jumlahmaterial
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil insert material');
                  window.location.reload(); 
                }else{
                    alert('gagal insert material');
                   window.location.reload(); 
                }
            });
      }
      const keluar =() => {
        localStorage.removeItem('token');
        window.location.reload(); 
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
              <Nav.Link href="#link"><a onClick={keluar}>Log Out</a></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
      <Button variant="secondary" size="lg" onClick = {handleShowCreate} >CREATE
      </Button>
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
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.jenis_material}</td>
                <td>{item.stock}</td>
                <td>
                  <Button variant="primary" onClick={ambilDataDetail(item)}>EDIT</Button>
                  &nbsp;&nbsp;
                  <Button variant="danger" onClick={deleteMaterial(item.id)}>DELETE</Button>
                </td>
              </tr>
            })}

          </tbody>
        </Table>
      </Container>

      <Container>
        <Modal show={showcreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>ADD MATERIAL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Jenis Material</Form.Label>
                <Form.Control type="text" onChange={(e) => setJenisMaterial(e.target.value)}/>
              </Form.Group>
             
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" onClick={storeMaterial}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
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
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Jenis Material</Form.Label>
                <Form.Control type="text" value={jenismaterial} onChange={(e) => setJenisMaterial(e.target.value)}/>
              </Form.Group>
         
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateMaterial}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

    </div>
  )
}
