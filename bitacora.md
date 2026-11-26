# Bitácora — Café Origen: analítica de ventas

## Objetivo del proyecto

Explorar una muestra de 12 ventas de Café Origen y construir indicadores básicos usando arreglos, objetos, funciones y ciclos `for...of`, sin utilizar `map`, `filter` ni `reduce`.

> **Nota de nombres:** en mi proyecto utilizo nombres en inglés (`sales`, `date`, `customer`, `product`, `city`, `quantity`, `price`). En las instrucciones del reto se utilizan nombres en español. Mantengo aquí los nombres reales de mi código para documentarlo correctamente.

## Reto 1 — Exploración de datos

### Estructura de los registros

El archivo `src/datos.js` contiene un arreglo de 12 objetos llamado `sales`. Cada objeto representa un registro de venta, con un identificador, fecha, cliente, producto, ciudad, cantidad y precio unitario. El arreglo se exporta mediante `module.exports` y se importa desde otros archivos con `require`.

### Diccionario de datos

| Propiedad en mi código | Propiedad en el enunciado | Tipo en JavaScript | Significado |
|---|---|---|---|
| `id` | `id` | `number` | Identificador del registro de venta. |
| `date` | `fecha` | `string` | Fecha de la venta, escrita con formato `AAAA-MM-DD`. |
| `customer` | `cliente` | `string` | Código del cliente que hizo la compra, como `C01`. |
| `product` | `producto` | `string` | Nombre y presentación del producto vendido. |
| `city` | `ciudad` | `string` | Ciudad asociada a la venta. |
| `quantity` | `cantidad` | `number` | Número de unidades registradas en la venta. |
| `price` | `precio` | `number` | Precio unitario del producto, en pesos colombianos. |

### Exploración inicial

En `src/explorar.js` uso `sales.length` para conocer la cantidad de registros; `sales[0]` para ver el primero; `sales[sales.length - 1]` para ver el último; `sales[4].product` para obtener el producto en la posición 4 (quinta venta, porque los índices empiezan en cero); y `console.table(sales)` para ver la tabla completa.

### Casos borde detectados

**1. Diferencias en la escritura de ciudades.** La ciudad Medellín aparece también como `medellín` en el registro 5. **Decisión:** conservar el dato original en `datos.js` y, al comparar ciudades, aplicar `trim()` y `toLowerCase()` para ignorar espacios al principio o al final y diferencias entre mayúsculas y minúsculas.

**2. Venta con cantidad cero.** El registro con `id: 8` tiene `quantity: 0`. No representa unidades vendidas y su valor es `0 × 42000 = 0`. **Decisión:** mantener el registro en la muestra, pero no contarlo como venta válida para calcular el ticket promedio. Su aporte a los totales de dinero y unidades es cero.

**3. Clientes que aparecen más de una vez.** Los códigos `C01`, `C02` y `C03` aparecen en diferentes registros. Esto puede significar que esos clientes compraron más de una vez; por sí solo no es un error ni un duplicado. **Decisión:** conservar todas las compras y contarlas como registros distintos. Si más adelante se requiere calcular clientes únicos, utilizar el código de cliente para distinguirlos.

## Reto 2 — Indicadores de negocio

### Pseudocódigo de las funciones

#### 1. `saleValue(sale)` — valor de una venta

1. Recibir un objeto de venta.
2. Multiplicar `sale.quantity` por `sale.price`.
3. Devolver el resultado.

No necesita un ciclo porque calcula el valor de un solo registro.

#### 2. `totalSold(sales)` — total vendido (acumulador)

1. Iniciar `total = 0`.
2. Recorrer el arreglo con `for...of`.
3. Para cada venta, calcular `saleValue(currentSale)`.
4. Sumar ese valor a `total`.
5. Al terminar, devolver `total`.

#### 3. `unitsSold(sales)` — unidades vendidas (acumulador)

1. Iniciar `totalUnits = 0`.
2. Recorrer cada venta con `for...of`.
3. Sumar `currentSale.quantity` a `totalUnits`.
4. Devolver `totalUnits`.

#### 4. `highestValueSale(sales)` — venta de mayor valor (máximo)

1. Iniciar `total = 0` y `sale = null`.
2. Recorrer cada venta con `for...of`.
3. Comparar `saleValue(currentSale)` con `total`.
4. Si es mayor, actualizar `total` y guardar el objeto en `sale`.
5. Devolver `{total, sale}` con el monto y el registro completo. Si el arreglo está vacío, `total` conserva `0` y `sale` conserva `null`.

**Formato elegido:** el registro completo se entrega dentro de `sale`, acompañado de su monto en `total`.

#### 5. `averageTicket(sales)` — ticket promedio (contador y acumulador)

1. Iniciar `count = 0`.
2. Recorrer cada venta con `for...of`.
3. Si la cantidad es mayor que cero, aumentar `count` en 1.
4. Al terminar el recorrido, si `count` es cero, devolver `0` para evitar una división por cero.
5. Calcular el total vendido mediante `totalSold(sales)` y dividirlo entre `count`.
6. Aplicar `Math.floor()` al cociente para devolver el ticket en pesos enteros.

#### 6. `salesByCity(sales, city)` — ventas de una ciudad (condicional y acumulador)

1. Recibir el arreglo y el nombre de una ciudad.
2. Convertir la ciudad buscada a minúsculas y quitar espacios sobrantes con `trim().toLowerCase()`.
3. Iniciar `total = 0`.
4. Recorrer las ventas con `for...of`.
5. Normalizar la ciudad de cada registro y compararla con la ciudad buscada.
6. Si coinciden, sumar `saleValue(currentSale)` al total.
7. Devolver el total.

### Tabla de traza manual 1 — `totalSold(sales)`

El acumulador empieza en `0`. En cada iteración se suma `quantity × price`.

| ID | Cálculo de la venta | Valor de la venta | Total acumulado |
|---|---|---:|---:|
| 1 | 2 × 42.000 | 84.000 | 84.000 |
| 2 | 1 × 26.000 | 26.000 | 110.000 |
| 3 | 1 × 95.000 | 95.000 | 205.000 |
| 4 | 1 × 42.000 | 42.000 | 247.000 |
| 5 | 3 × 45.000 | 135.000 | 382.000 |
| 6 | 2 × 26.000 | 52.000 | 434.000 |
| 7 | 1 × 120.000 | 120.000 | 554.000 |
| 8 | 0 × 42.000 | 0 | 554.000 |
| 9 | 2 × 45.000 | 90.000 | 644.000 |
| 10 | 4 × 42.000 | 168.000 | 812.000 |
| 11 | 1 × 95.000 | 95.000 | 907.000 |
| 12 | 3 × 26.000 | 78.000 | **985.000** |

**Verificación:** el cálculo manual y la función `totalSold(sales)` coinciden: **$985.000 COP**.

### Tabla de traza manual 2 — `unitsSold(sales)`

El acumulador `totalUnits` empieza en `0`.

| ID | Cantidad del registro | Unidades acumuladas |
|---|---:|---:|
| 1 | 2 | 2 |
| 2 | 1 | 3 |
| 3 | 1 | 4 |
| 4 | 1 | 5 |
| 5 | 3 | 8 |
| 6 | 2 | 10 |
| 7 | 1 | 11 |
| 8 | 0 | 11 |
| 9 | 2 | 13 |
| 10 | 4 | 17 |
| 11 | 1 | 18 |
| 12 | 3 | **21** |

**Verificación:** el cálculo manual y `unitsSold(sales)` coinciden: **21 unidades**.

### Resultados de la muestra completa

| Indicador | Resultado |
|---|---|
| Número de registros | 12 |
| Total vendido | $985.000 COP |
| Unidades vendidas | 21 |
| Venta de mayor valor | Registro `id: 10` — $168.000 COP |
| Ventas válidas para el ticket promedio | 11 |
| Ticket promedio, sin decimales mediante `Math.floor()` | $89.545 COP |
| Total vendido en Medellín (incluyendo `medellín`) | $356.000 COP |

### Casos borde de las funciones y decisiones

| Función | Arreglo vacío: decisión esperada |
|---|---|
| `totalSold([])` | Devolver `0`. |
| `unitsSold([])` | Devolver `0`. |
| `highestValueSale([])` | Devuelve `{ total: 0, sale: null }`, como se comprobó en consola. |
| `averageTicket([])` | Devolver `0`, sin dividir entre cero. |
| `salesByCity([], "Medellín")` | Devolver `0`, porque no hay ventas de esa ciudad. |

La función `saleValue(sale)` recibe un objeto individual, no un arreglo. Por eso se prueba con un registro válido, no con `[]`.

### Pruebas realizadas

Probé los indicadores con la muestra completa, un arreglo que contiene solo la primera venta (`id: 1`) y un arreglo vacío.

| Indicador | Muestra completa | Primera venta | Arreglo vacío |
|---|---|---|---|
| `totalSold` | 985.000 COP | 84.000 COP | 0 COP |
| `unitsSold` | 21 unidades | 2 unidades | 0 unidades |
| `highestValueSale` | `total: 168000` y registro `id: 10` en `sale` | `total: 84000` y registro `id: 1` en `sale` | `{ total: 0, sale: null }` |
| `averageTicket` | 89.545 COP | 84.000 COP | 0 COP |
| `salesByCity` para Medellín | 356.000 COP | 84.000 COP | 0 COP |

`saleValue` está exportada y se probó con el objeto de la primera venta. El resultado fue 84.000 COP.

Conservé los nombres de las funciones en inglés. Los nombres del enunciado, en el mismo orden en que se presentan en el pseudocódigo, son `valorVenta`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio` y `ventasPorCiudad`.

## Conclusión

Con los ciclos `for...of` pude aplicar patrones de acumulador, contador y máximo. La revisión muestra por qué es importante mirar la calidad de los datos antes de calcular: una ciudad escrita de otra manera puede separarse incorrectamente, una cantidad cero afecta el número de ventas válidas, y un cliente repetido no significa necesariamente un registro duplicado. También aprendí que una función debe definir qué devuelve cuando no recibe registros, para no producir errores como `NaN`.
