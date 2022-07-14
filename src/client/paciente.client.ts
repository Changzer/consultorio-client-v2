import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Paciente } from "@/model/paciente.model";

export class PacienteClient {
    private axiosClient: AxiosInstance;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/pacientes',
            headers: { 'Content-type': 'application/json' }
        });
    }
    public async findById(id: number): Promise<Paciente> {
        try {
            return (await this.axiosClient.get<Paciente>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Paciente>> {
        try {

            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Paciente>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async cadastrar(Paciente: Paciente): Promise<void> {
        try {
            return (await this.axiosClient.post('/', Paciente))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async editar(Paciente: Paciente): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${Paciente.id}`, Paciente)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async desativar(Paciente: Paciente): Promise<void> {
        try {
            return (await this.axiosClient.put(`/desativar/${Paciente.id}`, Paciente)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}