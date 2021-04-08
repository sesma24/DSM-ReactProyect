import React from 'react';

class ProductoCarrito extends React.Component {
    render() {
        return (
            
   
            <div >
                
                {this.props.cantidad} {this.props.nombre} ({this.props.precio}€) = {this.props.precio*this.props.cantidad}€

            </div>
              
            
      
        )
    }
}

export default ProductoCarrito;