const { ConnectionService } = require('discord.js');
const Scanner = require('./scanner')
const scanner = new Scanner('test.c');
const { Token, typeToken } = require('./token')
let token = ""

function program(){
    switch(token.value){
        case 'void':
            console.log(token.tokenToString())
            token = scanner.nextToken()
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
    token = scanner.nextToken()
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
    switch(token.value){
        case 'int':
            break;
        case 'char':
            break;
        case 'bool':
            break;
        case 'float':
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
    coincidir(new Token(typeToken.p_l, "("))
    console.log(token.tokenToString())
    params()
    coincidir(new Token(typeToken.p_r, ")"))
    console.log(token.tokenToString())
    stmt()
    funDecListPrima()
}

function funDecListPrima(){
    if((["int", "float", "char", "bool", "void"].some((item) => token.value == item))){
        funDecList()
        funDecListPrima()
    }
}

function funDecList(){
    console.log(token.tokenToString())
    if(token.value == "void")
        coincidir(new Token(typeToken.dt_v, "void"))
    else{
        typeSpec()
        token = scanner.nextToken()
    }
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.id, "ID"))
    console.log(token.tokenToString())
    coincidir(new Token(typeToken.p_l, "("))
    console.log(token.tokenToString())
    params()
    coincidir(new Token(typeToken.p_r, ")"))
    console.log(token.tokenToString())
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
    token = scanner.nextToken()
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
    if(token.type == typeToken.id || (["if", "while", "for"].some((item) => token.value == item))){
        stmt()
        stmts()
    }
}

function stmt(){

}

function exprStmt(){

}

function expresion(){

}

function assignement(){

}

function logicOr(){

}

function logicOrPrima(){

}

function logicAnd(){

}

function logicAndPrima(){

}

function equality(){

}

function equalityPrima(){

}

function compOper(){

}

function comparison(){

}

function comparisonPrima(){

}

function logicOperator(){
    switch(token.value){
        case '>':
            break;
        case '>=':
            break;
        case '<':
            break;
        case '<=':
            break;
        default:
            error("deberia ser >, >=, < o <=")
    }
}

function term(){

}

function termPrima(){

}

function factor(){

}

function factorPrima(){

}

function unary(){

}

function unaryOp(){

}

function call(){

}

function callFunc(){

}

function primary(){

}

function ifStmt(){

}

function elseStmt(){

}

function whileStmt(){

}

function forStmt(){

}

function forExpr(){

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