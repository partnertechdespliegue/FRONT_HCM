import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostulanteService } from '../../../../services/postulante/postulante.service';
import { Postulante } from '../../../../../../models/postulante';
import { TipoDoc } from '../../../../../../models/TipoDoc';
@Component({
  selector: 'app-confirmarpostulante',
  templateUrl: './confirmarpostulante.component.html',
  styles: []
})
export class ConfirmarpostulanteComponent implements OnInit {
  
  @Input() postulanteback;
  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private postulanteService: PostulanteService,
  ) { }

  postulante: Postulante = new Postulante();
  ngOnInit() {debugger
    this.postulante = this.postulanteback;
  }

  closer(){
    this.activemodal.dismiss('Cancel')
  }

  confirmar(){
    this.postulanteService.insertarPostulante(this.postulante).subscribe((resp: any) => {
    this.activemodal.dismiss('Cancelado');
    })
  }

}
