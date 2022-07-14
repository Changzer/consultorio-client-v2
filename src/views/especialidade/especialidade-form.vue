<template>

  <div class="columns">
    <div class="column is-12 is-size-3">
      Modo: {{this.modoVisualizacao}}
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
        <input v-model="especialidade.ativo" disabled checked type="checkbox">
        Ativar Especialidade
      </label>
    </div>
  </div>
  <div class="columns" v-else>
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="especialidade.ativo" checked type="checkbox">
        Ativar Especialidade
      </label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="especialidade.nome"
               :readonly="modoVisualizacao === 'detalhar'" placeholder="Nome da Especialidade">
      </div>
    </div>
  </div>

  <hr/>

  <div class="columns" v-if="modoVisualizacao === 'editar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/especialidade/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickEditar()">Salvar Alterações</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao === 'detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/especialidade/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickSairModoDetalhar()">Editar</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao === 'cadastrar'">
    <div class="column is-8"></div>
    <div class="column is-2">
      <router-link to="/especialidade/listar">
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
import {Prop} from 'vue-property-decorator/lib'
import {Especialidade} from '@/model/especialidade.model'
import {Notification} from '@/model/notification'
import {EspecialidadeClient} from '@/client/especialidade.client'

export default class EspecialidadeForm extends Vue {
  private modoVisualizacao = 'detalhar'
  private especialidadeClient!: EspecialidadeClient
  private especialidade: Especialidade = new Especialidade()
  private notification: Notification = new Notification()

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string

  public mounted(): void {
    this.especialidadeClient = new EspecialidadeClient()
    this.carregarEspecialidade()
  }

  private onClickSairModoDetalhar(): void {
    this.modoVisualizacao = 'editar'
  }

  private onClickCadastrar(): void {

    this.especialidadeClient.cadastrar(this.especialidade)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + success)
              console.log(this.especialidade)
              this.onClickLimpar()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
              console.log(this.especialidade)
              this.onClickLimpar()
            })
  }

  private onClickEditar(): void {
    this.especialidadeClient.editar(this.especialidade).then(success => {
      this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + success)
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickDeletar(): void {
    this.especialidadeClient.desativar(this.especialidade).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + sucess)
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private carregarEspecialidade(): void {
    if (this.model === 'detalhar') {
      this.especialidadeClient.findById(this.id).then(value => {
        this.especialidade = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickLimpar(): void {
    this.especialidade = new Especialidade()
  }

  // private created(): void { }
}
</script>