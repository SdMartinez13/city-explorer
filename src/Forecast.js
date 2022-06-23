import React from 'react';
// import { Container, Card } from 'react-bootstrap';

class Forcast extends React.Component {
    render(){
        console.log(this.props);
        return (
       
                <li className='py-2'>
                  <p className='p-0 m-0 '>{this.props.day.date}</p> 
                  <p className='p-0 m-0 h3'>{this.props.day.description}</p>
                </li>

              


              
    )
}
    // render(){
    //     return (
    //         <Container style={{background: 'transparent'}}>
    //             <Card style={{background: 'transparent'}}>
    //                 <Card.Body>
    //                     <Card.Title>Weather in: {this.props.city} on: {this.props.date}</Card.Title>
    //                      <Card.Text>{this.props.description}</Card.Text>
    //                 </Card.Body>
    //             </Card>
    //         </Container>
    //     )
    // }
}

export default Forcast;