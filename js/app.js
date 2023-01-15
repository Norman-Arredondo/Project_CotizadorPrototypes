//Constructores

//Pide los datos del formulario
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realiza la cotización con los datos seleccionados
Seguro.prototype.cotizarSeguro = function() {
    //Tengo que acceder a los datos del objeto, por eso no arrow function
    /**1 Americano 1.15
     * 2 Asiatico 1.05
     * 3 Europeo 1.35
     */
    
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05
            ;
            break;

        case '3':
            cantidad = base * 1.35;
            break;

        default:
            break;
    }

    // leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /**
     * Si el seguro es básico se multiplica por un 30% más
     *  Si el seguro es completo se multiplica por un 50% más
     */

    if(this.tipo === 'basico') {
        cantidad *= 1.3;
    } else {
        cantidad *=1.5;
    }

    return cantidad;
  

}


function UI() { }


//Prototypes

//Llena las opciones de los años, genera HTML y sólo pertenece a UI
UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
            min = max -20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i; //Para ver los años
        selectYear.appendChild(option);
    }
}

//Muestra Alertas en pantalla
//No tiene this porque no hay ninguna propiedad en UI
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error'); //mensaje y error vienenen en la hoja de estilos

    }else {
        //div.classList.add('mensaje', 'correcto');
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}


UI.prototype.mostrarResultado = (total, seguro) =>{

    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `

        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total: ${total}</p>
    `;

    const resultadoDiv = document.querySelector('#resultado'); //seleccionamos el div
    resultadoDiv.appendChild(div); //le paso el div que acabo de crear arriba 


    //Mostrar el spiner
}

//Instanciar UI
const ui = new UI();




document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //llena el Select con los años
});



eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

//como es submit - tomamos el evento
function cotizarSeguro(e) {
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer el año seleccionado 
    const year = document.querySelector('#year').value;

    //Leer el tipo de cobertura - (Son radio Buttons)
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca=== '' || year=== '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito'); //Pertenece al proto de mostrarMensaje


    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    

    //Utilizar el prototye que va a cotizar
    ui.mostrarResultado(total, seguro);

}