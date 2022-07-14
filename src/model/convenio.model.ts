import {AbstractEntityModel} from "@/model/abstract-entity.model";

export class Convenio extends AbstractEntityModel{
    nome! : string
    valor! : number

    constructor() {
        super();
        this.valor = 0.0
    }
}