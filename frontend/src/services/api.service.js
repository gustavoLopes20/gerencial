import axios from 'axios'
import VueCookies from 'vue-cookies'

export default class ApiService {
    
    static mapUrl(url) 
    {

        if(url && !url.startsWith('/')) {
            url = '/' + url
        }

        let prodUrl = `${window.location.protocol}//${window.location.host}`
        let devUrl = 'http://localhost:5000'

        let apiUrl = ''
        
        if(process.env.NODE_ENV == "production") {
            apiUrl = prodUrl
        } else {
            apiUrl = devUrl
        }
        url = apiUrl + url 

        return url
    }

    static getAccessToken()
    {
        return VueCookies.get("access_token")
    }

    static async chamaApi(api, dataObject, method = "")
    {
        let access_token = VueCookies.get("access_token")
        
        let requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control' : 'no-cache'
            },
        }

        if(access_token){
            requestOptions = {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    'Cache-Control' : 'no-cache'
                },
            }
        }
       

        if(typeof dataObject != "undefined" && method == ""){ // post 

            try{
                requestOptions.method = 'POST'
                requestOptions.body = dataObject
            
                const response = await axios.post(this.mapUrl(api), dataObject, requestOptions)
                
                return response.data

            }catch(ex){
                let ex_descrition = {}

                if (ex.response){
                    ex_descrition = ex.response
                }else if (ex.request) {
                    ex_descrition = ex.request
                }else{
                    ex_descrition = ex.message
                }

                return { 
                    Sucesso: false, 
                    Mensagem:'Erro no servidor',
                    Descricao : ex_descrition
                }
            }

        }else if(typeof dataObject == "undefined" && method == ""){// get
            try{

                requestOptions.method = 'GET'
    
                const response_1 = await axios.get(this.mapUrl(api), requestOptions)
                
                return response_1.data

            }catch(ex){
                let ex_descrition = {}

                if (ex.response){
                    ex_descrition = ex.response
                }else if (ex.request) {
                    ex_descrition = ex.request
                }else{
                    ex_descrition = ex.message
                }
                
                return { 
                    Sucesso:false, 
                    Mensagem:'Erro no servidor',
                    Descricao : ex_descrition
                }
            }
        }
        
        return null
    }

    static interceptorsResponse()
    {
        return new Promise((resolve, reject) => {
            axios.interceptors.response.use( (response) =>{
                resolve(response)
            },(err)=>{
                reject(err)
            })
        })
    }

    static async chamaApi2(api, dataObject = null)
    {   
        let requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                // 'Cache-Control' : 'no-cache'
            },
        }

        if(dataObject != null){ // post 

            try{
                requestOptions.method = 'POST'
                requestOptions.body = dataObject
            
                const response = await axios.post(api, dataObject, requestOptions)
                
                return response.data

            }catch(ex){
                let ex_descrition = {}

                if (ex.response){
                    ex_descrition = ex.response
                }else if (ex.request) {
                    ex_descrition = ex.request
                }else{
                    ex_descrition = ex.message
                }

                return { 
                    Sucesso: false, 
                    Mensagem:'Erro no servidor',
                    Descricao : ex_descrition
                }
            }

        }else{// get
            try{

                requestOptions.method = 'GET'
    
                const response_1 = await axios.get(api, requestOptions)
                
                return response_1.data

            }catch(ex){
                let ex_descrition = {}

                if (ex.response){
                    ex_descrition = ex.response
                }else if (ex.request) {
                    ex_descrition = ex.request
                }else{
                    ex_descrition = ex.message
                }
                
                return { 
                    Sucesso:false, 
                    Mensagem:'Erro no servidor',
                    Descricao : ex_descrition
                }
            }
        }
    }
}
