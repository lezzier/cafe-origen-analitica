
function valorVenta(venta) {
    let total = venta.cantidad * venta.precio;
    return total;
};

function totalVendido(ventas) {  
    let contar = 0 
    for (const actual of ventas)
        contar += valorVenta(actual)
    return contar    
};

function unidadesVendidas(ventas) {
    let contar = 0
    for (const actual of ventas)
        contar += actual.cantidad
    return contar

};

function ventaMayor(ventas) {
    let maximo = 0
    for (const actual of ventas){
        if (valorVenta(actual) > maximo) {
            maximo = valorVenta(actual)
        }
        
    }
      return maximo   
};





module.exports = {totalVendido, unidadesVendidas, ventaMayor};
