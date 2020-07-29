import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { HorarioService } from '../../services/horarios/horarios.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { Horario } from '../../../../models/Horario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoHorarioComponent } from './modals/nuevo-horario/nuevo-horario.component';



@Component({
    selector: 'app-horarios',
    templateUrl: './horarios.component.html',
    styles: []
})
export class HorariosComponent implements OnInit {

    empresa: Empresa = new Empresa();
    lsHorarios: any = [];
    horario: Horario = new Horario();

    constructor(
        public horarioService: HorarioService,
        public modalService: NgbModal
    ) { }

    ngOnInit() {
        this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
        if (this.empresa != null) {
            this.listarHorariosPorEmpresa();
        }

    }

    listarHorariosPorEmpresa() {
        this.horarioService.listarHorariosPorEmpresa(this.empresa).subscribe((resp: any) => {
            if (resp.estado == 1) {
                this.lsHorarios = resp.aaData;
            }
        },
            (error) => {
                Swal.fire(Constantes.ERROR, error.error, 'error');
            })
    }

    nuevoHorario() {
        let indice = null;
        this.openModal(indice);
    }

    public actualizarHorario(horario) {
        var tmp = Object.assign({},horario);
        tmp.accion = Constantes.ACTUALIZAR;
        this.openModal(tmp);
      }

    public openModal(indice) {

        const modalRef = this.modalService.open(NuevoHorarioComponent,
            {
                backdrop: 'static',
                keyboard: false,
                windowClass: 'modalMD'
            })
        modalRef.componentInstance.input_horario_final = indice;
        modalRef.result.then((result) => {
        }, (reason) => {
        });

    }

}