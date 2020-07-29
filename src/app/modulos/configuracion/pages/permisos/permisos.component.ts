import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { TiposPermisoService } from '../../services/permisos/permisos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTipoPermisoComponent } from './modals/nuevo-permiso/nuevo-permiso.component';
import { NuevoTipoPermisoConfirmarComponent } from './modals/nuevo-permiso-confirmar/nuevo-permiso-confirmar.component';
import Constantes from '../../../../models/Constantes';

@Component({
    selector:'app-permisos',
    templateUrl: './permisos.component.html',
    styles: []
})
export class TiposPermisosComponent implements OnInit{
    
    empresa: Empresa = new Empresa();
    lsPermisos: any =[];
    constructor(
        public permisoService : TiposPermisoService,
        public modalService: NgbModal
    ) {}

    ngOnInit(){
        this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
        if(this.empresa!=null){
            this.listarDatos();
        }
    }

    listarDatos(){
        this.permisoService.listarPermisosPorEmpresa(this.empresa).subscribe((resp:any)=>{
            if(resp.estado==1){
                this.lsPermisos = resp.aaData;
            }
        })
    }

    actualizarPermiso(permiso){
        let tmp = Object.assign({},permiso);
        tmp.accion = Constantes.ACTUALIZAR;
        this.openModal(tmp);
    }

    nuevoTipoPermiso(){
        let indice= null;
        this.openModal(indice);
    }

    eliminarPermiso(permiso){
        let tmp = Object.assign({},permiso);
        tmp.accion = Constantes.ELIMINAR;
        this.openModal(tmp);
    }
    

    openModal(indice){
        if (indice == null || indice.accion!="D"){
            const modalRef = this.modalService.open(NuevoTipoPermisoComponent,
              {
                backdrop: 'static',
                keyboard: false,
                size: 'sm'
              }) 
              modalRef.componentInstance.input_permiso=indice;
              modalRef.result.then((result)=>{
              }, (reason) => {
              });
            } else{
              
              const modalRef = this.modalService.open(NuevoTipoPermisoConfirmarComponent,
                {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'sm'
                }
              );
              modalRef.componentInstance.input_permiso=indice;
              modalRef.result.then((result) => {
             }, (reason) => {
             });
        
            }
    }
}