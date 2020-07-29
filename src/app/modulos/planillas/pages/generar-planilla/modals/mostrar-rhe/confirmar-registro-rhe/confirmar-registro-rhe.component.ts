import { Component, OnInit, Input } from '@angular/core';
import { PlanillasService } from '../../../../../services/planillas/planillas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajador } from '../../../../../../../models/Trabajador';
import { Año } from '../../../../../../../models/Año';
import { Mes } from '../../../../../../../models/Mes';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-registro-rhe',
  templateUrl: './confirmar-registro-rhe.component.html',
  styles: []
})
export class ConfirmarRegistroRheComponent implements OnInit {

@Input() input_Trab;
@Input() input_selecArch;

trabajador: Trabajador = new Trabajador();
ano: Año = new Año();
mes: Mes = new Mes();

selecArch:File;

  constructor(
    public planillasService: PlanillasService,
    public activemodal : NgbActiveModal
  ) { }

  ngOnInit() {
    
    this.selecArch=this.input_selecArch;
    this.trabajador = this.input_Trab;
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
  }

  cargarArchivo(){
    var idTrab=this.trabajador.idTrabajador;
    var idAno=this.ano.idPdoAno;
    var idMes=this.mes.idPdoMes;
    this.planillasService.registrarRHE(this.selecArch,idTrab,idAno,idMes).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        } else if(resp.estado == 2){
          Swal.fire(Constantes.WARNING,resp.msg,'warning');
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
    })
    this.activemodal.dismiss();
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

}
