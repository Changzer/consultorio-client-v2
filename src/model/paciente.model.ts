import {PessoaModel} from "@/model/pessoa.model";
import {TipoAgendamento} from "@/model/tipoagendamento.enum";
import {Convenio} from "@/model/convenio.model";


export class Paciente extends PessoaModel {
    tipoAtendimento! : TipoAgendamento
    convenio! : Convenio
    numeroCartaoConvenio! : number
    dataVencimento! : Date
}