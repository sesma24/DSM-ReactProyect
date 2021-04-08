import React from 'react';
import ProductoCarrito from './ProductoCarrito/ProductoCarrito';

class Carrito extends React.Component {
    render() {
        return (
            <>
            {this.props.carrito.map((producto, id) => {

                return <ProductoCarrito nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                    cantidad={producto.cantidad}
                    auth={this.props.auth}
                    key={id}
                    />
                
            })}
        </>
        )
    }
}

export default Carrito;