// Aquí realizamos un la consulta de la promesa, esperando su respuesta asíncrona
Promise.resolve('https://randomuser.me/api/')
    .then(fetch)
    .then(response => response.json())
    .then( //manipulamos la respuesta 
        renderizarDatosUsuario);

function renderizarDatosUsuario(datos) {
    /* -------------------------------- CONSIGNA 1 -------------------------------- */
    // Aquí deben desarrollar una función que muestre en pantalla:
    // la foto, el nombre completo del usuario y su email.
    // Esto debe estar basado en la info que nos llega desde la API e insertarse en el HTML.
    const usuario = datos.results[0];
    const info = {};

    recorrerObjetoYHacer(usuario);
    recorrerObjetoYHacer(usuario, (key, value) => {
        info[key] = value;
    });

    document.querySelector('.tarjeta').innerHTML = `
    <h1>${info.title}. ${info.first} ${info.last}</h1>
    <img src="${info.large}">
    <p>${info.email}</p>
    `;

}

const CAMPOS = ['email', 'title', 'first', 'last', 'large'];

let recorrerObjetoYHacer = (objeto, hacer = (key, value) => {
    console.log(key + ": " + value)
}) => {
    for (const dato in objeto) {
        if (objeto[dato] instanceof Object) {
            recorrerObjetoYHacer(objeto[dato], hacer);
        } else {
            if (CAMPOS.includes(dato))
                hacer(dato, objeto[dato]);
        }
    }
    return objeto;
}



/* --------------------------- CONSIGNA 2 (extra) --------------------------- */
// Aqui pueden ir por el punto extra de utilizar el boton que se encuentra comentado en el HTML
// Pueden descomentar el código del index.html y usar ese boton para ejecutar un nuevo pedido a la API, sin necesidad de recargar la página.
// Es criterio del equipo QUÉ bloque del código debe contenerse dentro de una función para poder ser ejecutada cada vez que se escuche un click.

document.querySelector('#random').onclick = () => {
    Promise.resolve('https://randomuser.me/api/')
        .then(fetch)
        .then(response => response.json())
        .then( //manipulamos la respuesta 
            renderizarDatosUsuario);
}