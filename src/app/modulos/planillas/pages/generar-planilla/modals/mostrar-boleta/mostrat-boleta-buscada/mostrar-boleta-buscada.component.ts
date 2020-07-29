import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Planilla } from '../../../../../../../models/Planilla';
import { PrevisualizacionPlanillaComponent } from '../../previsualizacion-planilla/previsualizacion-planilla.component';
import { EliminarBoletaComponent } from '../../eliminar-boleta/eliminar-boleta.component';



@Component({
    selector: 'app-mostrar-boleta-buscada',
    templateUrl: './mostrar-boleta-buscada.component.html',
    styles : []
})
export class MostrarBoletaBuscadaComponent implements OnInit{
    
    @Input() input_planilla;

    public planilla: any = new Planilla();

    constructor(
        public activemodal : NgbActiveModal,
        private modalService: NgbModal
    ){}
    
    ngOnInit(){
        this.planilla = this.input_planilla;
    }

    previsualizarPlanilla(){
        const modalRef = this.modalService.open(PrevisualizacionPlanillaComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'lg'
            }
          );
          modalRef.componentInstance.input_planilla_historica=this.planilla;
          modalRef.result.then((result) => {
         }, (reason) => {
         });
    }

    eliminarPlanilla(){
        const modalRef = this.modalService.open(EliminarBoletaComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'sm'
            }
          );
          modalRef.componentInstance.input_planilla=this.planilla;
          modalRef.result.then((result) => {
         }, (reason) => {
            this.activemodal.dismiss();
         });
    }

    close(){
        this.activemodal.dismiss('Cancelado');
      }


}
