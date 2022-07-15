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
        <input v-model="secretaria.ativo" disabled checked type="checkbox">
        Ativar secretaria
      </label>
    </div>
  </div>
  <div class="columns" v-else>
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="secretaria.ativo" checked type="checkbox">
        Ativar secretaria
      </label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.nome"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nome do Secretaria">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Telefone</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.telefone"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Telefone do Secretaria">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Celular</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.celular"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Celular do Secretaria">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Nacionalidade</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.nacionalidade"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nacionalidade da Secretaria">
      </div>
    </div>
    <div class="column is-6">
      <label class="label">Sexo</label>
      <div class="select is-fullwidth">
        <select class="input is-primary" v-model="secretaria.sexo" disabled v-if="modoVisualizacao === 'detalhar'">
          <option>Entre no modo de Edição</option>
        </select>
        <select class="input is-primary" v-model="secretaria.sexo" v-else>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
          <option value="OUTROS">Outros</option>
        </select>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">CPF</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.cpf" placeholder="CPF do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">RG</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.rg" placeholder="RG do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Email</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.email" placeholder="Email do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Login</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.login" placeholder="Login do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="secretaria.senha" placeholder="Senha do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Salario</label>
      <input class="input is-primary" type="number" v-model="secretaria.salario" placeholder="Salario da Secretaria"
             :readonly="modoVisualizacao === 'detalhar'">
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Data de Contratação</label>
      <input class="input is-primary" type="datetime-local" v-model="secretaria.dataContracacao" placeholder="Data de Contratação
       da Secretaria" :readonly="modoVisualizacao === 'detalhar'">
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">PIS</label>
      <input class="input is-primary" type="text" v-model="secretaria.pis" placeholder="PIS da Secretaria"
             :readonly="modoVisualizacao === 'detalhar'">
    </div>
  </div>

  <div class="columns" v-if="modoVisualizacao === 'detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/secretaria/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickSairModoDetalhar()">Modo de edição</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao === 'editar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/secretaria/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success " @click="onClickEditar()">Salvar Alterações
      </button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao === 'cadastrar'">
    <div class="column is-8"></div>
    <div class="column is-2">
      <router-link to="/secretaria/listar">
        <button class="button is-fullwidth">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-success" @click="onClickCadastrar()">Cadastrar</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component'
import {Secretaria} from "@/model/secretaria.model";
import {Notification} from "@/model/notification";
import {SecretariaClient} from "@/client/secretaria.client";
import {Prop} from "vue-property-decorator";

export default class SecretariaForm extends Vue {
  private secretariaClient!: SecretariaClient
  private secretaria: Secretaria = new Secretaria()
  private notification: Notification = new Notification()

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string
  private modoVisualizacao = 'detalhar'

  public mounted(): void {
    this.secretariaClient = new SecretariaClient()
    this.carregarSecretaria()
  }

  private onClickSairModoDetalhar(): void {
    this.modoVisualizacao = 'editar'
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickCadastrar(): void {
    this.secretariaClient.cadastrar(this.secretaria).then(
        sucesso => {
          this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + sucesso)
          console.log(this.secretaria)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger', 'Error' + error)
          console.log(this.secretaria)
          console.error(error)
        }
    )
  }


  private onClickEditar(): void {
    this.secretariaClient.editar(this.secretaria).then(sucesso => {
      this.notification = this.notification.new(true, 'notification is-success', 'Sucesso' + sucesso)
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickDeletar(): void {
    this.secretariaClient.desativar(this.secretaria).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + sucess)
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickLimpar(): void {
    this.secretaria = new Secretaria()
  }

  private carregarSecretaria(): void {
    if (this.model === 'detalhar') {
      this.secretariaClient.findById(this.id).then(value => {
        this.secretaria = value
      }).catch(error => {
        this.notification = error
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }
}
</script>

<style scoped>

</style>