import {PessoaModel} from "@/model/pessoa.model";

export class Secretaria extends PessoaModel{
    salario! : number
    datacontratacao!: Date
    pis! : string
}