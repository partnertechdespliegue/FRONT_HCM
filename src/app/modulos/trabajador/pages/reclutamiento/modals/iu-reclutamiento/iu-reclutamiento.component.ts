import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarpostulanteComponent } from '../confirmarpostulante/confirmarpostulante.component';
import { Postulante } from '../../../../../../models/postulante';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PostulanteService } from '../../../../services/postulante/postulante.service';
import { inputs } from '@syncfusion/ej2-angular-calendars/src/calendar/calendar.component';

@Component({
  selector: 'app-iu-reclutamiento',
  templateUrl: './iu-reclutamiento.component.html',
  styles: []
})
export class IuReclutamientoComponent implements OnInit {

  @Input() input_solicitud;
 
  tipoDoc: number = null;
  lsTipoDoc: any[] = [];
  tipoComp: number = 0;
  lsNivelEdu: any[] = [];
  lsOcupacion: any[] = [];
  lsUnidadTiempo: any [] = Constantes.unidadDeTiempo;
  objTipoDoc: any = null;
  objNivelEdu: any = null;
  nivedu: number = null;
  objOcupacion: any = null;
  ocupacion: number = null;

  objPostulante: any = null;


  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    
  ) { }

    postulante: Postulante = new Postulante();
  //postulante: any = new Postulante();


  ngOnInit() {
    //this.lsUnidadTiempo=Constantes.unidadDeTiempo;
    // this.lsUnidadTiempo();
    this.iniciarListasDatos();
    this.obtenerNivelEducativo();
    this.obtenerOcupacion();
  }

  close(){
    this.activemodal.dismiss('Cancelado')
  }
 
  continuar(){
    this.armarObjeto();
    const objconfirmar = this.modalService.open(ConfirmarpostulanteComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalConfirmar'
    });
    objconfirmar.componentInstance.input_solicitud = this.objPostulante;
    objconfirmar.result.then((result) => {
	//this.activemodal.dismiss('Cancelado')
    }, (reason) => {
	 this.activemodal.dismiss('Cancelado')
    });
  }

  iniciarListasDatos() {
    this.postulanteService.listarTipoDoc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

  }

  obtenerNivelEducativo() {
    this.postulanteService.listarNivelEdu().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEdu = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerOcupacion() {
    this.postulanteService.listarOcupacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsOcupacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  armarObjeto(){

    this.postulante.nombres= this.postulante.nombres.replace(/\s*$/, "");
    this.postulante.ape_materno= this.postulante.ape_materno.replace(/\s*$/, "");
    this.postulante.ape_paterno= this.postulante.ape_paterno.replace(/\s*$/, "");
    this.objTipoDoc= { "idTipoDoc": this.tipoDoc };
    this.objNivelEdu = { "idNivelEdu": this.nivedu };
    this.objOcupacion = { "idOcupacion": this.ocupacion };

    this.objPostulante={
      "postulante":this.postulante,
      "tipoDoc": this.objTipoDoc,
      "nivelEdu": this.objNivelEdu,
      "ocupacion": this.objOcupacion
    }

  }

}
