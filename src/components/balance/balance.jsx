import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './balance.css'



function WithHeaderStyledExample() {
  return (
    <Container className='m=3 balance'>
      <Card>
        <Card.Header as="h5">Pay balance</Card.Header>
        <Card.Body>
          <Card.Title>Current balance <span>$ 900.0</span></Card.Title>
          <small>You can add upto ₹ 10000.0</small>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="warning">Add money to balance</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}



export default WithHeaderStyledExample;
//model