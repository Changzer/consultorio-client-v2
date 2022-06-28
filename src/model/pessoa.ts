import { AbstractEntity } from "./abstract-entity";
import {Sexo} from "@/model/sexo.enum";

export class Pessoa extends AbstractEntity{
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