import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

const Home = () => {

    return (
        <div>
            {/* <Container fluid> */}
            <Row className="overflow-auto menu">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&w=1000&q=80"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.istockphoto.com/photos/headphones-red-and-blue-illumination-cyberpunk-photo-picture-id1301798751?b=1&k=20&m=1301798751&s=170667a&w=0&h=9YgDtUsYrU2XiynZ03HB6NyA43cJ6_tHbTUXkprshIk="
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://c1.wallpaperflare.com/preview/73/599/584/headphones-music-ear-defender-yellow.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Card className="text-center" style={{ backgroundColor: "#2f3338", color: "white" }}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title style={{ color: "white" }}>Special title treatment</Card.Title>
                        <Card.Text style={{ color: "white" }}>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button href="/products" variant="primary">Shop Now</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
                <div className="mt-4 text-center">
                    <Container fluid>
                        <Row>
                            <Col>
                                <h2>
                                    <strong>About Us</strong>
                                </h2>
                                <hr />
                                <p style={{ color: "black" }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p>
                                <p style={{ color: "black" }}>The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.</p>
                                <p style={{ color: "black" }}>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Row>
            {/* <MainContent/> */}
            {/* </Container> */}

        </div>
    );
};

export default Home;