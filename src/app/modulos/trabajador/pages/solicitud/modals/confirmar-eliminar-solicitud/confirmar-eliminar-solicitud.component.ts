import { Component, OnInit, Input } from '@angular/core';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Solicitud } from '../../../../../../models/Solicitud';

@Component({
  selector: 'app-confirmar-eliminar-solicitud',
  templateUrl: './confirmar-eliminar-solicitud.component.html',
  styles: []
})
export class ConfirmarEliminarSolicitudComponent implements OnInit {

  @Input() input_solicitudDto;

  constructor(
    public solicitudService: SolicitudService,
    public activemodal: NgbActiveModal,
    public router: Router
  ) { }

  solicitudDto: any;

  public solicitud:any = new Solicitud(); 

  ngOnInit() {
    this.solicitud = this.input_solicitudDto;
    
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud(){
    switch(this.solicitud.accion){
      
      case Constantes.CANCELARSOLICITUD : this.cancelarSolicitud();
      break;
      
    }
  }
  cancelarSolicitud() {
    this.solicitudService.cancelarSolicitud(this.solicitud).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

  

}
