const Scanner = require('./scanner')
const scanner = new Scanner('test.c');
const { Token, typeToken } = require('./token')
let token = ""

function program(){
    switch(token.value){
        case 'void':
            console.log(token.tokenToString())
            coincidir(new Token(typeToken.dt_v, "void"))
            console.log(token.tokenToString())
            coincidir(new Token(typeToken.id, "id"))
            funcs()
            break
        default:
            typeId()
            console.log(token.tokenToString())
            decl()
            break;
    }
}

function typeId(){
    typeSpec()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.id, "ID"))
}

function decl(){
    if(token.value == "(")
        funcs()
    else
        vars()
}

function typeSpec(){
    console.log(token.tokenToString())
    switch(token.value){
        case 'int':
            coincidir(new Token(typeToken.dt_i))
            break;
        case 'char':
            coincidir(new Token(typeToken.dt_c))
            break;
        case 'bool':
            coincidir(new Token(typeToken.dt_b))
            break;
        case 'float':
            coincidir(new Token(typeToken.dt_f))
            break;
        default:
            error("deberia ser int, char, bool o float")
    }
}

function vars(){
    arrayDecl()
    varDeclinit()
    decList()
    token = scanner.nextToken()
    coincidir(new Token(typeToken.p_c, ","))
    //PUNTO Y COMA
    decl2()
}

function arrayDecl(){
    if(token.value == "["){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.c_l, "["))
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.v_n, "1-9"))
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.c_r, "]"))
    }
}

function varDeclinit(){
    if(token.value == "="){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_e, "="))
        expresion()
    }
}

function decList(){
    if(token.value == ","){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.coma, ","))
        varNames()
    }
}

function varNames(){
    console.log(token.tokenToString)
    coincidir(new Token(typeToken.id, "ID"))
    console.log(token.tokenToString())
    arrayDecl()
    varDeclinit()
    decList()
}

function decl2(){
    if(token.value == "void"){
        console.log(token.tokenToString())
        coincidir(typeToken.dt_v, "void")
        console.log(token.tokenToString())
        coincidir(typeToken.id, "ID")
        funcs()
    }
    else{
        typeId()
        decl()
    }
}

function funcs(){
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    params()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_r, ")"))
    funcStmt()
    funDecListPrima()
}

function funDecListPrima(){
    if((["int", "float", "char", "bool", "void"].some((item) => token.value == item))){
        funDecList()
        funDecListPrima()
    }
}

function funDecList(){
    if(token.value == "void"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.dt_v, "void"))
    }
    else{
        typeSpec()
    }
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.id, "ID"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    params()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_r, ")"))
    funcStmt()
}

function params(){
    if((["int", "float", "char", "bool"].some((item) => token.value == item))){
        param()
        paramsPrima()
    }
}

function paramsPrima(){
    if(token.value == ","){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.coma, ","))
        param()
        paramsPrima()
    }
}

function param(){
    typeSpec()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.id, "ID"))
}

function funcStmt(){
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_l, "{"))
    console.log(token.tokenToString())
    stmts()
    returnStmt()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_r, "}"))
}

function returnStmt(){
    if(token.value == "return"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.ret, "RETURN"))
        console.log(token.tokenToString())
        if(token.value == ";")
            coincidir(new Token(typeToken.p_c, ";"))
        else{
            coincidir(new Token(typeToken.v_n, "NUMBER"))
            console.log(token.tokenToString())
            coincidir(new Token(typeToken.p_c, ";"))
        }
    }
}

function stmts(){
    const is = ["if", "while", "for"].some((item) => token.value == item)
    if(token.type == typeToken.id || is){
        stmt()
        stmts()
    }
}

function stmt(){
    if(token.value == "if")
        ifStmt()
    else if(token.value == "while")
        whileStmt()
    else if(token.value == "for")
        forStmt()
    else
        exprStmt()
}

function exprStmt(){
    expresion()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_c, ";"))
}

function expresion(){
    assignement()
}

function assignement(){
    if(token.type == typeToken.id){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.id, "ID"))
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_e, "="))
        assignement()
    }
    else
        logicOr()
}

function logicOr(){
    logicAnd()
    logicOrPrima()
}

function logicOrPrima(){
    if(token.value == "||"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_or))
        logicAnd()
        logicOrPrima()
    }
}

function logicAnd(){
    equality()
    logicAndPrima()
}

function logicAndPrima(){
    if(token.value == "&&"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_and, "&&"))
        equality()
        logicAndPrima()
    }
}

function equality(){
    comparison()
    equalityPrima()
}

function equalityPrima(){
    if(token.type == typeToken.op_de || token.type == typeToken.op_ee){
        compOper()
        comparison()
        equalityPrima()
    }
}

function compOper(){
    console.log(token.tokenToString())
    if(token.type == typeToken.op_de)
        coincidir(new Token(typeToken.op_de, "!="))
    else
        coincidir(new Token(typeToken.op_ee, "=="))
}

function comparison(){
    term()
    comparisonPrima()
}

function comparisonPrima(){
    if(([">",">=","<","<="].some((item) => token.value == item))){
        logicOperator()
        term()
        comparisonPrima()
    }
}

function logicOperator(){
    switch(token.value){
        case '>':
            coincidir(new Token(typeToken.op_ma_t, ">"))
            break;
        case '>=':
            coincidir(new Token(typeToken.op_ma_e, ">="))
            break;
        case '<':
            coincidir(new Token(typeToken.op_me_t, "<"))
            break;
        case '<=':
            coincidir(new Token(typeToken.op_me_e, "<="))
            break;
        default:
            error("deberia ser >, >=, < o <=")
    }
}

function term(){
    factor()
    termPrima()
}

function termPrima(){
    if(token.value == "-"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_r, "-"))
        factor()
        termPrima()
    }
    else if(token.value == "+"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_r, "+"))
        factor()
        termPrima()
    }
}

function factor(){
    unary()
    factorPrima()
}

function factorPrima(){
    if(token.value == "/"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_r, "/"))
        unary()
        factorPrima()
    }
    else if(token.value == "*"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.op_r, "*"))
        unary()
        factorPrima()
    }
}

function unary(){
    if(token.type == typeToken.op_admi || token.type == typeToken.op_r){
        unaryOp()
        unary()
    }
    else
        call()
}

function unaryOp(){
    console.log(token.tokenToString())
    if(token.type == typeToken.op_admi)
        coincidir(new Token(typeToken.op_admi, "!"))
    else
        coincidir(new Token(typeToken.op_r, "-"))
}

function call(){
    primary()
    callFunc()
}

function callFunc(){
    if(token.type == typeToken.p_l){ //( params ) | (vacio)
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.p_l, "("))
        params()
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.p_l, ")"))
    }
}

function primary(){
    console.log(token.tokenToString())
    if(token.value == "true")
        coincidir(new Token(typeToken.v_t, "true"))
    else if(token.value == "false")
        coincidir(new Token(typeToken.v_f, "false"))
    else if(token.type == typeToken.v_n)
        coincidir(new Token(typeToken.v_n, "number"))
    else if(token.type == typeToken.v_str)
        coincidir(new Token(typeToken.v_str, "string"))
    else if(token.type == typeToken.id)
        coincidir(new Token(typeToken.id, "id"))
    else{
        coincidir(new Token(typeToken.p_l, "("))
        expresion()
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.p_r, ")"))
    }
}

function ifStmt(){
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.f_if, "if"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    expresion()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_r, ")"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_l, "{"))
    stmts()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_r, "}"))
    elseStmt()
}

function elseStmt(){
    if(token.value == "else"){
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.f_else, "else"))
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.k_l, "{"))
        stmts()
        console.log(token.tokenToString())
        coincidir(new Token(typeToken.k_r, "}"))
    }
}

function whileStmt(){
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.b_wh, "while"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    expresion()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_r, ")"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_l, "{"))
    stmts()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_r, "}"))
}

function forStmt(){
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.b_f, "for"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    forExpr()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_c, ";"))
    console.log(token.tokenToString())
    forExpr()
    coincidir(new Token(typeToken.p_c, ";"))
    forExpr()
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_r, ")"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_l, "{"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.k_r, "}"))
}

function forExpr(){
    if(token.type = typeToken.id)
        expresion()
}

function coincidir(tkn){
    if(token.type == tkn.type)
        token = scanner.nextToken()
    else
        error(tkn)
}

function error(tkn){
    console.log("La cadena no es valida")
    console.log(`Error en`, token)
    console.log(`Deberia ser`, tkn)
    process.exit(1)
}

async function main(){
    console.log(scanner.getLexemas())
    token = scanner.nextToken()
    program()
    console.log("La cadena si es valida")
}

main()