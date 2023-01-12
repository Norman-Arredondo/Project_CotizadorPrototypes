//Constructores

//Pide los datos del formulario
function seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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


    //Utilizar el prototye que va a cotizar
}