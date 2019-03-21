var local = {
    vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

    ventas: [
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
    ],

    precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
    ]
};


function precioMaquina(componentes) {
    var firstPrice = 0;
    var secondPrice = 0;

    for (var i = 0; i < componentes.length; i++) {
        for (var j = 0; j < local.precios.length; j++) {
            if (componentes[i] === local.precios[j].componente) {
                firstPrice = local.precios[j].precio
                var totalPrice = firstPrice + secondPrice // tmb se puede poner precioTotal = 0; precioTotal = precioTotal + local.precios[j].precio (y no ponemos first or second price)
                secondPrice = totalPrice
            }
        }
    }

    return totalPrice

}


console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]));




function cantidadVentasComponente(componente) {
    var zero = 0;
    for (var i = 0; i < local.ventas.length; i++) {
        for (var g = 0; g < local.ventas[i].componentes.length; g++) {
            if (componente === local.ventas[i].componentes[g]) {
                zero += 1
            }
        }
    }
    return zero

}

console.log(cantidadVentasComponente("Monitor ASC 543"));

// objeto Date es un objeto que registra un momento exacto en el tiempo, devuelve fecha. dia, mes anio... enero es 0, febrero es 1, hora y zona horaria.
// Devuelve string
// var fecha = new Date ()
//     console.log(fecha)

// var fechaDeFebrero = new Date (2019,1,14)


// console.log(local.ventas[0].fecha.getMonth()) // devuelve un numero, 1 en este caso, que es febrero
// console.log(local.ventas[0].fecha.getFullYear()) //devuelve el anio completo
//hay que filtrar estas dos cosas porque se nos pide por el parametro.



function vendedoraDelMes(mes, anio) {
    var arrayVendedoras = [];
    for (var i = 0; i < local.vendedoras.length; i++) {
        var vendorasObj = {
            nombre: local.vendedoras[i],
            ventas: 0,
        }
        for (var j = 0; j < local.ventas.length; j++) {
            if (local.ventas[j].fecha.getMonth() + 1 == mes && local.ventas[i].fecha.getFullYear() == anio) {
                var precioComponentes = precioMaquina(local.ventas[j].componentes)
                if (local.vendedoras[i] === local.ventas[j].nombreVendedora) {
                    if (vendorasObj.nombre === local.ventas[j].nombreVendedora) {
                        vendorasObj.ventas = vendorasObj.ventas + precioComponentes;
                    }
                }
            }
        }
        arrayVendedoras.push(vendorasObj)
    }

    var mejorVendedora;
    var ventaMax = 0;

    for (var k = 0; k < arrayVendedoras.length; k++) {
        if (arrayVendedoras[k].ventas) {
            ventaMax = arrayVendedoras[k].ventas;
            mejorVendedora = arrayVendedoras[k].nombre;
            return 'La vendedora del mes es' + ' ' + mejorVendedora + ' ' + 'con' + ' ' + ventaMax + ' ' + 'pesos vendidos'
        }
    }
}

console.log(vendedoraDelMes(1, 2019))


function ventasMes(mes, anio) {
    var ventasMes = 0;
    for (var i = 0; i < local.ventas.length; i++) {

        if (local.ventas[i].fecha.getMonth() + 1 === mes && local.ventas[i].fecha.getFullYear() == anio) {

            var ventasMes = ventasMes + precioMaquina(local.ventas[i].componentes)

        }
    }
    return ventasMes
}

console.log('Las ventas del mes fueron', ventasMes(1, 2019), 'pesos');

function ventasVendedora(nombre) {
    var ventasVendedora = 0;
    for (var i = 0; i < local.ventas.length; i++) {
        if (local.ventas[i].nombreVendedora === nombre) {
            // console.log(precioMaquina(local.ventas[i].componentes), 'fue recaudado por la vendedora', local.ventas[i].nombreVendedora)
            ventasVendedora = ventasVendedora + precioMaquina(local.ventas[i].componentes)
        }

    }
    return ventasVendedora 
}

console.log(ventasVendedora("Grace"))




function componenteMasVendido() {
    var lista = [];

    for (var i = 0; i < local.precios.length; i++) {

        lista.push(cantidadVentasComponente(local.precios[i].componente))

    }

    var valorMaximo = 0;
    var posicion = 0;
    for (var j = 0; j < lista.length; j++) {
        if (lista[j] > valorMaximo) {
            valorMaximo = lista[j]
            posicion = [j]
        }
        return local.precios[j].componente + ' ' + 'con:' + ' ' + valorMaximo + ' ' + 'ventas'
    }

}

console.log('El componente más vendido fue', componenteMasVendido());




function huboVentas(mes, anio) {
    var huboVentas = false;
    for (var i = 0; i < local.ventas.length; i++) {
        if ((local.ventas[i].fecha.getMonth() + 1) == mes && (local.ventas[i].fecha.getFullYear() == anio)) {
            huboVentas = true;
        }
    }
    return huboVentas
}

console.log('Hubo ventas en el mes:', huboVentas(3, 2019));



///*2DA PARTE*/


for (var i = 0; i < local.ventas.length; i++) {
    local.ventas[i].sucursal = 'Centro'
}


/*console.log(local.ventas)*/

local.sucursales = ['Centro', 'Caballito']

/*console.log(local)*/



local.ventas.addVentas = function (fecha, nombreVendedora, componentes, sucursal) {

    local.ventas.push({ fecha: fecha, nombreVendedora: nombreVendedora, componentes: componentes, sucursal: sucursal })
}

local.ventas.addVentas(new Date(2019, 1, 12), 'Hedy', ['Monitor GPRS 3000', 'HDD Toyiva'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 24), 'Sheryl', ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], 'Caballito')
local.ventas.addVentas(new Date(2019, 1, 1), 'Ada', ['Motherboard MZI', 'RAM Quinston Fury'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 11), 'Grace', ['Monitor ASC 543', 'RAM Quinston'], 'Caballito')
local.ventas.addVentas(new Date(2019, 1, 15), 'Ada', ['Motherboard ASUS 1200', 'RAM Quinston Fury'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 12), 'Hedy', ['Motherboard ASUS 1500', 'HDD Toyiva'], 'Caballito')
local.ventas.addVentas(new Date(2019, 1, 21), 'Grace', ['Motherboard MZI', 'RAM Quinston'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 8), 'Sheryl', ['Monitor ASC 543', 'HDD Wezter Dishital'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 16), 'Sheryl', ['Monitor GPRS 3000', 'RAM Quinston Fury'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 27), 'Hedy', ['Motherboard ASUS 1200', 'HDD Toyiva'], 'Caballito')
local.ventas.addVentas(new Date(2019, 1, 22), 'Grace', ['Monitor ASC 543', 'HDD Wezter Dishital'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 5), 'Ada', ['Motherboard ASUS 1500', 'RAM Quinston'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 1), 'Grace', ['Motherboard MZI', 'HDD Wezter Dishital'], 'Centro')
local.ventas.addVentas(new Date(2019, 1, 7), 'Sheryl', ['Monitor GPRS 3000', 'RAM Quinston'], 'Caballito')
local.ventas.addVentas(new Date(2019, 1, 4), 'Ada', ['Motherboard ASUS 1200', 'HDD Toyiva'], 'Centro')


function ventasSucursal(sucursal) {

    var total = 0;
    for (var i = 0; i < local.ventas.length; i++) {
        if (sucursal === local.ventas[i].sucursal) {

            total = total + precioMaquina(local.ventas[i].componentes)

        }
    }
    return 'La cantidad de dinero vendido en la sucursal de' + ' ' + sucursal + ' ' + 'es de:' + ' ' + total + ' ' + 'pesos'
}

console.log(ventasSucursal("Centro"));

function sucursalDelMes(mes, anio) {
    var centro = 0;
    var caballito = 0;
    var mensaje = ' ';
    for (var i = 0; i < local.ventas.length; i++) {
        if (local.ventas[i].fecha.getMonth() + 1 == mes && local.ventas[i].fecha.getFullYear() == anio) {
            centro = ventasSucursal("Centro");
            caballito = ventasSucursal("Caballito");
        } if (centro < caballito) {
            mensaje = 'La sucursal de Caballito fue la que más vendió'
        } else { mensaje = 'La sucursal de Centro fue la que más vendió' }
    } return mensaje
}
console.log(sucursalDelMes(1, 2019));


//PARTE 3

function renderPorMes() {
    console.log('"Ventas por Mes"')
    var meses = {
        mesesNumeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        mesesLetras: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }

    var mensaje = '';
    for (var i = 0; i < meses.mesesNumeros.length; i++) {
        if (huboVentas(meses.mesesNumeros[i], 2019)) {
            mensaje = mensaje + 'En el mes' + ' ' + meses.mesesLetras[i] + ' ' + 'se vendieron' + ' ' + ventasMes(meses.mesesNumeros[i], 2019) + ' ' + 'pesos.\n'
        }
    } return mensaje
}



console.log(renderPorMes())


function renderPorSucursal() {
    console.log('"Ventas por Sucursal":')
    var centro = '';
    var caballito = ' ';
    for (var i = 0; i < local.sucursales.length; i++) {
        if (local.sucursales[i] === "Centro") {
            centro = ventasSucursal(local.sucursales[i])
        } if (local.sucursales[i] === "Caballito") {
            caballito = ventasSucursal(local.sucursales[i])
        }
    } return caballito + '\n' + centro
}



console.log(renderPorSucursal())


function render() {
    console.log("---Reporte---")
    var renderMes = renderPorMes()
    var renderSucur = renderPorSucursal()
    var compoMax = componenteMasVendido()
    var vendedora = [];
    var maxValor = 0;
    var posicion ;
    var maxVendedora;

    
    for (var i = 0; i < local.vendedoras.length; i++) {
       
       
       var vendedoras = {
           nombre: local.vendedoras[i],
           dinero: ventasVendedora(local.vendedoras[i])
       }
       
       vendedora.push(vendedoras)
       
    }
    
    for(var j = 0; j < vendedora.length; j++) {
        if (vendedora[j].dinero > maxValor) {
            maxValor = vendedora[j].dinero
           posicion = [j]
           
           maxVendedora = vendedora[j].nombre
        }
        
    }
    

    return renderMes + '\n' + renderSucur + '\n' + 'El componente estrella fue:'+' ' + compoMax + '\n' + 'La vendedora que genero más ingresos fue' + ' ' + maxVendedora
}

console.log(render())