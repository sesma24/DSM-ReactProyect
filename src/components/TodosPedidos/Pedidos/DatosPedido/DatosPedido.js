import React from 'react';
import {Button} from 'react-bootstrap';

class DatosPedido extends React.Component {
    render() {
        console.log(this.props.carrito);
        const listItems = this.props.carrito.map((productocarritopedido, id) => {
            if (productocarritopedido != null) {
                return (
                    <li key={id}>{productocarritopedido.nombre}</li>
                )
            }
        }
        );

        return (
            
   
            <React.Fragment>
                <br></br>
                {this.props.nombre} {this.props.apellidos} ({this.props.correo}) = {this.props.total} €
                <br></br>
                {listItems}
                <br></br>
                <Button variant="outline-danger"  onClick={this.props.eliminando} >Borrar</Button>
        
                <br></br>

            </React.Fragment>
              
            
      
        )
    }
}

export default DatosPedido;