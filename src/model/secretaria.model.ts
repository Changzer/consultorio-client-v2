import {PessoaModel} from "@/model/pessoa.model";

export class SecretariaModel extends PessoaModel{
    salario! : number
    datacontratacao!: Date
    pis! : string
}