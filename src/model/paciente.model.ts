import {PessoaModel} from "@/model/pessoa.model";
import {TipoAgendamento} from "@/model/tipoagendamento.enum";
import {ConvenioModel} from "@/model/convenio.model";


export class PacienteModel extends PessoaModel {
    tipoAtendimento! : TipoAgendamento
    convenio! : ConvenioModel
    numeroCartaoConvenio! : number
    dataVencimento! : Date
}