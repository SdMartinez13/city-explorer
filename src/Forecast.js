import React from 'react';
// import { Container, Card } from 'react-bootstrap';

class Forecast extends React.Component {
    render(){
        console.log(this.props);
        return (
       
                <li className='py-2'>

                <div className='border-top w-25 bg-white'/>

                  <p className='p-1 m-0'>{this.props.day.date}</p>
                  <p>Current Temp: {this.props.day.temp}º</p> 
                  <p className='p-1 m-0 h4'>{this.props.day.description}</p>
                  <p>High: {this.props.day.max_temp}º Low: {this.props.day.min_temp}º </p> 

                

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

export default Forecast;