import React from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './Confirmacion.css';

class Confirmacion extends React.Component {
    componentDidMount() {
        console.log('En carrito hay:',this.props.carrito);
      }

    constructor (props) {
        super(props)
        this.state = {
          correo:'',
          nombre: '',
          apellidos: '',
          direccion:'',
          localidad:'',
          provincia:'',
          cp: 0,
          actualizado: false
        }
      }

      grabaPedido = (carrito,total) => {
        if(total>0){
            if(this.state.correo !== '' && this.state.nombre !== '' && this.state.apellidos !== ''  && this.state.direccion !== '' && this.state.localidad !== '' && this.state.cp !== 0  ){
                const data = {
                    datoscliente: {
                    correo: this.state.correo,
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    direccion: this.state.direccion,
                    localidad: this.state.localidad,
                    provincia: this.state.provincia,
                    cp: parseInt(this.state.cp)
                    },
                    datospedido: {carrito, total}
                };

                axios.post('https://proyecto1ejemplo-carlos-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json?auth=' + this.props.idToken, data)
                    .then(response => {
                        alert('Pedido realizado correctamente');
                        this.setState({actualizado:true});
                    });
            }else{
                alert("Faltan datos del usuario, completelos y vuelva a pulsar el botón si desea realizar el pedido")
            }
        }else{
            alert("No hay nada en su carrito, seleccione algún producto y repita el proceso")
        }
    }

    render() {
        //const { nombre, apellidos, direccion, localidad, provincia,cp } = this.state
        let redireccion = null;
        if(this.state.actualizado){
            redireccion =(<div><Redirect to="/" /></div>)
        }
        return (
            <>
            {redireccion}
            <div>
                <h1>Datos personales</h1>

                
                <Form className="Formulario">
				<Form.Row as={Col} > 
                    <Form.Group  controlId="formGridName">
                    <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder="Nombre" value={this.state.nombre} onChange={(event) => this.setState({ nombre: event.target.value })}/>
                    </Form.Group>
                    
                    <Form.Group as={Col}  controlId="formGridSurnane">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control placeholder= "Apellidos"  value={this.state.apellidos} onChange={(event) => this.setState({ apellidos: event.target.value })}/>
                    </Form.Group>
				</Form.Row>

                <Form.Row> 
                <Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Introducir email" value={this.state.correo} onChange={(event) => this.setState({ correo: event.target.value })} />
				</Form.Group>
                </Form.Row>

				<Form.Group controlId="formGridAddress1">
					<Form.Label>Dirección</Form.Label>
					<Form.Control placeholder="C/ AAAA Nº 99" value={this.state.direccion} onChange={(event) => this.setState({ direccion: event.target.value })}/>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>Ciudad/Localidad</Form.Label>
						<Form.Control value={this.state.localidad} onChange={(event) => this.setState({ localidad: event.target.value })} />
					</Form.Group>


					<Form.Group as={Col} controlId="formGridZip">
						<Form.Label>Código postal</Form.Label>
						<Form.Control type="number" value={this.state.cp} onChange={(event) => this.setState({ cp: event.target.value })} />
					</Form.Group>
				</Form.Row>

                <div>
                    TOTAL DEL PEDIDO = {this.props.total} €
                </div>
         
                <Button  onClick={() => this.grabaPedido(this.props.carrito,this.props.total)} variant="outline-info">
                    REALIZAR PEDIDO
                </Button>
             

                <Link to={{ pathname: '/' }} >
                    <Button  variant="outline-danger">
                      CANCELAR PEDIDO
                    </Button>
                </Link>

	
			</Form>

            </div>

            </>
        )
    }
}

export default Confirmacion;