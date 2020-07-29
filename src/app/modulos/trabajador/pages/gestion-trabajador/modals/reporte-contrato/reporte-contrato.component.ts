import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-reporte-contrato',
  templateUrl: './reporte-contrato.component.html',
  styleUrls: []
})
export class ReporteContratoComponent implements OnInit {

  @Input() input_contrato;

  constructor(
    public activemodal : NgbActiveModal,
    public trabajadorService: TrabajadorService,
    ) { }

  objContrato: any = null;
  private selecArch: File;
  resEstado: number;

  ngOnInit() {

    this.objContrato = this.input_contrato;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  descargarContrato(){
    const trab=this.objContrato.trabajador;
    const dirArchivo = "Contrato"+"_"+trab.nroDoc+"_"+trab.apePater+"_"+trab.nombres+".docx";

    this.trabajadorService.descargarContrato(dirArchivo).subscribe((resp:any)=>{
      if (resp != null) {
        var file = new Blob([resp], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        saveAs(file, dirArchivo);
        Swal.fire(Constantes.SUCCESS,"Contrato descargado correctamente",'success');
        this.resEstado = 1;
        } else {
          Swal.fire(Constantes.ERROR,"Error al descargar Contrato",'error');
          this.resEstado = 2;
        }
    });
    this.activemodal.dismiss();
  }

  subirContrato(contrato){
    this.selecArch = contrato.target.files[0];
    this.cargarContrato();
  }

  cargarContrato(){
    const idTrab=this.objContrato.trabajador.idTrabajador
    this.trabajadorService.subirContrato(this.selecArch, idTrab).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.resEstado = 1;
        } else if(resp.estado == 2){
          Swal.fire(Constantes.WARNING,resp.msg,'warning');
          this.resEstado = 2;
        } else {
          Swal.fire(Constantes.ERROR,resp.msg,'error');
          this.resEstado = 3;
        }
    });
    this.activemodal.dismiss();
  }
}
