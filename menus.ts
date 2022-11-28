
import { api } from "../plugins"
import { AddLabel, AddMenuItemsDTO, AddMenuOptionDTO, AddRouterOptionDTO, EditLabelDTO, EditMenuItemsDTO, EditMenuOptionDTO, EditRouterOptionDTO, FunctionScreen, InputScreen, MenuScreenDTO, QuitScreen, UpdateRouterScreen } from "../interfaces/menu"
import {SendNotification} from "../plugins"


export const updateFunctionScreen = async (menu: FunctionScreen)=> {
    console.log(menu)
    try {

        const response = await api.post('update/function/', menu)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated function screen",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}


export const updateInputScreen = async (menu: InputScreen)=> {
    try {

        const response = await api.post('update/input/', menu)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated input screen",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const updateMenuScreenAPI = async (menu: MenuScreenDTO)=> {
    try {

        const response = await api.post('update/menu/', menu)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated menu screen",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const updateRouterScreenApi = async (menu: UpdateRouterScreen)=> {
    try {

        const response = await api.post('update/router/', menu)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated router screen",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const updateQuitScreen = async (menu: QuitScreen)=> {
    try {

        const response = await api.post('update/quit/', menu)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated quit screen",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const FetchUssdLabels = async (menu_id: number, country_code: string, env: string)=> {
    try {

        const response = await api.get(`menu/labels/${menu_id}?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data;
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}


export const FetchRouterOptionsApi = async (menu_id: number, country_code: string, env: string)=> {
    try {

        const response = await api.get(`menu/routeroptions/${menu_id}?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data;
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const FetchMenuOptionsApi = async (menu_id: number, country_code: string, env: string)=> {
    try {

        const response = await api.get(`menu/menuoptions/${menu_id}?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data;
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const FetchMenuItemsApi = async (menu_id: number, country_code: string, env: string)=> {
    try {

        const response = await api.get(`menu/menuitems/${menu_id}?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data;
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const FetchLanguages = async (country_code: string, env: string)=> {
    try {

        const response = await api.get(`menu/languages?country_code=${country_code}&env=${env}`)
        if(response.data.success) {
            return response.data.data;
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}


export const addUssdLabelApi = async (label: AddLabel) => {
    try {
        const response = await api.post(`menus/labels/add`, label)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Ussd Label",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const addUssdRouterOptionsApi = async (option: AddRouterOptionDTO) => {
    try {
        const response = await api.post(`menus/routers/add`, option)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Router Option ",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const addMenuItemsApi = async (item: AddMenuItemsDTO) => {
    try {
        const response = await api.post(`menus/menuitems/add`, item)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Menu Item ",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}

export const addUssdMenuOptionsApi = async (option: AddMenuOptionDTO) => {
    try {
        const response = await api.post(`menus/menuoptions/add`, option)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully added Router Option ",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }
}



export const deleteLabelFromMenu = async (label_id: number, env: string, cc: string) => {
    
    try {

        const response = await api.delete(`menus/labels/${label_id}?country_code=${cc}&env=${env}`)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Ussd Label",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const editMenuLabel = async (label_id: number, label: EditLabelDTO) => {
    
    try {

        const response = await api.put(`menus/labels/${label_id}`, label)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated Ussd Label",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}


export const deleteRouterOptions = async (options_id: number, env: string, cc: string) => {
    
    try {

        const response = await api.delete(`menus/options/${options_id}?country_code=${cc}&env=${env}`)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Router Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const editRouterOptionsApi = async (router_id: number, router: EditRouterOptionDTO) => {
    
    try {

        const response = await api.put(`menus/options/${router_id}`, router)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Router Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const updateMenuOptionsApi = async (options_id: number, option: EditMenuOptionDTO ) => {
    
    try {

        const response = await api.put(`menus/moptions/${options_id}`, option)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully updated Menu Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const deleteMenuOptionsApi = async (options_id: number, env: string, cc: string) => {
    
    try {

        const response = await api.delete(`menus/moptions/${options_id}?country_code=${cc}&env=${env}`)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Menu Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}

export const deleteMenuItemsApi = async (item_id: number, env: string, cc: string) => {
    
    try {

        const response = await api.delete(`menus/items/${item_id}?country_code=${cc}&env=${env}`)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Menu Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}


export const updateMenuItemsApi = async (item: EditMenuItemsDTO, item_id: number) => {
    
    try {

        const response = await api.put(`menus/items/${item_id}`, item)
        if(response.data.success) {
            SendNotification({
                title: "Success",
                message: "Successfully deleted Menu Options",
                type: 'success'
            })
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
                message: e.response.data.error,
                type: 'danger'
            })
    }

}