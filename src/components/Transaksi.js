import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const [show, setShow] = useState(false);
    const [showcreate, setShowCreate] = useState(false);

    const [material_id, setMaterialId] = useState("");
    const [user_id, setUserId] = useState("");
    const [warehouse_id, setWarehouseId] = useState("");
    const [qty, setQty] = useState("");
    const [type, setType] = useState("");

    const [material_id_option, setMaterialIdOption] = useState([]);
    const [user_id_option, setUerIdOption] = useState([]);
    const [warehouse_id_option, setWarehouseIdOption] = useState([]);

    const handleClose = () => setShow(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => {
        setShowCreate(true);
        setMaterialIdOption([])
        fetch("http://127.0.0.1:8000/api/material_option")
            .then((res) => res.json())
            .then((json) => {
                setMaterialIdOption(json.data)
            })
            .catch((err) => {
                console.log(err);
        });
        setUerIdOption([])
        fetch("http://127.0.0.1:8000/api/user_option")
            .then((res) => res.json())
            .then((json) => {
                setUerIdOption(json.data)
            })
            .catch((err) => {
                console.log(err);
        });
       setWarehouseIdOption([])
        fetch("http://127.0.0.1:8000/api/gudang_option")
            .then((res) => res.json())
            .then((json) => {
                setWarehouseIdOption(json.data)
            })
            .catch((err) => {
                console.log(err);
        });
    }
    const handleShow = () => setShow(true);
    const ambilDataTransaksi = () => {
        setTransaksi([])
        fetch("http://127.0.0.1:8000/api/transaction_all")
            .then((res) => res.json())
            .then((json) => {
                setTransaksi(json.data)
            })
            .catch((err) => {
                console.log(err);
        });
    }
    useEffect(() => {
        ambilDataTransaksi();
    }, []
    )

    const keluar =() => {
        localStorage.removeItem('token');
        window.location.reload(); 
    }

    const storeTransaksi =() => {
         //console.log(material_id);
         fetch('http://127.0.0.1:8000/api/transaction_insert', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ 
                material_id: material_id,
                user_id: user_id,
                warehouse_id: warehouse_id,
                qty: qty,
                type:type
            })
            }).then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                   alert('berhasil insert transaksi');
                  window.location.reload(); 
                }else{
                    alert(json.message);
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
                            <Nav.Link href="#link"><a onClick={keluar}>Log Out</a></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Button variant="secondary" size="lg" onClick = {handleShowCreate}>
                    CREATE
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name Material</th>
                            <th>Name Warehouse</th>
                            <th>Quantity</th>
                            <th>Penanggung Jawab</th>
                            <th>Type</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.map((item, index) => {
                            return <tr key={index}>
                                <td>{index+1}</td>

                                <td>{item.material_name}</td>
                                <td>{item.warehouse_name}</td>
                                <td>{item.qty}</td>
                                <td>{item.user_name}</td>
                                <td>{item.type}</td>
                                <td>{item.date_transaction}</td>
                                
                            </tr>
                        })}

                    </tbody>
                </Table>
            </Container>

             <Container>
        <Modal show={showcreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>ADD TRANSAKSI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Pilih Gudang</Form.Label>
                 <select class="form-control" onChange={(e) => setWarehouseId(e.target.value)} >
                 <option value="0">Pilih</option>
                     {warehouse_id_option.map((item, i) => {
                        return <option key={i} value={item.value}>{item.text}</option>
                      })}
                 </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Pilih Barang</Form.Label>
                <select class="form-control" onChange={(e) => setMaterialId(e.target.value)} >
                    <option value="0">Pilih</option>
                     {material_id_option.map((item, i) => {
                        return <option key={i} value={item.value}>{item.text}</option>
                      })}
                 </select>
              </Form.Group>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Pilih Penanggung Jawab</Form.Label>
                <select class="form-control" onChange={(e) => setUserId(e.target.value)} >
                <option value="0">Pilih</option>
                     {user_id_option.map((item, i) => {
                        return <option key={i} value={item.value}>{item.text}</option>
                      })}
                 </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Pilih Type</Form.Label>
                <select class="form-control" onChange={(e) => setType(e.target.value)}>
                    <option value="0">Pilih</option>
                    <option value="material_in">Material In</option>
                    <option value="material_out">Material Out</option>
                </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Qty</Form.Label>
                <Form.Control type="number" onChange={(e) => setQty(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
            <Button variant="primary" onClick={storeTransaksi}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
        </div>
    )
}
