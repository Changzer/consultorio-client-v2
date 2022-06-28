import {Especialidade} from "@/model/especialidade";
import {Pessoa} from "@/model/pessoa";


export class Medico extends Pessoa{
    crm! : string
    porcentagemparticipacao! : number
    consultorio! : string
    especialidade! : Especialidade


}