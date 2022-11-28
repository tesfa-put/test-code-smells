
import { api } from "../plugins";
import {SendNotification} from "../plugins";



export const migrateMenusApi = async (shortcode: string, country_code: string, env: string, selected_menus: Array<any>) => {
    
  try {
    var response = await api.post('/migrate/menus/', { 'country_code': country_code, 'env': env, 'shortcode': shortcode, 'ussd_menus': selected_menus })
    if(response.data.success) {
        return response.data.data
    } 
  } catch (e: any) {
      console.log(e.response.data)
      SendNotification({
        title: "Error",
        message: e.response.data.error,
        type: 'danger'
    })
      return selected_menus
  }
  };


export const migrateOmniServicesApi = async ( country_code: string, env: string, selected_omni: Array<any> ) => {
    var response = await api.post('/migrate/omni/', { 'country_code': country_code, 'env': env, 'omni_services': selected_omni })
    if(response.data.success) {
        return response.data.data
    }
  };