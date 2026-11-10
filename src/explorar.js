const { ventas } = require ('./datos');

console.log('Cantidad de registros:', ventas.length);

console.log('\nPrimer registro:');
console.log(ventas[0]);

console.log('\nÚltimo registro:');
console.log(ventas[ventas.length - 1]);

console.log('\nProducto del registro en la posicion 4:', ventas[4].producto);

console.log('\nTabla completa:');
console.table(ventas);
