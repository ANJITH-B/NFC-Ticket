import { Button, Container, Form } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './banner.css'

function Banner() {
  return (
    <Container className='top'>
    <Carousel>
      <Carousel.Item>
        <img
          
          className="d-block w-100"
          src={require('./5510989.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
            <img
            className="search"
            src={require('./search.png')}
            />
            </Button>
          </Form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}

export default Banner;