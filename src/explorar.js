const { sales } = require ('./datos');
const {totalSold, unitsSold, highestValueSale, averageTicket, salesByCity} = require ("./analitica");

console.log('Number of records:', sales.length);

console.log('\nFirst record:');
console.log(sales[0]);

console.log('\nLast record:');
console.log(sales[sales.length - 1]);

console.log('\nProduct in record 4:', sales[4].product);

console.log('\nFull table:');
console.table(sales);

console.table('\nSale value:');
console.table(saleValue(sales));

console.log('\nTotal sold:');
console.log(totalSold(sales));

console.log('\nUnits sold:');
console.log(unitsSold(sales));

console.log('\nHighest-value sale:');
console.log(highestValueSale(sales))

console.log('\nAverage ticket:');
console.log(averageTicket(sales))

console.log('\nTotal sold in Medellín:');
console.log(salesByCity(sales, "medellín"))




