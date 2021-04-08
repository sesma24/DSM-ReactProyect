import React from 'react';
import Product from './Product/Product';

class Products extends React.Component {
    componentDidMount() {
        console.log('<Products> se ha montado');
    }
    componentWillUnmount() {
        console.log('<Products> se va a desmontar');
    }
    render() {
        
        return (
                    
        <React.Fragment>
                {this.props.productos.map((producto, key) => {
                    let cantidad= 0;
                    if(this.props.carrito[key]) cantidad = this.props.carrito[key].cantidad;

                    return <Product nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                        cantidad={cantidad}
                        quitarProducto={() => this.props.quitarProducto(key)}
                        añadirProducto={() => this.props.añadirProducto(key)}
                        auth={this.props.auth}
                        id={key}
                        key={key}
                        />
                    
                })}
            </React.Fragment>
        )
    }
}

export default Products;