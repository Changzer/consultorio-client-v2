import {PacienteModel} from "@/model/paciente.model";
import {Medico} from "@/model/medico.model";
import {statusagenda} from "@/model/statusagenda.enum";

export class agendaModel {
    paciente! : PacienteModel
    medico! : Medico
    statusagenda! : statusagenda
    dataDe! : Date
    dataAte! : Date
    encaixe! : boolean
}