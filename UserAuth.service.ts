import { api } from "../plugins"
// import endpoints, { baseUrl }  from "../utils/endpoints";


export const LoginMainService = async (email: string) => {
    return api.post('auth/user-login/', {'username': email });
}

export function getJWTToken(data: any) {
    // let endpoint = "https://partners-dev.equitygroupholdings.com/adminportalauth/oauth/microsoft";
    const endpoint =
        "https://api-dev.equitygroupholdings.com/adminportalauth/oauth/microsoft";
    console.log(endpoint, "endpoint");

    return api.post(endpoint, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000,
    });
}