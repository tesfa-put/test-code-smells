
import { api } from "../plugins"
import {SendNotification} from "../plugins"
import {
    Position,
    Node,
    Connection,
    Edge,
} from 'react-flow-renderer';

import { useAppSelector } from "../store/hooks";


export const fetchMenuDetails = async function(country: string, env: string, id: number) {
    var response = await api.get(`menus/${id}?env=${env.toLowerCase()}&country_code=${country}`)
    var menus = response.data;
    if(menus.success) {
            return menus.data
        }
  }


export const FetchInitialScreens = async (country_code: string, env: string) => {

    try {
        const response = await api.get(`initials?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    } catch(e: any) {
            SendNotification({
                title: "Error",
                message: e.response.data,
                type: 'danger'
            })
    }

}



export const AddInputScreensMenuGraph = async (values: Record<string, any>, country_code: string, env: string, extra_data: any) => {
    try {
        console.log(values);
        
        const response = await api.post(`menu_graph/input_screen/`, {...values, country_code, env })
        console.log(response);
        
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Ussd Label",
                type: 'success'
            })
            const menu = response.data.data
            
            const node = {
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    type: values.menu_type,
                    id: `${country_code}_${env}_${menu.name}_${menu.id}`,
                    position: { x: extra_data.xPos, y: extra_data.yPos },
                    data: {
                        menu: menu,
                    },
                    }
            return node
        
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    } catch(e: any) {
        console.log(e);
            SendNotification({
                title: "Error",
                message: e.response.data.error,
                type: 'danger'
            })
    }
}


export const AddFunctionScreensMenuGraph = async (values: Record<string, any>, country_code: string, env: string, extra_data: any) => {
    try {
        console.log(values);
        
        const response = await api.post(`menu_graph/function_screen/`, {...values, country_code, env })
        console.log(response);
        
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Ussd Label",
                type: 'success'
            })
            const menu = response.data.data
            
            const node = {
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    type: values.menu_type,
                    id: `${country_code}_${env}_${menu.name}_${menu.id}`,
                    position: { x: extra_data.xPos, y: extra_data.yPos },
                    data: {
                        menu: menu,
                    },
                    }
            return node
        
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    } catch(e: any) {
        console.log(e);
            SendNotification({
                title: "Error",
                message: e.response.data.error,
                type: 'danger'
            })
    }
}


export const MenuGraphAttachNextScreen = async (data: Record<string, any>, country_code: string, env: string, extra: Record<string, any>) => {

    try {
        const response = await api.put(`menu_graph/attach_next_screen/`, { ...data, country_code, env })
        console.log(response);
        
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully attached Next Screen",
                type: 'success'
            })
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    return response.data.success
    } catch(e: any) {
        console.log(e);
        
            SendNotification({
                title: "Error",
                message: e.response.data.error,
                type: 'danger'
            })
            return false
    }

}

export const AddRouterScreensMenuGraph = async (values: Record<string, any>, country_code: string, env: string, extra_data: any) => {
    try {
        console.log(values);
        
        const response = await api.post(`menu_graph/router_screen/`, {...values, country_code, env })
        console.log(response);
        
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Ussd Label",
                type: 'success'
            })
            const menu = response.data.data
            
            const node = {
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    type: values.menu_type,
                    id: `${country_code}_${env}_${menu.name}_${menu.id}`,
                    position: { x: extra_data.xPos, y: extra_data.yPos },
                    data: {
                        menu: menu,
                    },
                    }
            return node
        
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    } catch(e: any) {
        console.log(e);
            SendNotification({
                title: "Error",
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const AddMenuWithItemsScreensMenuGraph = async (values: Record<string, any>, country_code: string, env: string, extra_data: any) => {
    try {
        console.log(values);
        
        const response = await api.post(`menu_graph/menu_screen/`, {...values, country_code, env })
        console.log(response);
        
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Menu Screen",
                type: 'success'
            })
            const menu = response.data.data
            
            const node = {
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    type: menu.menu_type__name,
                    id: `${country_code}_${env}_${menu.name}_${menu.id}`,
                    position: { x: extra_data.xPos, y: extra_data.yPos },
                    data: {
                        menu: menu,
                    },
                    }
            return node
        
        } else {
            SendNotification({
                title: "Error",
                message: response.data.error,
                type: 'danger'
            })
        }
    } catch(e: any) {
        console.log(e);
            SendNotification({
                title: "Error",
                message: e.response.data.error,
                type: 'danger'
            })
        return null;
    }
}


export class MenuGraphApiService {


    private new_router_label = useAppSelector( state => state.addMenuInGraph.new_router_label )
    private menu_option = useAppSelector( state => state.addMenuInGraph.new_options_text )


    public async MenuGraphAttachNextScreen (data: Record<string, any>, country_code: string, env: string, extra: Record<string, any>) {
        console.log(this.new_router_label);
        
        if (this.new_router_label === "") this.new_router_label = "<random value>"
        if (this.menu_option === "") this.menu_option = "<random value>"

        try {
            const response = await api.put(`menu_graph/attach_next_screen/`, { ...data, country_code, env, router_option: this.new_router_label, menu_option: this.menu_option })
            
            if(response.data.success) {
                SendNotification({
                    title: "Success",
                    message: "Successfully attached Next Screen",
                    type: 'success'
                })
            } else {
                SendNotification({
                    title: "Error",
                    message: response.data.error,
                    type: 'danger'
                })
            }
        return response.data
        } catch(e: any) {
            console.log(e);
            
                SendNotification({
                    title: "Error",
                    message: e.response.data.error,
                    type: 'danger'
                })
        }
    
    }


    public async  onEdgeConnect (params: Connection, edges: Array<Edge>, nodes: Array<Node>, country_code: string, env: string){
        const response = await this.MenuGraphAttachNextScreen({source: params.sourceHandle!.replace('s', ''), target: params.targetHandle!.replace('t', '')}, country_code, env.toLowerCase(), {})
        
        if (response.success){
            return {
                success: true,
                
            }
            
        } else {
            return  {
                success: false,
            }
        }
        

    }
}