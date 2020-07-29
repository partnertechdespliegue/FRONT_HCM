import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AnoMesService } from '../../services/anomes/anomes.service';
import { NuevoAnoComponent } from './modals/nuevo-ano/nuevo-ano.component';
import { Año } from '../../../../models/Año';
import { NuevoMesComponent } from './modals/nuevo-mes/nuevo-mes.component';
import { SelecDiasferiadoComponent } from './modals/selec-diasferiado/selec-diasferiado/selec-diasferiado.component';

@Component({
  selector: 'app-anomes',
  templateUrl: './anomes.component.html',
  styles: []
})
export class AnomesComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private anomesService: AnoMesService
  ) { }

  lsMeses: any[]=[];
  ano:Año = new Año();
  modalRef:NgbModalRef;


  ngOnInit() {
    this.listarMeses()
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  listarMeses(){
    this.anomesService.listarMeses().subscribe((resp:any) => {
      this.lsMeses = resp.aaData;
    });
  }

  nuevoAno(){
    let indice = null;
    this.openModal(indice);
  }

  seleccionarFeriados(mes){
    this.modalRef = this.modalService.open(SelecDiasferiadoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size:'sm'
      })
      this.modalRef.componentInstance.input_mes = mes;
      this.modalRef.result.then((result)=>{
      }, (reason) => {
      });
  }

  public openModal(indice){
    if(indice!=null){
      this.modalRef = this.modalService.open(NuevoMesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.componentInstance.input_mes = indice;
        this.modalRef.result.then((result)=>{
        }, (reason) => {
        });
    }else{
      this.modalRef = this.modalService.open(NuevoAnoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.result.then((result)=>{
        }, (reason) => {
        });
    }
    
  }

  agregarNoLaborable(){
  }

  actualizarMes(mes){
    let indice = mes;
    this.openModal(indice);
  }
}
