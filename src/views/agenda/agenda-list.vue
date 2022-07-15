<template>

  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Agendamento
    </div>
  </div>

  <hr/>

  <div class="columns">
    <div class="column is-6">
      <input class="input" type="text" placeholder="Nome do Paciente">
    </div>
    <div class="column is-3">
      <router-link to="/agenda/form">
        <button class="button is-fullwidth">Novo Agendamento</button>
      </router-link>
    </div>
  </div>

  <hr/>

  <table class="table table is-fullwidth tabela">
    <thead class="green">
    <tr style="background: darkblue; border-color: darkblue">
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Paciente</th>
      <th style="color: #fff;">Medico</th>
      <th style="color: #fff;">Status</th>
      <th style="color: #fff;">Data</th>
      <th style="color: #fff;">Encaixe</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in agendaList" :key="item.id">
      <th>{{ item.id }}</th>
      <th>{{ item.paciente }}</th>
      <th>{{ item.medico }}</th>
      <th>{{ item.statusagenda }}</th>
      <th>{{ item.dataDe }}</th>
      <th>{{ item.encaixe }}</th>
    </tr>
    </tbody>
  </table>

</template>


<script lang="ts">
import {Vue} from 'vue-class-component';
import {PageRequest} from '@/model/page/page-request'
import {PageResponse} from '@/model/page/page-response'

import {Agenda} from '@/model/agenda.model'
import {AgendaClient} from '@/client/agenda.client'

export default class AgendaList extends Vue{
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Agenda> = new PageResponse()

  private agendaList: Agenda[] = []
  private agendaClient!: AgendaClient

  public mounted(): void {
    this.agendaClient = new AgendaClient()
    this.listarAgenda()
  }

  private listarAgenda(): void {
    this.agendaClient.findByFiltrosPaginado(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.agendaList = this.pageResponse.content
              console.log(this.agendaList)
            },
            error => console.log(error)
        )
  }

}
</script>

<style scoped>

</style>