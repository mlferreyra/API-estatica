//Request is designed to be the simplest way possible to make http calls.
const http = require('http');

const ordenes = [
    { 'nombre': 'sopa', 'cantidad': 2, 'estado': 'servido', 'mesa': 1 },
    { 'nombre': 'carne', 'cantidad': 3, 'estado': 'proceso', 'mesa': 2 },
    { 'nombre': 'pasta', 'cantidad': 1, 'estado': 'pagado', 'mesa': 3 },
    { 'nombre': 'ensalada', 'cantidad': 4, 'estado': 'proceso', 'mesa': 4 },
];

http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(ordenes));
    } else if (req.url == '/ordenes-proceso') {
        pedidosEnProceso(res);
    } else if (req.url == '/ordenes-sopa') {
        pedidosPorNombre('sopa', res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('No se encontro la solicitud requerida');
    }
}).listen(3000);

console.log('Servidor iniciado...');

const pedidosEnProceso = (res) => {
    //esta funcion me permite filtar un arreglo por condicion
    const arregloRes = ordenes.filter(item => {
        return item.estado == 'proceso';
    });
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(arregloRes));
}

const pedidosPorNombre = (nombre, res) => {
    //esta funcion me permite filtar un arreglo por condicion
    const arregloRes = ordenes.filter(item => {
        return item.nombre == nombre;
    });
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(arregloRes));
}