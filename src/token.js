const typeToken = {
    id: "ID",
    op_s: "OP_S", //+
    op_m: "OP_M", //*
    op_r: "OP_R", //-
    op_d: "OP_D", ///
    op_e: "OP_E", //=
    op_ee: "OP_EE", //==
    op_de: "OP_DE", //!=
    op_and: "AND", //&&
    op_or: "OR", //||
    op_admi: "OP_ADMIRACION", //!
    op_ma_t: "OP_MAYOR_QUE", //>
    op_me_t: "OP_MENOR_QUE", //<
    op_ma_e: "OP_MAYOR_IGUAL", //>=
    op_me_e: "OP_MENOR_IGUAL", //<=
    p_l: "P_L", //(
    p_r: "P_R", //)
    c_l: "C_L", //[
    c_r: "C_R", //]
    k_l: "K_L", //{
    k_r: "K_R", //}
    dt_i: "INT", //int
    dt_v: "VOID", //void
    dt_f: "FLOAT", //float
    dt_b: "BOOL", //boolean
    dt_c: "CHAR", //char
    v_t: "TRUE", //true
    v_f: "FALSE", //false
    v_n: "NUMBER", //[1-9]
    v_str: "STRING", //"..."
    b_wh: "WHILE", //while
    b_f: "FOR", //for
    f_if: "IF", //if
    f_else: "ELSE", //else
    ret: "RETURN", //return
    coma: "COMA", //,
    p_c: "P AND COMA", //;
    eoc: "EOC", //$
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