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
        <input v-model="medico.ativo" disabled checked type="checkbox">
        Ativar medico
      </label>
    </div>
  </div>
  <div class="columns" v-else>
    <div class="column is-12 is-size-3">
      <label class="label">
        <input v-model="medico.ativo" checked type="checkbox">
        Ativar medico
      </label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.nome"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nome do medico">
      </div>
    </div>
  </div>


  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Telefone</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.telefone"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Telefone do medico">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Celular</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.celular"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Numero de Celular do medico">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Nacionalidade</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.nacionalidade"
               :readonly="modoVisualizacao === 'detalhar'"
               placeholder="Nacionalidade do medico">
      </div>
    </div>
    <div class="column is-6">
      <label class="label">Sexo</label>
      <div class="select is-fullwidth">
        <select class="input is-primary" v-model="medico.sexo"
                disabled v-if="modoVisualizacao === 'detalhar'">
          <option>Entre no modo de Edição</option>
        </select>
        <select class="input is-primary" v-model="medico.sexo" v-else>
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
        <input class="input is-primary" type="text" v-model="medico.cpf"
               placeholder="CPF do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6">
      <label class="label">Especialidade</label>
      <div class="select is-fullwidth">
        <select class="input is-primary" v-if="modoVisualizacao === 'detalhar'">
          <option>Modo Detalhar</option>
        </select>
        <select class="input is-primary" v-model="medico.especialidade" v-else>
          <option :value="item" v-for="item in especialidadeList" :key="item.id">{{ item.nome }}</option>
        </select>
      </div>
    </div>
  </div>


  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Email</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.email"
               placeholder="Email do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Login</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.login"
               placeholder="Login do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.senha"
               placeholder="Senha do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">CRM</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.crm"
               placeholder="CRM do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">Porcentagem de Partificipação</label>
      <div class="control">
        <input class="input is-primary" type="number" v-model="medico.porcentParticipacao"
               placeholder="Porcentagem de partifipacao do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-6 is-size-3">
      <label class="label">Consultorio do Medico</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.consultorio"
               placeholder="RG do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
    <div class="column is-6 is-size-3">
      <label class="label">RG</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="medico.rg"
               placeholder="Consultorio do medico"
               :readonly="modoVisualizacao === 'detalhar'">
      </div>
    </div>
  </div>


  <div class="columns" v-if="modoVisualizacao==='detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/medico/listar">
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
      <router-link to="/medico/listar">
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
      <router-link to="/medico/listar">
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
import {Medico} from "@/model/medico.model";
import {Notification} from "@/model/notification";
import {MedicoClient} from "@/client/medico.client";
import {PageResponse} from "@/model/page/page-response";
import {PageRequest} from "@/model/page/page-request";
import {Especialidade} from "@/model/especialidade.model";
import {EspecialidadeClient} from "@/client/especialidade.client";
import {Prop} from 'vue-property-decorator'


export default class MedicoForm extends Vue {
  private medicoClient!: MedicoClient
  private medico: Medico = new Medico()
  private notification: Notification = new Notification()
  private especialidadeList: Especialidade[] = []
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Especialidade> = new PageResponse<Especialidade>()
  private especialidadeClient!: EspecialidadeClient

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string
  private modoVisualizacao = 'detalhar'

  public mounted(): void {
    this.medicoClient = new MedicoClient()
    this.especialidadeClient = new EspecialidadeClient()
    this.carregarMedico()
    this.listarEspecialidades()
  }

  private carregarMedico(): void {
    if (this.model === 'detalhar') {
      this.medicoClient.findById(this.id).then(value => {
        this.medico = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }

  private listarEspecialidades(): void {
    this.especialidadeClient.findByFiltrosPaginado(this.pageRequest).then(
        value => {
          this.pageResponse = value
          this.especialidadeList = this.pageResponse.content
          console.log(this.especialidadeList)
        },
        error => console.log(error)
    )
  }

  private onClickSairModoDetalhar(): void {
    this.modoVisualizacao = 'editar'
  }

  private onClickCadastrar(): void {
    this.medicoClient.cadastrar(this.medico).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success', 'sucesso: ' + success)
          console.log(this.medico)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
          console.log(this.medico)
        }
    )
  }

  private onClickDeletar(): void {
    this.medicoClient.desativar(this.medico).then(success => {
      this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + success)
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickEditar(): void {
    this.medicoClient.editar(this.medico).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success', 'Sucesso: ' + success)
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
        }
    )
  }

  private onClickLimpar(): void {
    this.medico = new Medico()
  }
}
</script>


<style scoped>

</style>