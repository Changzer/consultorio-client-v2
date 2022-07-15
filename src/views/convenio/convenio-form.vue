<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Modo de visualização: {{ modoVisualizacao }}
    </div>
  </div>
  <hr/>
  <div class="columns" v-if="notification.ativo">
    <div class="column is-12">
      <div :class="notification.classe">
        <button @click="onClickFecharNotificacao()" class="delete"></button>
        {{ notification.mensagem }}
      </div>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao === 'detalhar'">
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="convenio.ativo" disabled checked type="checkbox">
        Ativar Convenio
      </label>
    </div>
  </div>
  <div class="columns" v-else>
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="convenio.ativo" checked type="checkbox">
        Ativar Convenio
      </label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="convenio.nome" :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nome do Convenio">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Custo</label>
      <div class="control">
        <input class="input is-primary" type="number" v-model="convenio.valor"
               :readonly="modoVisualizacao === 'detalhar'" placeholder="Custo do Convenio">
      </div>
    </div>
  </div>

  <hr/>

  <div class="columns" v-if="modoVisualizacao ==='detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/convenio/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickSairModoDetalhar()">Entrar no modo Editar</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDesativar()">Excluir</button>
    </div>
  </div>

  <div class="columns" v-if="modoVisualizacao ==='editar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/convenio/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickEditar()">Salvar Alterações</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDesativar()">Excluir</button>
    </div>
  </div>

  <div class="columns" v-if="modoVisualizacao === 'cadastrar'">
    <div class="column is-8"></div>
    <div class="column is-2">
      <router-link to="/convenio/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickCadastrar()">Cadastrar</button>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue} from 'vue-class-component';

import {Convenio} from "@/model/convenio.model";
import {Notification} from "@/model/notification";
import {ConvenioClient} from "@/client/convenio.client";
import {Prop} from "vue-property-decorator";

export default class ConvenioForm extends Vue {
  private convenioClient!: ConvenioClient
  private convenio: Convenio = new Convenio()
  private notification: Notification = new Notification()
  private modoVisualizacao = 'detalhar'

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string

  public mounted(): void {
    this.convenioClient = new ConvenioClient()
    this.carregarConvenio()
  }

  private onClickSairModoDetalhar(): void {
    this.modoVisualizacao = 'editar'
  }

  private onClickCadastrar(): void {
    this.convenioClient.cadastrar(this.convenio).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success',
              'Convenio foi Cadastrado com sucesso!!!')
          console.log(this.convenio)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger',
              'Error: ' + error)
          console.log(this.convenio)
          this.onClickLimpar()
        })
  }

  private carregarConvenio(): void {
    if (this.model === 'detalhar') {
      this.convenioClient.findById(this.id).then(value => {
        this.convenio = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }

  private onClickEditar(): void {
    this.convenioClient.editar(this.convenio).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'Convenio foi editado com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickDesativar(): void {
    this.convenioClient.desativar(this.convenio).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'Convenio foi desativado com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger',
          'Error: ' + error)
    })
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickLimpar(): void {
    this.convenio = new Convenio()
  }
}
</script>

<style scoped>

</style>