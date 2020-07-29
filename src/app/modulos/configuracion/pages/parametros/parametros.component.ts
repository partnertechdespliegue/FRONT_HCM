import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoParametroComponent } from './modals/nuevo-parametro/nuevo-parametro.component';
import { ParametroService } from '../../services/parametro/parametro.service';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { ConfirmarNuevoParametroComponent } from './modals/confirmar-nuevo-parametro/confirmar-nuevo-parametro.component';
import Constantes from '../../../../models/Constantes';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styles: []
})
export class ParametrosComponent implements OnInit, OnDestroy {

  lsParametros:  any[] = [];
  public empresa: Empresa = new Empresa();
  modalRef:NgbModalRef;

  constructor(
    public parametroService: ParametroService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  val1: boolean = false;
  val2: boolean = true;

  ngOnInit() { 
    var tmp : any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if(tmp!=null){
      this.empresa.idEmpresa=tmp.idEmpresa;
      this.listarParametrosEmpresa();
    }
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  setearValor(){
    for (let parametro of this.lsParametros){
      // tslint:disable-next-line:no-unused-expression
      parametro.tmp_valor
    }

  }
  

  public listarParametrosEmpresa(){
    
    var empresa={
      "idEmpresa": this.empresa.idEmpresa
    }
    this.parametroService.listarParametrosEmpresa(empresa).subscribe(resp => {
      if(resp.estado==1){
        this.lsParametros=resp.aaData;
      }else{
        Swal.fire('Error en la transaccion => listarTipodocumento()',resp.msg , 'error');
      }
    });
  }


  public actualizarCategoria(parametro_u){
    var tmp_par=Object.assign({},parametro_u);
    tmp_par.accion=Constantes.ACTUALIZAR;
    this.openModal(tmp_par);
  }

  public openModal(indice) {
    if (indice.accion!="D"){
      this.modalRef = this.modalService.open(NuevoParametroComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }) 
        this.modalRef.componentInstance.input_parametro=indice;
        this.modalRef.result.then((result)=>{
        }, (reason) => {
        });
      } else{
        
        this.modalRef = this.modalService.open(ConfirmarNuevoParametroComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modalMD'
          }
        );
        this.modalRef.componentInstance.input_parametro=indice;
        this.modalRef.result.then((result) => {
       }, (reason) => {
       });
  
      }
  }

}
