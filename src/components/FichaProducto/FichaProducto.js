import React from 'react';

class FichaProducto extends React.Component {

    render() {
        
        return (
            <>
                <h2>PRODUCTO: {this.props.datos.nombre}</h2>
                <h3>PRECIO: {this.props.datos.precio} €.</h3>
                <p><img src={this.props.datos.imagen} alt="Imagen producto" /></p>
                <p>{this.props.datos.descripcion} </p>
            </>
        )
    }
}

export default FichaProducto;