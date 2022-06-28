import {Paciente} from "@/model/paciente";
import {Medico} from "@/model/medico";
import {statusagenda} from "@/model/statusagenda.enum";

export class agenda {
    paciente! : Paciente
    medico! : Medico
    statusagenda! : statusagenda
    dataDe! : Date
    dataAte! : Date
    encaixe! : boolean
}