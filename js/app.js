//Constructores

//Pide los datos del formulario
function seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() { }

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

//Instanciar UI
const ui = new UI();




document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //llena el Select con los años
});