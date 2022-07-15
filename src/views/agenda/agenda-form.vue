<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Novo Agendamento
    </div>
  </div>

  <div class="column is-6">
    <label class="label">Paciente</label>
    <div class="select is-fullwidth">
      <select class="input is-primary" v-if="modoVisualizacao === 'detalhar'">
        <option>Selecione o Paciente</option>
      </select>
      <select class="input is-primary" v-model="paciente.nome" v-else>
        <option :value="item" v-for="item in pacienteList" :key="item.id">{{ item.nome }}</option>
      </select>
    </div>
  </div>


</template>
<script lang="ts">
import {Vue} from 'vue-class-component';
import {Notification} from "@/model/notification";
import {Prop} from "vue-property-decorator";
import {AgendaClient} from "@/client/agenda.client";
import {Agenda} from "@/model/agenda.model";
import {PageResponse} from "@/model/page/page-response";
import {PageRequest} from "@/model/page/page-request";

import {Paciente} from "@/model/paciente.model";
import {PacienteClient} from "@/client/paciente.client";


export default class ConvenioForm extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Paciente> = new PageResponse<Paciente>()

  private pacienteList: Paciente[] = []
  private pacienteClient!: PacienteClient

  private agendaClient!: AgendaClient
  private agenda: Agenda = new Agenda()
  private notification: Notification = new Notification()
  private modoVisualizacao = 'detalhar'

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string

  public mounted(): void {
    this.agendaClient = new AgendaClient()
    this.carregarAgenda()
    this.pacienteClient = new PacienteClient()
    this.listarPacientes()
  }

  private listarPacientes(): void {
    this.pacienteClient.findByFiltrosPaginado(this.pageRequest).then(
        value => {
          this.pageResponse = value
          this.pacienteList = this.pageResponse.content
          console.log(this.pacienteList)
        },
        error => console.log(error)
    )
  }



  private onClickCadastrar(): void {
    this.agendaClient.cadastrar(this.agenda).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success',
              'Agenda foi Cadastrado com sucesso!!!')
          console.log(this.agenda)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger',
              'Error: ' + error)
          console.log(this.agenda)
          this.onClickLimpar()
        })
  }

  private carregarAgenda(): void {
    if (this.model === 'detalhar') {
      this.agendaClient.findById(this.id).then(value => {
        this.agenda = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.modoVisualizacao = 'cadastrar'
    }
  }

  private onClickEditar(): void {
    this.agendaClient.editar(this.agenda).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'Agenda foi editado com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  private onClickDesativar(): void {
    this.agendaClient.desativar(this.agenda).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'Agenda foi desativado com sucesso!!!')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger',
          'Error: ' + error)
    })
  }

  private onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }

  private onClickLimpar(): void {
    this.agenda = new Agenda()
  }
}
</script>

<style scoped>

</style>