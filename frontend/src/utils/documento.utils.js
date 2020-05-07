export default class DocUtils 
{

    static verifica_cpf_cnpj(valor) 
    {
        valor = valor.replace(/[^0-9]/g, '')

        if (valor.length == 11)
            return 'CPF'
        else if (valor.length == 14)
            return 'CNPJ'
        else
            return false
    }

    static valida_cpf(cpf) 
    {
        let numeros, digitos, soma, i, resultado, digitos_iguais
        digitos_iguais = true

        if (cpf.length < 11)
            return false

        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = false
                break
            }

        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9)
            digitos = cpf.substring(9)
            soma = 0
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
            if (resultado != digitos.charAt(0))
                return false
            numeros = cpf.substring(0, 10)
            soma = 0
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
            if (resultado != digitos.charAt(1))
                return false
            return true
        } else
            return false
    }

    static valida_cnpj(cnpj) 
    {

        cnpj = cnpj.replace(/[^\d]+/g, '')

        if (cnpj == '') return false

        if (cnpj.length != 14)
            return false

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho)
        let digitos = cnpj.substring(tamanho)
        let soma = 0
        let pos = tamanho - 7
        let i = 0
        let resultado = 0

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2)
                pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

        if (resultado != digitos.charAt(0))
            return false

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2)
                pos = 9
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1))
            return false

        return true
    }

    static valida_cpf_cnpj(valor) 
    {
        let valida = this.verifica_cpf_cnpj(valor)

        valor = valor.replace(/[^0-9]/g, '')

        if (valida === 'CPF')
            return this.valida_cpf(valor)
        else if (valida === 'CNPJ')
            return this.valida_cnpj(valor)
        else
            return false
    }

    
    //formatando
    static formataDocumento(value) 
    {
        if(value){
            if (value.length <= 14)
                return this.cpfFMT(value)
            else
                return this.cnpjFMT(value)
        }else{
            return null
        }
    }

    static  rgFMT(rg) 
    {
        rg = rg.replace(/\D/g, "")
        rg = rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
        return rg
    }

    static cepFMT(cep) // XXXXX-XXX
    {
        cep = cep.replace(/\D/g, "")
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
        return cep
    }

    static cpfFMT(cpf) // XXX.XXX.XXX-XX
    {
        cpf = cpf.replace(/\D/g, "")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        return cpf
    }

    static cnpjFMT(cnpj) // XX.XXX.XXX.XXXX-XX
    {
        cnpj = cnpj.replace(/\D/g, "")
        cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
        cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")
        return cnpj
    }

    static celularFMT(tel) // (XX) XXXX.XXXX
    {
        tel = tel.replace(/\D/g, "")
        tel = tel.replace(/^(\d{2})(\d)/g, "($1) $2")
        tel = tel.replace(/(\d)(\d{4})$/, "$1-$2")
        return tel
    }


    static numerico(value) 
    {
        value = value.replace(/\D/g, "")
        return value
    }


    static cepFMP(cep) // XXXXX-XXX
    {
        if(cep){
            cep = cep.replace(/\D/g, "")
            cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
            return cep
        }
    }
}