<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Pacientes
    </div>
  </div>

  <hr/>

  <div class="columns">
    <div class="column is-9">
      <input class="input" type="text" placeholder="Nome do Paciente">
    </div>
    <div class="column is-3">
      <router-link to="/paciente/form">
        <button class="button is-fullwidth">Cadastrar</button>
      </router-link>
    </div>
  </div>

  <table class="table table is-fullwidth tabela">
    <thead class="green">
    <tr style="background: hsl(0deg, 0%, 29%); border-color: black">
      <th style="color: #ffffff;">ID</th>
      <th style="color: #ffffff;">Ativo</th>
      <th style="color: #ffffff;">Nome</th>
      <th style="color: #ffffff;">RG</th>
      <th style="color: #ffffff;">email</th>
      <th style="color: #ffffff;">celular</th>
      <th style="color: #ffffff;">telefone</th>
      <th style="color: #ffffff;">Outros</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in pacienteList" :key="item.id">
      <td> {{item.id}}</td>
      <th>
        <span v-if="item.ativo" class="tag is-success"> Ativo </span>
        <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
      </th>
      <td> {{item.nome}}</td>
      <td> {{item.rg}}</td>
      <td> {{item.email}}</td>
      <td> {{item.celular}}</td>
      <td> {{item.telefone}}</td>
      <th>
        <button @click="onClickPaginaDetalhar(item.id)" class="button is-small is-warning"> Detalhar</button>
      </th>
    </tr>
    </tbody>
  </table>


</template>

<script  lang="ts">
import {Vue} from 'vue-class-component';
import {PageRequest} from '@/model/page/page-request'
import {PageResponse} from '@/model/page/page-response'

import { Paciente } from "@/model/paciente.model";
import { PacienteClient } from "@/client/paciente.client";

export default class PacienteList extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Paciente> = new PageResponse<Paciente>()

  private pacienteList: Paciente[] = []
  private pacienteClient!: PacienteClient

  public mounted(): void {
    this.pacienteClient = new PacienteClient()
    this.listarPacientes()
  }
  private listarPacientes(): void {
    this.pacienteClient.findByFiltrosPaginado(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.pacienteList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }
  private onClickPaginaDetalhar(idPaciente: number) {
    this.$router.push({name: 'paciente-detalhar', params: {id: idPaciente, model: 'detalhar'}})
  }
}

</script>

<style scoped>

</style>