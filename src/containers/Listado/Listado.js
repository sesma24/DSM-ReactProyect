import React from 'react';
import './Listado.css';
import Products from '../../components/Products/Products';
import Carrito from '../../components/Carrito/Carrito';
import axios from 'axios';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const ContextoAutenticado = React.createContext({
  autenticado: false,
});

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      carrito: [],
      mostrar: true,
      autenticado: false,
      error: false,
    }
  }
  // componentDidMount() {
  //   console.log('<Listado> se va a montar');
  // }
  componentWillUnmount() {
    console.log('<Listado> se va a desmontar');
  }

  componentDidMount() {
   
    axios.get('https://proyecto1ejemplo-carlos-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then(response => {
        let productos = [];
        console.log(response.data);
        

        for (let id in response.data) {
          productos.push({
            ...response.data[id],
            key: id
          });
          
        }
       
        this.setState({ productos: productos });
        
    
      }).catch(error => {
        this.setState({ error: true });
      });
  }


  quitarProducto = (key) => {
    //console.log('Entra');
    let carrito = this.state.carrito;
    if (carrito[key].cantidad > 0) {
      carrito[key].cantidad -= 1;
    }else{
      carrito[key] = null;
    }
    this.setState({ carrito: carrito });
  }

  añadirProducto = (key) => {
    let carrito = this.state.carrito;
    let productos  =this.state.productos;
    if (carrito[key]) {
      carrito[key].cantidad++;
    }else {
      carrito[key] = productos[key];
      carrito[key].cantidad = 1;
    }
    this.setState({ carrito: carrito });
  }

  preciototalPedido = () => {
    let total = 0;
    for (let key in this.state.carrito) {
        total += this.state.carrito[key].precio * this.state.carrito[key].cantidad
    }
    return total
  }

  cambiaLogin = () => {
    const autenticado = this.state.autenticado;
    this.setState({ autenticado: !autenticado });
  }

  render() {


    let listaproductos = null;
    let listacarrito = null;
    
      
      let total = 0;
      listaproductos = (
        <Products
          productos={this.state.productos}
          carrito={this.state.carrito}
          quitarProducto={this.quitarProducto}
          añadirProducto={this.añadirProducto}
          auth={this.props.auth} />
          
          
      )

      listacarrito = (
        <Carrito
          carrito={this.state.carrito}
          auth={this.props.auth} />   
      )

      total = this.preciototalPedido()
      let carritoOpciones = null;

      if (this.props.auth) {
        carritoOpciones = (
            <>
              <Col className="Totales" sm={4}>
                <h2>Carrito de la compra</h2>
                {listacarrito}
                <div className="ValorTotal">
                  <p>Total del pedido: {total}€</p>
                </div>
                <div>
                  <Link to={{ pathname: '/pedido' }} >
                    <Button  onClick={() => this.props.actualizarInfoGeneral(this.state.carrito, total)} variant="outline-success">
                      REALIZAR PEDIDO
                    </Button>
                  </Link>
                  
                </div>
              </Col>
            </>
        )
    }
    
    return (
    <div className="Listado">

        <ContextoAutenticado.Provider
          value={{
            autenticado: this.state.autenticado,
            cambiaLogin: this.cambiaLogin
          }}>
          
          
          <Container className="Lista">
            <Row>
              <Col sm={8}>{listaproductos}</Col>
              {carritoOpciones}

            </Row>
          </Container>
      

         
          
        </ContextoAutenticado.Provider>

      </div>
    )
  }

}

export default Listado;
