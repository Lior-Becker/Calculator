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
const button0=document.getElementById("0");
const button1=document.getElementById("1");
const button2=document.getElementById("2");
const button3=document.getElementById("3");
const button4=document.getElementById("4");
const button5=document.getElementById("5");
const button6=document.getElementById("6");
const button7=document.getElementById("7");
const button8=document.getElementById("8");
const button9=document.getElementById("9");
const buttonPlus=document.getElementById("plus");
const buttonEquals=document.getElementById("equals");
const buttonSub=document.getElementById('sub');
const buttonMult=document.getElementById('mult');
const buttonDiv=document.getElementById("div");
const buttonUndo=document.getElementById("undo");
const buttonLBracket=document.getElementById("lBracket");
const buttonRBracket=document.getElementById("rBracket");
const buttonPow=document.getElementById("pow");
const buttonSqrt=document.getElementById("sqrt");
const buttonSin=document.getElementById("sin");
const buttonCos=document.getElementById("cos");
const buttonTan=document.getElementById("tan");
const buttonLog=document.getElementById("log");
const buttonLn=document.getElementById("ln");
const buttonNeg=document.getElementById("neg")
const buttonDeci=document.getElementById("decimal");

button0.addEventListener("click",WriteNumToScreen);
button1.addEventListener("click",WriteNumToScreen);
button2.addEventListener("click",WriteNumToScreen);
button3.addEventListener("click",WriteNumToScreen);
button4.addEventListener("click",WriteNumToScreen);
button5.addEventListener("click",WriteNumToScreen);
button6.addEventListener("click",WriteNumToScreen);
button7.addEventListener("click",WriteNumToScreen);
button8.addEventListener("click",WriteNumToScreen);
button9.addEventListener("click",WriteNumToScreen);
buttonPlus.addEventListener("click",WriteNumToScreen);
buttonSub.addEventListener('click',WriteNumToScreen);
buttonDiv.addEventListener('click',WriteNumToScreen);
buttonMult.addEventListener('click',WriteNumToScreen);
buttonLBracket.addEventListener('click',WriteNumToScreen);
buttonRBracket.addEventListener('click',WriteNumToScreen);
buttonPow.addEventListener('click',WriteNumToScreen);
buttonSqrt.addEventListener('click',WriteNumToScreen)
buttonSin.addEventListener("click", WriteNumToScreen);
buttonCos.addEventListener("click", WriteNumToScreen);
buttonTan.addEventListener("click", WriteNumToScreen);
buttonLog.addEventListener("click", WriteNumToScreen);
buttonLn.addEventListener("click", WriteNumToScreen);
buttonNeg.addEventListener("click",WriteNumToScreen);
buttonDeci.addEventListener("click",WriteNumToScreen)


document.addEventListener('keydown',checkKey)
buttonEquals.addEventListener("click",Calculate);
buttonUndo.addEventListener('click',Undo);

const keyToEvent = {
    '0': button0,
    '1': button1,
    '2': button2,
    '3': button3,
    '4': button4,
    '5': button5,
    '6': button6,
    '7': button7,
    '8': button8,
    '9': button9,
    "+": buttonPlus,
    "=":buttonEquals,
    "-":buttonSub,
    "/":buttonDiv,
    "(":buttonLBracket,
    ")":buttonRBracket,
    "Backspace":buttonUndo,
    "Enter":buttonEquals,
    "^":buttonPow,
    ".":buttonDeci,
    "*":buttonMult,
    "n":buttonNeg,
    "N": buttonNeg,
    "r":buttonSqrt,
    "R":buttonSqrt,
    "l":buttonLog,
    "L":buttonLn

};



function checkKey(e){
    if(e.key in keyToEvent){
        keyToEvent[e.key].click();
    }
}
function isNum(num){
    return(num>='0' && num<='9');
}
function WriteNumToScreen(){
    if(CompletedCalc){
        WriteLoc.value="";
        CompletedCalc=false;
    }
    if(isNum(this.id)){
        WriteLoc.value+=this.id;
    }
    else{
        WriteLoc.value+=conversions[this.id];
    }
}
function Undo(){
    WriteLoc.value=WriteLoc.value.substring(0,WriteLoc.value.length-1);
}
function parse(str){
    return Function(`'use strict'; return (${str})`)();
}
function checkBalanced(str){
    let stack=0
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

function invisibleConversions(exp){
    for (const check of checkInvis){
        if(exp.includes(check)){
            exp=exp.replaceAll(check,NonVisibleConversions[check] );
        }
    }
    return exp;
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
    let result=0
    let error="null"
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
    let retVal=0
    let error="null"
    switch (operator){
        case "sin":
            retVal=Math.sin(num);
            break;
        case "cos":
            retVal = Math.cos(num);
            break;
        case "tan":
            if(num%90==0){
                error="Error: Invalid Value";
            }else{
            retVal = Math.tan(num);
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
                error="Error: Invalue";

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
operations=["/","^","*","+","—"];
for (let operationVal=0;operationVal<operations.length;operationVal++){
    if(equation.includes(operations[operationVal])){
        if(equation.length==1){
            return(equation);
        }
        for (let i=0;i<equation.length;i++){
            if(equation[i]==operations[operationVal]){
                tempList=[equation[i-1],equation[i],equation[i+1]];
                Solved=twoValCalc(tempList);
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
    //find the innermost brackets
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
        console.log(rightBracketPos,equation);
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
    operators=["sin","cos","tan","log","ln","sqrt"]
    if(!operators.some(element => equation.includes(element))){
        return(equation);
    }

    index=-1;
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
    expression=WriteLoc.value;
    if(checkBalanced(expression)){
        eqs=cleanUpEquation(expression);
        if(eqs.length>2){
            eqs=handleSpecialOperators(eqs);
            WriteLoc.value=calcWithBrackets(eqs);
        }
    


    }else{
        WriteLoc.value="UNBALANCED BRACKETS"
    }



    CompletedCalc=true;
}