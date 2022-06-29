import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Medico } from "@/model/medico.model";

export class MedicoClient {
    private axiosClient: AxiosInstance;
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/medicos',
            headers: { 'Content-type': 'application/json' }
        });
    }
    public async findById(id: number): Promise<Medico> {
        try {
            return (await this.axiosClient.get<Medico>(`/${id}`)).data
        } catch (error) {
            return Promise.reject(new Error("falha"))
        }
    }
    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Medico>> {
        try {

            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Medico>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error) {
            return Promise.reject(new Error("falha"))
        }
    }
    public async cadastrar(medico: Medico): Promise<void> {
        try {
            return (await this.axiosClient.post('/', medico))
        } catch (error) {
            return Promise.reject(new Error("falha"))
        }
    }
    public async editar(medico: Medico): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${medico.id}`, medico)).data
        } catch (error) {
            return Promise.reject(new Error("falha"))
        }
    }

    public async desativar(medico: Medico): Promise<void> {
        try {
            return (await this.axiosClient.put(`/desativar/${medico.id}`, medico)).data
        } catch (error) {
            return Promise.reject(new Error("falha"))
        }
    }
}