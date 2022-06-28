import {Pessoa} from "@/model/pessoa";
import {TipoAgendamento} from "@/model/tipoagendamento.enum";
import {Convenio} from "@/model/convenio";


export class Paciente extends Pessoa {
    tipoAtendimento! : TipoAgendamento
    convenio! : Convenio
    numeroCartaoConvenio! : number
    dataVencimento! : Date
}