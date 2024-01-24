"use strict";
let CompletedCalc=false
const CheckVals=["+","—","*","/","^","sqrt","(",")","sin","cos","tan"]
const checkInvis=["sqrt","^","sin","cos","tan"]
const conversions={
    "plus":"+",
    "sub":"—",
    "div":"/",
    "mult":"*",
    "lBracket":"(",
    "rBracket":")",
    "pow":"^",
    "sqrt":"sqrt(",
    "sin":"sin(",
    "cos":"cos(",
    "tan":"tan(",
    "log":"log(",
    "ln":"ln(",
    "neg":"-",
    "decimal":"."
}

const WriteLoc=document.getElementById("screen");

document.addEventListener('keydown',checkKey)

const keyToID = {
    '0': "0",
    '1': "1",
    '2': "2",
    '3': "3",
    '4': "4",
    '5': "5",
    '6': "6",
    '7': "7",
    '8': "8",
    '9': "9",
    "+": "plus",
    "=":"equals",
    "-":"sub",
    "/":"div",
    "(":"lBracket",
    ")":"rBracket",
    "Backspace":"undo",
    "Enter":"equals",
    "^":"pow",
    ".":"decimal",
    "*":"mult",
    "n":"neg",
    "N": "neg",
    "r":"sqrt",
    "R":"sqrt",
    "l":"log",
    "L":"ln",
    "c":"cos",
    "C":"cos",
    "s":"sin",
    "S":"sin",
    "t":"tan",
    "T":"tan"

};



function checkKey(e){
    if(e.key in keyToID){
        const btn=document.getElementById(keyToID[e.key]);
        btn.click();
    }
}
function isNum(num){
    return(num>='0' && num<='9');
}
function WriteNumToScreen(buttonId){
    const btn=document.getElementById(buttonId);
    if(CompletedCalc){
        WriteLoc.value="";
        CompletedCalc=false;
    }
    if(isNum(btn.id)){
        WriteLoc.value+=btn.id;
    }
    else{
        WriteLoc.value+=conversions[btn.id];
    }
}
function Undo(){
    WriteLoc.value=WriteLoc.value.substring(0,WriteLoc.value.length-1);
}
function checkBalanced(str){
    let stack=0;
    let ret=true;
    for (const char of str){
        if(char==="("){
            stack++;
        }else if(char === ")"){
            stack--;
        }
    }
    if(stack!==0){
        ret=false;
    }
    return ret;
}


function cleanUpEquation(exp){
    const operators = ['+', '*', '/', "—",'^',"sin","cos","tan","sqrt"];
    const parentheses=["(",")"];
    const Remove=["", " "];
    let result='';
    let prev=""
    for (const curr of exp){
        if(curr=="(" && (prev>='0' && prev<='9')){
            result+=` * ${curr} `;
        }
        if(operators.includes(curr) || parentheses.includes(curr)){
            result+=` ${curr} `;
        }else{
            result+=curr;
        }
        prev=curr;
    }
    let retArray=result.split(" ");
    retArray =retArray.filter(item => !Remove.includes(item));

    return(retArray);
}

function calculateBrackets(eqs){
    const openIndex=eqs.lastIndexOf("(");
}

function twoValCalc(partial_exp){
    const num1=parseFloat(partial_exp[0]);
    const num2=parseFloat(partial_exp[2]);
    const operator=partial_exp[1];
    let result=0;
    let error="null";
    switch (operator){
        case '+':
            result=(num1+num2);
            break;
        case '—':
            result=(num1-num2);
            break;
        case '*':
            result=(num1*num2);
            break;
        case '^':
            result=Math.pow(num1,num2);
            break;
        case '/':
            if(num2!==0){
                result=num1/num2;
            }else{
                error= 'Error: Division by Zero';
            }
            break;
        default:
            error= "Error: Invalid Operator";
    }

    if(error!=="null"){
        return(error);
    }else{
        return result.toString();
    }
}

function singleValCalc(partial_exp){
    const num=parseFloat(partial_exp[1]);
    const operator=partial_exp[0];
    let retVal=0;
    let error="null";
    switch (operator){
        case "sin":
            retVal=Math.sin((num*Math.PI)/180);
            break;
        case "cos":
            retVal = Math.cos((num*Math.PI)/180);
            break;
        case "tan":
            if(num%90==0){
                error="Error: Invalid Value";
            }else{
            retVal = Math.tan((num*Math.PI)/180);
            }
            break;
        case "ln":
            if(num>0){
                retVal = Math.log(num);
            }else{
                error="Error: Invalid Value";
            }
            
            break;
        case "log":
            if(num>0){
                retVal = Math.log10(num);
            }else{
                error="Error: Invalid Value";
            }
            break;
        case "sqrt":
            if(num<0){
                error="Error: Invalid Value";

            }else{
                retVal=Math.sqrt(num);
            }
            break;
        default:
            error="Error: Invalid Operator";
            break;

    }
    if(error!='null'){
        return error;
    }else{
        return retVal;
    }
    

}

function CaclNoBrackets(equation){
    const operations=["/","^","*","+","—"];
    for (let operationVal=0;operationVal<operations.length;operationVal++){
        if(equation.includes(operations[operationVal])){
            if(equation.length==1){
                return(equation);
            }
            for (let i=0;i<equation.length;i++){
                if(equation[i]==operations[operationVal]){
                    let tempList=[equation[i-1],equation[i],equation[i+1]];
                    const Solved=twoValCalc(tempList);
                    if(Solved.includes("Error")){
                        equation=[Solved];
                    }else{
                        let newEquation=equation.slice(0,i-1);
                        newEquation.push(Solved);
                        newEquation=newEquation.concat(equation.slice(i+2,equation.length));
                        equation=newEquation;
                        i--;
                    }
                }
            }

        }

    }
    return equation;



}

function calcWithBrackets(equation){

    if (equation.length<2){
        return equation;
    }
    if(!equation.includes("(")){
        return(CaclNoBrackets(equation)[0]);
    }
    let leftBrackPos=-1;
    let rightBracketPos=-1;
    for(let i=0;i<equation.length;i++){
        if(equation[i]=="("){
            leftBrackPos=i;
        }else if(equation[i]==")" && leftBrackPos!=-1){
            rightBracketPos=i;
            break;
        }
    }
        if(rightBracketPos-leftBrackPos==2){
            let newEquation=equation.slice(0,leftBrackPos-1);
            newEquation.push(equation[rightBracketPos-1]);
            
            newEquation=newEquation.concat(equation.slice(rightBracketPos+1,equation.length));
            equation=newEquation;

        }else{
        let smallerEquation=equation.slice(leftBrackPos+1,rightBracketPos);
        let solved=CaclNoBrackets(smallerEquation);
        let newEquation=equation.slice(0,leftBrackPos);
        newEquation.push(solved[0]);
        newEquation=newEquation.concat(equation.slice(rightBracketPos+1,equation.length));
        equation=newEquation;
        }
    if(equation.includes("(")){
        return(calcWithBrackets(equation));
    }else{
        let solved=CaclNoBrackets(equation);
        return(solved[0]);
    }

}

function handleSpecialOperators(equation){
    const operators=["sin","cos","tan","log","ln","sqrt"];
    if(!operators.some(element => equation.includes(element))){
        return(equation);
    }

    let index=-1;
    for(let i=equation.length-1 ;i>=0;i--){
        if(operators.includes(equation[i])){
            index=i;
            break;
        }
    }

    const leftIndex=index+1;
    let rightIndex=-1;
    let leftCount=1;
    let rightCount=0;
    for(let i=leftIndex+1;i<equation.length;i++){
        if(equation[i]=="("){
            leftCount++;
        }else if(equation[i]==")"){
            rightIndex=i;
            rightCount++;
        }
        if(rightCount==leftCount){
            break;
        }
    }

    let newEquation=equation.slice(leftIndex+1,rightIndex);
    newEquation=calcWithBrackets(newEquation);
    let newEquationArray=[equation[index],newEquation];
    const output=singleValCalc(newEquationArray);
    let finalEquation=equation.slice(0,index);
    finalEquation.push(output);
    finalEquation=finalEquation.concat(equation.slice(rightIndex+1,equation.length));
    equation=finalEquation;

    return(handleSpecialOperators(equation));



}
function Calculate(){
    const expression=WriteLoc.value;
    if(checkBalanced(expression)){
        let eqs=cleanUpEquation(expression);
        if(eqs.length>2){
            eqs=handleSpecialOperators(eqs);
            WriteLoc.value=calcWithBrackets(eqs);
        }
    


    }else{
        WriteLoc.value="UNBALANCED BRACKETS"
    }



    CompletedCalc=true;
}