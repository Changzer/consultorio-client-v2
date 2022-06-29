import {EspecialidadeModel} from "@/model/especialidade.model";
import {PessoaModel} from "@/model/pessoa.model";


export class Medico extends PessoaModel{
    crm! : string
    porcentagemparticipacao! : number
    consultorio! : string
    especialidade! : EspecialidadeModel


}