import {Paciente} from "@/model/paciente.model";
import {Medico} from "@/model/medico.model";
import {statusagenda} from "@/model/statusagenda.enum";

export class Agenda {
    id! : bigint
    paciente! : Paciente
    medico! : Medico
    statusagenda! : statusagenda
    dataDe! : Date
    dataAte! : Date
    encaixe! : boolean
}