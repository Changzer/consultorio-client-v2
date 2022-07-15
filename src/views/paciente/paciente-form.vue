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
        <input v-model="paciente.ativo" disabled checked type="checkbox">
        Ativar paciente
      </label>
    </div>
  </div>
  <div class="columns" v-else>
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="paciente.ativo" checked type="checkbox">
        Ativar paciente
      </label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.nome" :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nome do Paciente">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Telefone</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.telefone"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Telefone do Paciente">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Celular</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.celular"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Celular do Paciente">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Nacionalidade</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.nacionalidade"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nacionalidade do Paciente">
      </div>
    </div>
    <div class="column is-6">
      <label class="label">Sexo</label>
      <div class="select is-fullwidth">
        <select class="input is-primary" v-model="paciente.sexo" disabled v-if="modoVisualizacao === 'detalhar'">
          <option>Entre no modo de Edição</option>
        </select>
        <select class="input is-primary" v-model="paciente.sexo" v-else>
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
        <input class="input is-primary" type="text" v-model="paciente.cpf" placeholder="CPF do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">RG</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.rg" placeholder="RG do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>


  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Email</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.email" placeholder="Email do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Login</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.login" placeholder="Login do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.senha" placeholder="Senha do Paciente"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6">
      <label class="label">Tipo de Atendimento</label>
      <div class="select is-fullwidth">
        <select v-if="modoVisualizacao === 'detalhar'">
          <option> Entre no Modo de Edição</option>
        </select>
        <select class="input is-primary" v-model="paciente.tipoAtendimento" v-else>
          <option value="PARTICULAR">Particular</option>
          <option value="CONVENIO">Convenio</option>
        </select>
      </div>
    </div>
    <div class="column is-6">
      <label class="label">Convenio</label>
      <div class="select is-fullwidth">
        <select class="input is-primary" v-if="modoVisualizacao === 'detalhar'">
          <option>Modo Detalhar</option>
        </select>
        <select class="input is-primary" v-model="paciente.convenio" v-else>
          <option :value="item" v-for="item in conveniosList" :key="item.id">{{ item.nome }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Numero do Cartao do Convenio</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="paciente.numeroCartaoConvenio"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero do Cartao do Convenio">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Data de Vencimento</label>
      <div class="control">
        <input class="input is-primary" type="datetime-local" v-model="paciente.dataVencimento"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Data de Vencimento">
      </div>
    </div>
  </div>
  <div class="columns" v-if="modoVisualizacao==='detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/paciente/listar">
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
  <div class="columns" v-if="modoVisualizacao==='editar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/paciente/listar">
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
      <router-link to="/paciente/listar">
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
import {Paciente} from "@/model/paciente.model";
import {Notification} from "@/model/notification";
import {PacienteClient} from "@/client/paciente.client";
import {PageRequest} from '@/model/page/page-request'
import {PageResponse} from '@/model/page/page-response'
import {Convenio} from '@/model/convenio.model'
import {ConvenioClient} from '@/client/convenio.client'
import {Prop} from "vue-property-decorator";


export default class PacienteForm extends Vue {
  private pacienteClient!: PacienteClient
  private paciente: Paciente = new Paciente()
  private notification: Notification = new Notification()
  private conveniosList: Convenio[] = []
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Convenio> = new PageResponse<Convenio>()
  private convenioClient!: ConvenioClient
  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string
  private modoVisualizacao = 'detalhar'

  public mounted(): void {
    this.pacienteClient = new PacienteClient()
    this.convenioClient = new ConvenioClient()
    this.carregarPaciente()
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

  private onClickSairModoDetalhar(): void {
    this.modoVisualizacao = 'editar'
  }

  private onClickCadastrar(): void {
    this.pacienteClient.cadastrar(this.paciente).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success', 'Paciente foi Cadastrado com sucesso!!!')
          console.log(this.paciente)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
          console.log(this.paciente)
        })
  }

  private onClickEditar(): void {
    this.pacienteClient.editar(this.paciente).then(success => {
      this.notification = this.notification.new(true, 'notification is-success', 'Paciente foi Editado com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private carregarPaciente(): void {
    if (this.model === 'detalhar') {
      this.pacienteClient.findById(this.id).then(value => {
        this.paciente = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }


  private onClickDeletar(): void {
    this.pacienteClient.desativar(this.paciente).then(success => {
      this.notification = this.notification.new(true, 'notification is-success', 'Paciente foi Desativada com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickLimpar(): void {
    this.paciente = new Paciente()
  }
}
</script>

<style scoped>

</style>