import React from 'react';
import Carrito from '../Carrito/Carrito'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Pedido extends React.Component {
    render() {
        let listacarrito = null;
        listacarrito = (
            <Carrito
              carrito={this.props.carrito}
              auth={this.props.auth} />   
          )

        return (
            <>
            <div>
                <h1>Cesta de la compra</h1>
                {listacarrito}
                TOTAL DEL PEDIDO = {this.props.total} €
            </div>

            <Link to={{ pathname: '/confirmacion' }} >
                    <Button  variant="outline-success">
                      CONTINUAR
                    </Button>
            </Link>
            </>
        )
    }
}

export default Pedido;