const fs = require('fs')
const { Token, typeToken } = require('./token')

class Scanner{

    constructor(fileName = ""){
        this.file = fs.readFileSync(fileName, { encoding: 'utf-8'})
        this.lexemas = this.file.replace(/\n/g, "").split(" ");
        this.lexemas = this.lexemas.filter((item) => item !== '')
        this.i = 0;
    }

    hasNextToken(){
        return (this.i < this.lexemas.length)
    }

    nextToken(){
        if(this.hasNextToken()){
            const lexema = this.lexemas[this.i].trim()
            this.i += 1
            if(!isNaN(lexema))
                return new Token(typeToken.v_n, lexema)
            if(lexema.substr(0,1) == "")
                return new Token(typeToken.v_str, lexema)
            switch(lexema){
                case "void":
                    return new Token(typeToken.dt_v, lexema)
                case "int":
                    return new Token(typeToken.dt_i, lexema)
                case "float":
                    return new Token(typeToken.dt_f, lexema)
                case "char":
                    return new Token(typeToken.dt_c, lexema)
                case "bool":
                    return new Token(typeToken.dt_b, lexema)
                case "+":
                    return new Token(typeToken.op_s, lexema)
                case "-":
                    return new Token(typeToken.op_r, lexema)
                case "*":
                    return new Token(typeToken.op_m, lexema)
                case "/":
                    return new Token(typeToken.op_d, lexema)
                case "=":
                    return new Token(typeToken.op_e, lexema)
                case "==":
                    return new Token(typeToken.op_ee, lexema)
                case "!=":
                    return new Token(typeToken.op_de, lexema)
                case "&&":
                    return new Token(typeToken.op_and, lexema)
                case "||":
                    return new Token(typeToken.op_or, lexema)
                case "true":
                    return new Token(typeToken.v_t, lexema)
                case "false":
                    return new Token(typeToken.v_f, lexema)
                case "while":
                    return new Token(typeToken.b_wh, lexema)
                case "for":
                    return new Token(typeToken.b_f, lexema)
                case "if":
                    return new Token(typeToken.f_if, lexema)
                case "else":
                    return new Token(typeToken.f_else, lexema)
                case "return":
                    return new Token(typeToken.ret, lexema)
                case ",":
                    return new Token(typeToken.coma, lexema)
                case ";":
                    return new Token(typeToken.p_c, lexema)
                case "(":
                    return new Token(typeToken.p_l, lexema)
                case ")":
                    return new Token(typeToken.p_r, lexema)
                case "[":
                    return new Token(typeToken.c_i, lexema)
                case "]":
                    return new Token(typeToken.c_r, lexema)
                case "{":
                    return new Token(typeToken.k_l, lexema)
                case "}":
                    return new Token(typeToken.k_r, lexema)
                case "$":
                    return new Token(typeToken.eoc, lexema)
                default:
                    return new Token(typeToken.id, lexema)
            }
        }
    }

    getLexemas(){
        return this.lexemas
    }
}

module.exports = Scanner