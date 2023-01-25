const typeToken = {
    id: "ID",
    op_s: "OP_S",
    op_m: "OP_M",
    op_r: "OP_R",
    op_d: "OP_D",
    op_e: "OP_E",
    op_ee: "OP_EE",
    op_de: "OP_DE",
    op_and: "AND",
    op_or: "OR",
    p_l: "P_L",
    p_r: "P_R",
    c_l: "C_L",
    c_r: "C_R",
    k_l: "K_L",
    k_r: "K_R",
    dt_i: "INT",
    dt_v: "VOID",
    dt_f: "FLOAT",
    dt_b: "BOOL",
    dt_c: "CHAR",
    v_t: "TRUE",
    v_f: "FALSE",
    v_n: "NUMBER",
    v_str: "STRING",
    b_wh: "WHILE",
    b_f: "FOR",
    f_if: "IF",
    f_else: "ELSE",
    ret: "RETURN",
    coma: "COMA",
    p_c: "P AND COMA",
    eoc: "EOC",
}

class Token {
    constructor(token, value){
        this.type = token
        this.value = value
    }

    tokenToString(){
        return `< ${this.type}, '${this.value}' >`;
    }

}

module.exports = {
    typeToken,
    Token
}