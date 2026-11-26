
function saleValue(sale) {
    const total = sale.quantity * sale.price;
    return total;
};

function totalSold(sales) {  
    let total = 0; 
    for (const currentSale of sales){
        total += saleValue(currentSale);
    }
    return total;    
};

function unitsSold(sales) {
    let totalUnits = 0;
    for (const currentSale of sales){
        totalUnits += currentSale.quantity
    }
    return totalUnits;
};

function highestValueSale(sales) {
    let total = 0;
    let sale = null;
    for (const currentSale of sales){
        if (saleValue(currentSale) > total){
            total = saleValue(currentSale);
            sale = currentSale;
        }
    }
    return {total, sale};
};

function averageTicket(sales) {
    let count = 0;
    for (const currentSale of sales){
        if (currentSale.quantity > 0){
            count++;
        }
    }
    if (count == 0) {return 0};
    let average = totalSold(sales) / count;
    return Math.floor(average);
};

function salesByCity(sales, city) {
    let normalizedCity = city.trim().toLowerCase();
    let total = 0;
    for(const currentSale of sales){
        if (currentSale.city.trim().toLowerCase() === normalizedCity){ 
            total += saleValue(currentSale);
        }
    }
    return total;
};

module.exports = {
saleValue,
totalSold, 
unitsSold, 
highestValueSale, 
averageTicket, 
salesByCity
};
