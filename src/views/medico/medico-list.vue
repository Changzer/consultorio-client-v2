<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Medicos
    </div>
  </div>
  <hr/>

  <div class="columns">
    <div class="column is-9">
      <input class="input" type="text" placeholder="Filtrar por Nome do Medico">
    </div>
    <div class="column is-3">
      <router-link to="/medico/form">
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
      <th style="color: #ffffff;">CRM</th>
      <th style="color: #ffffff;">celular</th>
      <th style="color: #ffffff;">telefone</th>
      <th style="color: #ffffff;">Outros</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in medicoList" :key="item.id">
      <td> {{ item.id }}</td>
      <td>
        <span v-if="item.ativo" class="tag is-success"> Ativo </span>
        <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
      </td>
      <td> {{ item.nome }}</td>
      <td>{{ item.crm }}</td>
      <td>{{ item.celular }}</td>
      <td>{{ item.telefone }}</td>
      <td>
        <button @click="onClickPaginaDetalhar(item.id)" class="button is-small is-warning"> Detalhar</button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {PageRequest} from "@/model/page/page-request";
import {PageResponse} from "@/model/page/page-response";

import {Medico} from "@/model/medico.model";
import {MedicoClient} from "@/client/medico.client";

export default class MedicoList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Medico> = new PageResponse<Medico>();

  private medicoList: Medico[] = []
  private medicoClient!: MedicoClient

  public mounted(): void {
    this.medicoClient = new MedicoClient()
    this.listarMedicos()
  }

  private listarMedicos(): void {
    this.medicoClient.findByFiltrosPaginado(this.pageRequest).then(
        success => {
          this.pageResponse = success
          this.medicoList = this.pageResponse.content
          console.log(this.medicoList)
        },
        error => console.log(error)
    )
  }

  private onClickPaginaDetalhar(idMedico: number) {
    this.$router.push({name: 'medico-detalhar', params: {id: idMedico, model: 'detalhar'}})
  }
}
</script>

<style scoped>

</style>