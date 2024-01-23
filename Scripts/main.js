let CompletedCalc=false
const CheckVals=["+","-","*","/","^","sqrt","(",")","sin","cos","tan"]
const checkInvis=["sqrt","^","sin","cos","tan"]
const conversions={
    "plus":"+",
    "sub":"-",
    "div":"/",
    "mult":"*",
    "lBracket":"(",
    "rBracket":")",
    "pow":"^",
    "sqrt":"sqrt("
}
const NonVisibleConversions={
    "sqrt":"Math.sqrt",
    "^":"**",
    "sin":"math.sin",
    "cos":"Math.cos",
    "tan":"Math.tan"

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
    "^":buttonPow
};



function checkKey(e){
    console.log(e.key)
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
    const operators = ['+', '-', '*', '/', '^',"sin","cos","tan","sqrt"];
    const parentheses=["(",")"];
    const Remove=["", " "];
    let result='';
    for (const curr of exp){
        if(operators.includes(curr) || parentheses.includes(curr)){
            result+=` ${curr} `;
        }else{
            result+=curr;
        }
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
        case '-':
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
    const operator=parseFloat(partial_exp[0]);
    const num=partial_exp[2];
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
// function bracketCalculation(equation){
//     if(equation.length==1){
//         return equation;
//     }

//     let startPos=-1;
//     let endPos=-1;
//     for(let i=0;i<equation.length;i++){
//         if(equation[i]=="("){
//             startPos=i;
//         }else if(equation==")" && startPos!=-1){
//             endPos=i;
//             break;
//         }
//     }

// }

function CaclNoBrackets(equation){
operations=["/","*","+","-"];
for (let operationVal=0;operationVal<operations.length;operationVal++){
    console.log(operations[operationVal])
    if(equation.includes(operations[operationVal])){
        if(equation.length==1){
            return(equation);
        }
        for (let i=0;i<equation.length;i++){ //the equation still has values in in, find
            if(equation[i]==operations[operationVal]){
                tempList=[equation[i-1],equation[i],equation[i+1]];
                Solved=twoValCalc(tempList);
                console.log(Solved);
                if(Solved.includes("Error")){
                    equation=[Solved];
                }else{
                    equation.splice(i-1,4,Solved);
                }
            }
        }

    }

}
return equation;



}


function Calculate(){
    expression=WriteLoc.value;
    if(checkBalanced(expression)){
        eqs=cleanUpEquation(expression);
        if(eqs.length>2){
            if(!eqs.includes("(")) //handles simplest case of no brackets
            WriteLoc.value=CaclNoBrackets(eqs);
        }
    


    }else{
        WriteLoc.value="UNBALANCED BRACKETS"
    }



    CompletedCalc=true;
}

/*
Note to self, to do the backspace better keep a tree of all buttons pressed and undo them in that order
for now we are just removing the last element in the string

make sure expression is valid
add:
sin
cos
tan
log
ln
make it look pretty

*/