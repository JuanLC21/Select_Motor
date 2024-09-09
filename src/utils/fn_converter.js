const inConverter = [...document.getElementsByClassName('conversor__input')];
import { division, multiplication } from "./fn_computes.js";
export const systemConverter = {
    lb: {
        fn: division, 
        positionA: 0, 
        positionB: 1, 
        k: 2.20462234
    },
    kg: {
        fn: multiplication, 
        positionA: 1, 
        positionB: 0, 
        k: 2.20462234
    },
    ft: {
        fn: multiplication, 
        positionA: 2, 
        positionB: 3, 
        k: 0.3048
    },
    m: {
        fn: division, 
        positionA: 3, 
        positionB: 2, 
        k: 0.3048
    },
    'ft/s': {
        fn: multiplication, 
        positionA: 4, 
        positionB: 5, 
        k: 0.3048
    },
    'm/s': {
        fn: division, 
        positionA: 5, 
        positionB: 4, 
        k: 0.3048
    }
};
const regex = /\d{7}/;
export function unitValue(fn, posA, posB, k, lang) {

    if (inConverter[posA].value !== "") {
        
        if (!regex.test(inConverter[posA].value)){
            inConverter[posB].value = fn(inConverter[posA].value, k).toFixed(2);
        } else {
            lang == "EN" ? alert("Do not enter more than 6 digits") : alert("No ingreses más de 6 digitos");
            if (inConverter[posA].value.length >= 8) inConverter.forEach(pos => pos.value = ""); 
        };
    } else inConverter[posB].value = "";
};
