class ValdiarCampoNumerico {
    public nodo:any;
    public valor:any;

    constructor(selector){                       
        this.nodo = document.querySelector(selector);
        this.valor = '';
        
        this.empezarAEscucharEventos();
    }

    empezarAEscucharEventos() {                       
        this.nodo.addEventListener('keydown', function(evento) {
          const teclaPresionada = evento.key;
          const teclaPresionadaEsUnNumero =
            // tslint:disable-next-line: radix
            Number.isInteger(parseInt(teclaPresionada));
    
          const sePresionoUnaTeclaNoAdmitida = 
            teclaPresionada != 'ArrowDown' &&
            teclaPresionada != 'ArrowUp' &&
            teclaPresionada != 'ArrowLeft' &&
            teclaPresionada != 'ArrowRight' &&
            teclaPresionada != 'Backspace' &&
            teclaPresionada != 'Delete' &&
            teclaPresionada != 'Enter' &&
            !teclaPresionadaEsUnNumero;
          const comienzaPorCero = 
            this.nodo.value.length === 0 &&
            teclaPresionada == 0;
    
          if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
            evento.preventDefault(); 
          } else if (teclaPresionadaEsUnNumero) {
            this.valor += String(teclaPresionada);
          }
    
        }.bind(this));
    
        this.nodo.addEventListener('input', function(evento) {
          const cumpleFormatoEsperado = new RegExp(/^[0-9]+/).test(this.nodo.value);
    
          if (!cumpleFormatoEsperado) {
            this.nodo.value = this.valor;
          } else {
            this.valor = this.nodo.value;
          }
        }.bind(this));
      }
}