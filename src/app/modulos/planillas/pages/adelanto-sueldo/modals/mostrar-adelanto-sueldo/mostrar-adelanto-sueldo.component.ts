import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-adelanto-sueldo',
  templateUrl: './mostrar-adelanto-sueldo.component.html',
  styles: []
})
export class MostrarAdelantoSueldoComponent implements OnInit {

  @Input() input_trabajador;

  trabajador: Trabajador = new Trabajador();
  lsAdeSue: any[] = [];
  lsCuotas: any[] = [];
  expanded: boolean;
  selecArch:File;
  valor

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService, ) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
    this.listarAdeSue()
  }

  listarAdeSue() {
    this.planillasService.listarAdeSue(this.trabajador).subscribe((resp: any) => {
      this.lsAdeSue = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarNroCuotas(adeSue) { 
    this.planillasService.listarCuotas(adeSue).subscribe((resp: any) => {
      this.lsCuotas = resp.aaData;
      adeSue.lscuotas=this.lsCuotas;
    })
  }


  subirArchivo(archivo,adeSue){
    this.selecArch = archivo.target.files[0];
    this.cargarArchivo(adeSue)
}

cargarArchivo(adeSue){
  const idAdeSueldo=adeSue.idAdelantoSueldo
  this.planillasService.subirArchivoAdelantoSueldo(this.selecArch,idAdeSueldo).subscribe((resp:any)=>{
    if (resp.estado == 1) {
      Swal.fire(Constantes.SUCCESS,resp.msg,'success');
      this.listarAdeSue();
      } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
  })
}

}
