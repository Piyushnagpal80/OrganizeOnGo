#!/usr/bin/env node 
let inputArr= process.argv.slice(2);  
// console.log(inputArr);

let helpObj= require("./commands/help");
let organizeObj=require("./commands/organize");


let command = inputArr[0];

switch(command){
    case "organize":
        // organizeFn(inputArr[1]);
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        // helpFn();
        helpObj.helpKey();
        break;
    default:
        console.log("Please Enter Right Command !");
        break;
}











