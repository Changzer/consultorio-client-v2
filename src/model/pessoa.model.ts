import { AbstractEntityModel } from "./abstract-entity.model";
import {Sexo} from "@/model/sexo.enum";

export class PessoaModel extends AbstractEntityModel{
    nome! : string
    telefone! : string
    nacionalidade! : string
    cpf! : string
    rg! : string
    email! : string
    login! : string
    senha! : string
    sexo! : Sexo
}