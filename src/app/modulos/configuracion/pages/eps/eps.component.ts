import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { Eps } from '../../../../models/Eps';
import { NuevoEpsComponent } from './modals/nuevo-eps/nuevo-eps.component';
import { EpsService } from '../../services/eps/eps.service';
import { ConfirmarNuevoEpsComponent } from './modals/confirmar-nuevo-eps/confirmar-nuevo-eps.component';
import Constantes from '../../../../models/Constantes';


@Component({
    selector: 'app-eps',
      templateUrl: './eps.component.html',
      styles: []
})
export class EpsComponent implements OnInit{
    
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private EpsService: EpsService
    ){ }
    
    empresa:Empresa = new Empresa();
    public listEps: Array<any> = [];
    public eps: Eps = new Eps();

    ngOnInit(){
        this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
        if(this.empresa!=null){
          this.listarEps(this.empresa);
        }
    }

    listarEps(empresa){
        this.EpsService.listarEps(empresa).subscribe((resp:any) => {
            this.listEps = resp.aaData;
          });
    }

    crearEps(){
        let indice = null;
        this.openModal(indice);
    }

    actualizarEps(eps_u){
        var tmp_eps=Object.assign({},eps_u);
        tmp_eps.accion=Constantes.ACTUALIZAR;
        this.openModal(tmp_eps);
    }

    eliminarEps(eps_u){
        var tmp_eps=Object.assign({},eps_u);
        tmp_eps.accion=Constantes.ELIMINAR;
        this.openModal(tmp_eps);
    }

    public openModal(indice){
        if (indice == null || indice.accion!="D"){
        const modalRef = this.modalService.open(NuevoEpsComponent,
          {
            backdrop: 'static',
            keyboard: false,
            size: 'sm'
          }) 
          modalRef.componentInstance.input_eps=indice;
          modalRef.result.then((result)=>{
          }, (reason) => {
          });
        } else{
          
          const modalRef = this.modalService.open(ConfirmarNuevoEpsComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'sm'
            }
          );
          modalRef.componentInstance.input_eps=indice;
          modalRef.result.then((result) => {
         }, (reason) => {
         });
    
        }
      }
}