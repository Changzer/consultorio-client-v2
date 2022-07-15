<template>

  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Convenios
    </div>
  </div>

  <hr/>

  <div class="columns">
    <div class="column is-6">
      <input class="input" type="text" placeholder="Nome do Convenio">
    </div>
    <div class="column is-2">
      <router-link to="/convenio/form">
        <button class="button is-fullwidth">Cadastrar</button>
      </router-link>
    </div>
  </div>

  <hr/>

  <table class="table table is-fullwidth tabela">
    <thead class="green">
    <tr style="background: darkblue; border-color: darkblue">
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Ativo</th>
      <th style="color: #fff;">Convenio</th>
      <th style="color: #fff;">Valor</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in conveniosList" :key="item.id">
      <th>{{ item.id }}</th>

      <th>
        <span v-if="item.ativo == true" class="tag is-success"> Ativo </span>
        <span v-if="!item.ativo" class="tag is-danger"> Inativo </span>
      </th>

      <th>{{ item.nome }}</th>
      <th>
        <button @click="onClickPaginaDetalhar(item.id)" class="button is-small is-warning"> Detalhar</button>
      </th>
    </tr>
    </tbody>
  </table>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {PageRequest} from '@/model/page/page-request'
import {PageResponse} from '@/model/page/page-response'

import {Convenio} from '@/model/convenio.model'
import {ConveniosClient} from '@/client/convenios.client'

export default class ConvenioList extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Convenio> = new PageResponse()

  private conveniosList: Convenio[] = []
  private convenioClient!: ConveniosClient

  public mounted(): void {
    this.convenioClient = new ConveniosClient()
    this.listarConvenios()
  }

  private listarConvenios(): void {
    this.convenioClient.findByFiltrosPaginado(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.conveniosList = this.pageResponse.content
              console.log(this.conveniosList)
            },
            error => console.log(error)
        )
  }

  private onClickPaginaDetalhar(idConvenio: number) {
    this.$router.push({name: 'convenio-detalhar', params: {id: idConvenio, model: 'detalhar'}})
  }
}
</script>