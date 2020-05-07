import VueCookies from 'vue-cookies'
import escapeStringRegexp from 'escape-string-regexp'

export default class DefaultUtils 
{
    static validPassword(senha)
    {
        if (this.validaVariavel(senha) && senha.length >= 6)
        {
            if (
                /[0-9]/gm.test(senha) && 
                /[a-z]/gm.test(senha) &&
                /[A-Z]/gm.test(senha) &&
                /[!@#$%*()_+^&{}}:?.]/gm.test(senha)
            )
                return true
        }
        return false            
    }    

    static jsonPaseStr(str) 
    {
        try {
            return JSON.parse(str)
        } catch (ex) {
            return false
        }
    }

    static validEmail(email)
    {
        try{
            let re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }catch(ex){
            return false
        }
    }
    static validaVariavel(value)
    {
        if(typeof value != "undefined" && value)
            return true
        else
            return false
    }

    static setCookie(key, item)
    {
        VueCookies.set(key,item) 
    }

    static removeCookie(key)
    {
        VueCookies.remove(key) 
    }
    
    static getCookie(key)
    {
        try{
            return VueCookies.get(key)
        }
        catch(ex){
            return []
        } 
    }

    static somenteNumeber(value)
    {
        try{
            return value.toString().replace(/[\D]+/g,'')
        }catch(ex){
            return null
        }
    }

    static formatReal(value, flag = false)
    {
        try{
            let tmp = Number(value.toString().replace(/[\D]+/g,''))
            tmp = parseFloat(tmp/100).toFixed(2).toLocaleString('pt-BR')

            return flag  ? tmp.replace('.',',') : tmp
        }catch(ex){
            return null
        }
    }

    static toFloat(value)
    {
        try{
            if(typeof value == 'number'){
                return parseFloat(value).toFixed(2).replace('.',',')
            }else{
                return Number(parseFloat(value.replace(',','.')).toFixed(2))
            }
        }catch(ex){
            return null
        }
    }

    static base64(value)
    {
        try{
            if(!this.validaVariavel(value))
                return ''

            return this.isBase64(value) ? atob(value) : btoa(value)
        }catch(ex){
            return ''
        }
    }

    static isBase64(str) {
        try {
            return btoa(atob(str)) == str
        } catch (err) {
            return false
        }
    }

   
    static getUserData()
    {
        try{
            return this.base64(VueCookies.get("user_session"))   
        }catch(ex){
            return null
        }
    }

    static setUserData(value, expires = "60MIN")
    {
        VueCookies.set("user_session",this.base64(JSON.stringify(value)),expires) 
    }

    static isObjectEmpty(obj) 
    {
        return Object.keys(obj).length === 0
    }



    static cepFMP(cep) // XXXXX-XXX
    {
        if(cep){
            cep = cep.replace(/\D/g, "")
            cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
            return cep
        }
    }

    static celularFMT(tel) // (XX) XXXX.XXXX
    {
        tel = tel.replace(/\D/g, "")
        tel = tel.replace(/^(\d{2})(\d)/g, "($1) $2")
        tel = tel.replace(/(\d)(\d{4})$/, "$1-$2")
        return tel
    }  
    
    static clearObject(value)
    {
        try{
            for(let key in value){

                if(!this.isObjectEmpty(value[key])){
                    value[key] = this.clearObject(value[key])
                }else if(Array.isArray(value[key])){
                    value[key] = []
                }else if(typeof value[key] == "number"){
                    value[key] = 0
                }else{
                    value[key] = null
                }
            }
            return value
        }catch(ex){
            return {}
        }
    }

    static paginate(totalItems,currentPage = 1, pageSize = 50, maxPages = 5) 
    {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize)
    
        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1
        } else if (currentPage > totalPages) {
            currentPage = totalPages
        }
    
        let startPage, endPage

        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1
            endPage = totalPages
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1

            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1
                endPage = maxPages
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1
                endPage = totalPages
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage
                endPage = currentPage + maxPagesAfterCurrentPage
            }
        }
    
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
    
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)
        
        let _rangeFMT = [startIndex,endIndex+1]

        if(currentPage == 1){
            _rangeFMT = [startIndex+1,endIndex+1]
        }

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            rangeFMT:_rangeFMT,
            pages: pages
        }
    }

    static serializeQuery(params) 
    {
       return Object.keys(params).map(key => key + '=' + params[key]).join('&')
    }

    static getState(value)
    {
       const estados = [
        {  uf : 'AC', name : 'Acre' },
        {  uf : 'AL', name : 'Alagoas' },
        {  uf : 'AP', name : 'Amapá' },
        {  uf : 'AM', name : 'Amazonas' },
        {  uf : 'BA', name : 'Bahia' },
        {  uf : 'CE', name : 'Ceará' },
        {  uf : 'DF', name : 'Distrito Federal' },
        {  uf : 'ES', name : 'Espírito Santo' },
        {  uf : 'GO', name : 'Goías' },
        {  uf : 'MA', name : 'Maranhão' },
        {  uf : 'MT', name : 'Mato Grosso' },
        {  uf : 'MS', name : 'Mato Grosso do Sul' },
        {  uf : 'MG', name : 'Minas Gerais' },
        {  uf : 'PA', name : 'Pará' },
        {  uf : 'PB', name : 'Paraíba' },
        {  uf : 'PR', name : 'Paraná' },
        {  uf : 'PE', name : 'Pernambuco' },
        {  uf : 'PI', name : 'Piauí' },
        {  uf : 'RJ', name : 'Rio de Janeiro' },
        {  uf : 'RN', name : 'Rio Grande do Norte' },
        {  uf : 'RS', name : 'Rio Grande do Sul' },
        {  uf : 'RO', name : 'Rondônia' },
        {  uf : 'RR', name : 'Roraíma' },
        {  uf : 'SC', name : 'Santa Catarina' },
        {  uf : 'SP', name : 'São Paulo' },
        {  uf : 'SE', name : 'Sergipe' },
        {  uf : 'TO', name : 'Tocantins' },
       ]
       const find = estados.find(a => a.name.toLowerCase() === value.toLowerCase())
   
       if(find){
           return find.uf
       }
       return null
    }
}