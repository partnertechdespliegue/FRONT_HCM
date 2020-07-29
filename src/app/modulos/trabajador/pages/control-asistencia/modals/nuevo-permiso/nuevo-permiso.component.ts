import { Component, OnInit, Input } from '@angular/core';
import { Permiso } from '../../../../../../models/Permiso';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { DatePipe } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import Constantes from '../../../../../../models/Constantes';
import { TiposPermisoService } from '../../../../../configuracion/services/permisos/permisos.service';
import Swal from 'sweetalert2';

@Component({
    selector:'app-nuevo-permiso',
    templateUrl: './nuevo-permiso.component.html',
    styles:[]
})
export class NuevoPermisoComponent implements OnInit{
    
    permiso: Permiso = new Permiso();
    lsTipoPermiso: any = [];
    
    @Input() input_trabajador;
    @Input() input_permiso;
    
    public minDate: Date 
    public maxDate: Date
    trabajador: any;
    idTipoPermiso: number;
    tipoPermiso: any;
    pdoAno: Año = new Año();
    pdoMes: Mes = new Mes();
    pipe = new DatePipe('es-PE');

    constructor(
        public activemodal: NgbActiveModal,
        public router: Router,
        public permisoService: PermisoService,
        public tipoPermisoService: TiposPermisoService
    ) {}

    ngOnInit(){
        this.pdoAno = JSON.parse(localStorage.getItem("anoSeleccion"));
        this.pdoMes = JSON.parse(localStorage.getItem("mesSeleccion"));
        this.trabajador = this.input_trabajador;
        if(this.input_permiso!=null){
            this.permiso = this.input_permiso;
            this.trabajador = this.input_permiso.trabajador;
        }else{
            this.permiso.fechaIni = new Date();
        }
        var fecha1 = `${this.pdoMes.idPdoMes}/1/${this.pdoAno.descripcion}`;
        var fecha2 = `12/31/2029`;
        this.minDate = new Date(fecha1)
        this.maxDate = new Date(fecha2)
        this.listarTiposPermiso();
    }

    close() {
        this.activemodal.dismiss('Cancelado');
      }
    
      public refrescar(url) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([url]));
    }

    crud(){

       if(this.input_permiso!=null){
           this.actualizarPermiso();
       }else{
           if(this.input_trabajador.accion==Constantes.REGISTRAR){
               this.buscarFechaSiExiste();    
           }
       }
    }

    listarTiposPermiso(){
        this.tipoPermisoService.listarPermisosPorEmpresa(this.trabajador.empresa).subscribe((resp:any)=>{
            this.lsTipoPermiso = resp.aaData;
            if(this.input_permiso!=null){
                this.idTipoPermiso = this.input_permiso.tipoPermiso.idTipoPermiso;
            }

        })
    }

    actualizarPermiso(){
        var tmp = this.asignarObjetos();
        this.permisoService.actualizarPermiso(tmp).subscribe((resp:any)=>{
            if(resp.estado==1){
                Swal.fire(Constantes.SUCCESS,resp.msg,'success');
                this.activemodal.close();
                this.refrescar(this.router.url)
            }else{
                Swal.fire(Constantes.ERROR,resp.msg,'error');
                this.activemodal.dismiss();
            }   
        })
    }

    registrarPermiso(tmp){
        this.permisoService.registrarPermiso(tmp).subscribe((res:any)=>{
            Swal.fire(Constantes.SUCCESS,res.mensaje,'success')
            this.activemodal.close();
        },
        (err)=>{
            this.activemodal.dismiss('error')
        })
    }

    buscarFechaSiExiste(){
        var tmp = this.asignarObjetos();
        this.permisoService.buscarFecha(tmp).subscribe((resp:any)=>{
            if(resp.defaultObj){
                Swal.fire(Constantes.INFO,'Ya ha sido registrada una permiso en esta fecha para este trabajador','info');
            }else{
                this.registrarPermiso(tmp);
            }
        })
    }

    llenarDropdown(){
        this.lsTipoPermiso.forEach(value=>{
            if(value.idTipoPermiso == this.idTipoPermiso){
                this.tipoPermiso = value;
            }
        })
    }
    asignarObjetos(): any{
      
        this.llenarDropdown();
        
        var tmp = {
           "idPermiso":this.permiso.idPermiso,
           "fechaIni": this.permiso.fechaIni,
           "tipoPermiso":this.tipoPermiso,
           "pdoAno":this.pdoAno,
           "pdoMes":this.pdoMes,
           "trabajador": this.trabajador
       }
       return tmp;
   }
}