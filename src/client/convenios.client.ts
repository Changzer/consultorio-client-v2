import axios, {AxiosInstance} from "axios";
import {PageRequest} from "@/model/page/page-request";
import {PageResponse} from "@/model/page/page-response";
import {Convenio} from "@/model/convenio.model";

export class ConveniosClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/convenios',
            headers: {'Content-type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Convenio> {
        try {
            return (await this.axiosClient.get<Convenio>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Convenio>> {
        try {

            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Convenio>>(requestPath,
                {
                    params: {filtros: pageRequest.filter}
                }
            )).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(convenio: Convenio): Promise<void> {
        try {
            return (await this.axiosClient.post('/', convenio))
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async editar(convenio: Convenio): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${convenio.id}`, convenio)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async desativar(convenio: Convenio): Promise<void> {
        try {
            return (await this.axiosClient.put(`/desativar/${convenio.id}`, convenio)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}