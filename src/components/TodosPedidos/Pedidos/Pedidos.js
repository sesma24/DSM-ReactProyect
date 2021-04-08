import React from 'react';
import DatosPedido from './DatosPedido/DatosPedido'

class Pedidos extends React.Component {
    render() {
        return (
            <React.Fragment>
            {this.props.pedidos.map((pedido, id) => {
                return <DatosPedido nombre={pedido.datoscliente.nombre}
                    apellidos={pedido.datoscliente.apellidos}
                    correo={pedido.datoscliente.correo}
                    carrito={pedido.datospedido.carrito}
                    total={pedido.datospedido.total}
                    key={pedido.key}
                    eliminando={() => this.props.eliminarPedido(id)}
                    auth={this.props.auth}
                     />
                
            })}
        </React.Fragment>
            
      
        )
    }
}

export default Pedidos;