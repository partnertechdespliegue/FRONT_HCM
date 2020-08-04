import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarpostulanteComponent } from '../confirmarpostulante/confirmarpostulante.component';
import { Postulante } from '../../../../../../models/postulante';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PostulanteService } from '../../../../services/postulante/postulante.service';

@Component({
  selector: 'app-iu-reclutamiento',
  templateUrl: './iu-reclutamiento.component.html',
  styles: []
})
export class IuReclutamientoComponent implements OnInit {
 
  lsTipoDoc: any[] = [];
  tipoComp: number = 0;
  lsNivelEdu: any[] = [];
  lsOcupacion: any[] = [];
  lsUnidadTiempo= null;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    
  ) { }

  postulante: Postulante = new Postulante();

  ngOnInit() {
    this.lsUnidadTiempo=Constantes.unidadDeTiempo;
    // this.lsUnidadTiempo();
    this.iniciarListasDatos();
    this.obtenerNivelEducativo();
    this.obtenerOcupacion();
  }

  close(){
    this.activemodal.dismiss('Cancelado')
  }
 
  continuar(){debugger
    const objconfirmar = this.modalService.open(ConfirmarpostulanteComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalConfirmar'
    });
    objconfirmar.componentInstance.postulanteback = this.postulante;
    objconfirmar.result.then((result) => {
	this.activemodal.dismiss('Cancelado')
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

}
