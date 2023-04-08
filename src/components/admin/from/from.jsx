import React, { useState } from 'react';
import firebase from 'firebase/app';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './from.css'

const Frm = () => {
  const [Main, setBoard] = useState('');
  const [Sub, setSub] = useState('');
  const [Stop,setStop] = useState(['']);
  
  const addStop = () => {
    setStop([...Stop, '']);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const database = firebase.database();
    const busses = database.ref('busses');

    const newbusRef = busses.push();
    newbusRef.set({
      MainBoard: Main,
      SubBoard: Sub,
      Stop : Stop
    });

    setBoard('');
    setSub('');
    setStop(['']);
  };

  return (
    <div className='pi'>
     <Form onSubmit={handleSubmit} >
       <Form.Group as={Row} className="mb-3">
         <Col sm={10}>
           <Form.Control type="text" value={Main} onChange={(event) => setBoard(event.target.value)} placeholder="Enter Main Board" />
         </Col>
       </Form.Group>
    
       <Form.Group as={Row} className="mb-3">
         <Col sm={10}>
           <Form.Control type="text" value={Sub} onChange={(event) => setSub(event.target.value)} placeholder="Enter Sub Board" />
         </Col>
       </Form.Group>
    
       {Stop.map((stop, index) => (
         <Form.Group key={index} as={Row} className="mb-3" controlId={`stop${index}`}>
           <Form.Label column sm={2}>
             {index === 0 ? 'Add stop' : ''}
           </Form.Label>
    
           <Col sm={10}>
             <Form.Control value={stop} onChange={(event) => {
               const newStop = [...Stop];
               newStop[index] = event.target.value;
               setStop(newStop);
             }} placeholder={`Enter Stop ${index+1}`} />
           </Col>
         </Form.Group>
       ))}
    
       <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">  
         <Col sm={{ span: 10, offset: 2 }}> 
           <Button type="button" onClick={addStop}>+</Button> &nbsp;Add another stop
         </Col>
       </Form.Group>
          <br></br>
       <Form.Group column sm={2} className="mb-3" controlId="formHorizontalCheck">  
         <Col column sm={7}> By Proceeding changes will be updated securely to database
          <br></br> <Button type="submit">Save Changes</Button>
         </Col>
       </Form.Group>
     </Form>
     </div>

  );
};

export default Frm;



// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import './from.css'

// function Frm() {
//   return (
//     <div className='pi'>
//     <Form>
//       <Form.Group as={Row} className="mb-3">
//         <Col sm={10}>
//           <Form.Control type="text" placeholder="Enter Main Board" />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3">
//         <Col sm={10}>
//           <Form.Control type="text" placeholder="Enter Sub Board" />
//         </Col>
//       </Form.Group>




//       <Form.Group as={Row} className="mb-3" controlId="text">
//         <Form.Label column sm={2}>
//           Add stop
//         </Form.Label>

//         <Col sm={10}>
//           <Form.Control type="" placeholder="Enter Stop" />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="text">
//         <Form.Label column sm={2}>
//         </Form.Label>
//         <Col sm={10}>
//           <Form.Control type="" placeholder="Enter Stop" />
//         </Col>
//       </Form.Group>
      
//       <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">  
//         <Col sm={{ span: 10, offset: 2 }}> 
//           <Button type="submit">+</Button>
//         </Col>
//       </Form.Group>
//     </Form>
//     </div>
//   );
// }

// export default Frm;