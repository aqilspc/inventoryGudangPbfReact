import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
export default function Warehouse() {
  const [gudang, setGudang] = useState([]);
  const [detail, setDetail] = useState({});
  const [name, setName] = useState("");
  const [max_capacity, setMaxCapacity] = useState("");
  const [min_capacity, setMinCapacity] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const [showcreate, setShowCreate] = useState(false);
  const ambilDataGudang = () => {
    setGudang([])
    // const token = JSON.parse(localStorage.getItem("token"))
    fetch("http://127.0.0.1:8000/api/gudang_all")
      .then((res) => res.json())
      .then((json) => {
        setGudang(json.data)
       // console.log(gudang)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
      ambilDataGudang();
    }, []
  )

   const ambilDataDetail = (data) => () => {
    setName(data.name);
    setMaxCapacity(data.max_capacity);
    setMinCapacity(data.min_capacity);
    setDetail(data);
    setShow(true);
  }

  const deleteGudang = (id) => () => {
    fetch("http://127.0.0.1:8000/api/gudang_delete"+"/"+id,{
       method: 'delete',
       headers: {'Content-Type':'application/json'},
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.status === "success"){
            alert('berhasil delete gudang');
            window.location.reload(); 
        }else{
            alert('gagal delete gudang');
            window.location.reload(); 
        }
      })
      .catch((err) => {
        console.log(err);
      });  
  }

  const updateGudang =() => {
         fetch('http://127.0.0.1:8000/api/gudang_update', {
           method: 'put',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ 
                id: detail.id,
                name: name,
                max_capacity: max_capacity,
                min_capacity: min_capacity
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil update gudang');
                  window.location.reload(); 
                }else{
                    alert('gagal update gudang');
                   window.location.reload(); 
                }
            });
      }

    const storeGudang =() => {
         fetch('http://127.0.0.1:8000/api/gudang_insert', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ 
                name: name,
                max_capacity: max_capacity,
                min_capacity: min_capacity
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil insert gudang');
                  window.location.reload(); 
                }else{
                    alert('gagal insert gudang');
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
        <Button variant="secondary" size="lg" onClick={handleShowCreate} >CREATE
        </Button>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>MAX Capacity</th>
              <th>MIN Capacity</th>
            </tr>
          </thead>
          <tbody>
            {gudang.map((item, index) => {
              return <tr key={index}>
                <td>{index+1}</td>

                <td>{item.name}</td>
                <td>{item.max_capacity}</td>
                <td>{item.min_capacity}</td>
                <td>
                  <Button variant="primary" onClick={ambilDataDetail(item)}>EDIT</Button>
                  &nbsp;&nbsp;
                  <Button variant="danger" onClick={deleteGudang(item.id)}>DELETE</Button>
                </td>
              </tr>
            })}

          </tbody>
        </Table>
      </Container>
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT GUDANG</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MAX</Form.Label>
                <Form.Control type="number" value={max_capacity} onChange={(e) => setMaxCapacity(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MIN</Form.Label>
                <Form.Control type="number" value={min_capacity} onChange={(e) => setMinCapacity(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateGudang}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Container>
        <Modal show={showcreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>ADD GUDANG</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MAX</Form.Label>
                <Form.Control type="number"  onChange={(e) => setMaxCapacity(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>MIN</Form.Label>
                <Form.Control type="number" onChange={(e) => setMinCapacity(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" onClick={storeGudang}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}
