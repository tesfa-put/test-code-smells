import { OmniserviceDTO } from "../components/omni_service/AddEditOmniService";
import { FetchingState } from "../hooks/fetchingStateWrapper";
import { api, SendNotification } from "../plugins";
import { useAppDispatch } from "../store/hooks";
import { setFetchingOmniMode, setOmniPagination, setOmniServices } from "../store/slices/OmniServicesSlice";
import { store } from "../store/store";
import { endpoints } from "../utils/endpoints";

export class OmniServicesApiService {


    private _dispatch = useAppDispatch()


    private _omni_service_url = endpoints.omni_services;
    private _add_omni_service_url = endpoints.add_omni_services;

    private _get_omni_service = (filters: any) => api.post(this._omni_service_url, filters)
    private _update_omni_service = (omni: any, id: number) => api.put(`${this._omni_service_url}${id}`, omni)
    private _add_omni_service = (omni: any) => api.post(`${this._add_omni_service_url}`, omni)
    private _delete_omni_service = (id: number, country_code: string, env: string) => api.delete(`${this._omni_service_url}${id}?country_code=${country_code}&env=${env}`)
    private _menus_omni_service = (id: number, country_code: string, env: string) => api.get(`${this._omni_service_url}${id}?country_code=${country_code}&env=${env}`)


    public UpdateOmniService = ( omni: OmniserviceDTO, country_code: string, env: string, omni_name: string, page: number) => {

        this._update_omni_service({ env, country_code, name: omni.name, method: omni.method, service_function: omni.service_function, url: omni.url, session_key: omni.session_key}, omni.id)
            .then( response => {
                SendNotification({
                    title: "Success",
                    message: "Successfully update omni service",
                    type: "info"
                })
                // this.GetOmniServices(page, omni_name, country_code, env.toLowerCase())
                let app_store = store.getState();
                let idx = -1;
                let new_omni_services = app_store.omni_services.omni_services.map( (omni_ser, index) => {
                        if (omni_ser.id === omni.id){
                            idx = index
                            console.log('idex: ', index);
                            
                        }
                        return omni_ser
                } )

                if (idx !== -1) {
                    new_omni_services[idx] = response.data.data
                }
                
                this._dispatch(setOmniServices(new_omni_services))

            })
            .catch ( error => {
                SendNotification({
                    title: "Failed",
                    message: "Could not update OMNI service!",
                    type: "info"
                })
            })

    }


    public DeleteOmniService = ( id: number, country_code: string, env: string, ) => {

        this._delete_omni_service(id, country_code, env.toLowerCase())
            .then( response => {
                SendNotification({
                    title: "Success",
                    message: "Successfully deleted omni service",
                    type: "info"
                })
                let app_store = store.getState();
                let new_omni_services = app_store.omni_services.omni_services.filter( (omni_ser, index) => omni_ser.id !== id )
                this._dispatch(setOmniServices(new_omni_services))

            })
            .catch ( error => {
                SendNotification({
                    title: "Failed",
                    message: "Could not update OMNI service!",
                    type: "info"
                })
            })

    }

    public static MenusInOmniService = async ( id: number, country_code: string, env: string, ) => await api.get(`${endpoints.omni_services}${id}?country_code=${country_code}&env=${env}`)

        // this._dispatch(setMenusInOmni([]))
    //     api.get(`${endpoints.omni_services}${id}?country_code=${country_code}&env=${env}`)
    //         .then( response => {
    //             // this._dispatch(setMenusInOmni(response.data.data))
    //             console.log(response.data.data);
                
    //             return response.data.data
    //         })
    //         .catch ( error => {

    //             SendNotification({
    //                 title: "Failed",
    //                 message: "Could not fetch menus in OMNI service!",
    //                 type: "info"
    //             })
    //             return []
    //         })

    // }

    public AddOmniService = ( omni: OmniserviceDTO, country_code: string, env: string,) => {

        this._add_omni_service({ env, country_code, name: omni.name, method: omni.method, service_function: omni.service_function, url: omni.url, session_key: omni.session_key})
            .then( response => {
                SendNotification({
                    title: "Success",
                    message: "Successfully added omni service",
                    type: "info"
                })
                
            })
            .catch ( error => {
                SendNotification({
                    title: "Failed",
                    message: "Could not add OMNI service!",
                    type: "danger"
                })
            })

    }

    public autoCompleteOmni = (page: number, name : string = "", country_code: string, env: string, direct_return: boolean = false) => this._get_omni_service({page, name, country_code, env})

    public GetOmniServices = (page: number, name : string = "", country_code: string, env: string, direct_return: boolean = false) => {
        this._dispatch(setFetchingOmniMode(FetchingState.Waiting))
        this._get_omni_service({page, name, country_code, env}).then( response => {
            
            console.log(response);
            if( response.status === 200 ) {
                console.log(response.data.data);
                    this._dispatch(setOmniServices(response.data.data))
                    this._dispatch(setOmniPagination({page: response.data.next_page - 1, total_page: response.data.total_pages}))
                    this._dispatch(setFetchingOmniMode(FetchingState.Done))
            } else {
                return []
            }
            
        }).catch( error => {
            this._dispatch(setFetchingOmniMode(FetchingState.Error))

        })
    }

}