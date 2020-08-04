import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef,  } from '@ng-bootstrap/ng-bootstrap';
import { IuReclutamientoComponent } from './modals/iu-reclutamiento/iu-reclutamiento.component';

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styles: []
})
export class ReclutamientoComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public activemodal: NgbActiveModal,
  ) { }

  ngOnInit() {debugger
    this.lsReclutamiento();
  }

  lsReclutamiento(){debugger
  
  }

  NuevoReclutamiento(){
    const objreclutamiento = this.modalService.open(IuReclutamientoComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalReclutamiento'
    });
    objreclutamiento.result.then((result) => {
    }, (reason) => {
    });
  }
  


}
