import {canNotBeVoid, canNotBeCero, canNotBeNegative} from './errors.js';
const input = document.getElementsByClassName('inputs__input');
let CURRENT_LANGUAGE = undefined;

const addition = (int1, int2) => {return parseFloat(int1) + parseFloat(int2)};
export const multiplication = (int01, int02) => {return parseFloat(int01) * parseFloat(int02)};
export const division = (int_1, int_2) => {return (parseFloat(int_1) / parseFloat(int_2))};

const conditions = {
    "": new canNotBeVoid('Some input value is missing.'),
    0: new canNotBeCero('Some input value is cero.')
};

const errorFunction = {
    none: {
        fn: canNotBeVoid,
        es: "Rellena todas las casillas.",
        en: "Fill up all the boxes."
    },
    cero: {
        fn: canNotBeCero,
        es: "Valor ingresado, no puede ser cero.",
        en: "Entered value, can't be cero."
    },
    negative: {
        fn: canNotBeNegative,
        es: "Valor ingresado, no puede ser negativo.",
        en: "Entered value, can't be negative."
    }
};

function tryErrors() {

    Object.entries(conditions).forEach(([val, fn]) => {
        for(let element of input) {
            if (element.value == val) throw fn;
            if (element.value < 0 ) throw new canNotBeNegative('Some input value is negative');
        };
    }); 
}; 

function catchErrors(err, lang) {

    const errorValue = Object.values(errorFunction).map((value) => {return value});
    for (let item of errorValue) {

        if (err instanceof item.fn) {
            if (lang == "ES") CURRENT_LANGUAGE = item.es;
            else CURRENT_LANGUAGE = item.en;
            alert(CURRENT_LANGUAGE);
            throw err;
        };
    }
};

export function conveyor(lang) {

    try {tryErrors()} 
    catch(error) {catchErrors(error, lang)};
    let hp = null
    let kw = null
    
    
    if (lang === 'ES'){
        if (input[3].value < 1) {
            let add = addition(input[0].value, input[1].value);
            let mult0 = multiplication(add, 9.77);
            let mult1 = multiplication(mult0, input[3].value);
            let mult2 = multiplication(mult1, input[2].value);
            kw = division(mult2, 1000).toFixed(2);
            hp = multiplication(mult2, 0.0013404).toFixed(2);
        } else alert('El coeficiente de fricción, debe ser menor a 1')
    } else {
        if (input[3].value < 1) {
            let add = addition(input[0].value, input[1].value);
            let mult1 = multiplication(add, input[3].value);
            let mult2 = multiplication(mult1, input[2].value);
            hp = division(mult2, 550).toFixed(2)
            let mult3= multiplication(hp, 745.7);
            kw = division(mult3, 1000).toFixed(2)
        } else alert('Friction coefficient, must be minor to 1')
    }
    return [hp, kw];
};
export function conveyorInclined(lang) {

    try {tryErrors();} 
    catch(error) {
        catchErrors(error, lang);
        return error;
        // throw error;
    };
    let add1 = addition(input[0].value, input[1].value);
    if ((input[5].value >= 1) && lang == "ES") {
        alert('El coeficiente de fricción, debe ser menor a 1')
        return
    }
    if (input[5].value >= 1 && lang == "EN") {
        alert('Friction coefficient, must be minor to 1')
        return
    }
    let mult01 = multiplication(add1, input[5].value);
    let div = undefined;
    let numb = undefined;
    if (lang == "EN") {
        div = division(input[0].value, input[2].value);
        numb = 33000;
    } else {  
        div = division(add1, input[2].value);
        numb = 4573.17; 
    }
    let mult02 = multiplication(div, input[4].value);
    let add2 = addition(mult01, mult02);
    let mult03 = multiplication(add2, input[3].value);
    let hp1 = division(mult03, numb).toFixed(2);
    let kw1 = (hp1 * 0.7457).toFixed(2);
    return [hp1, kw1];
};
export function winch(lang) {
    
    try {tryErrors();} 
    catch(error) {
        catchErrors(error, lang);
        throw error;
    };
    let kw01 = null;
    let hp01 = null;
    if (lang === 'ES') {
        let mult_1= multiplication(input[0].value, 9.77);
        let mult_2 = multiplication(mult_1, input[1].value);
        kw01 = division(mult_2, 1000).toFixed(2);
        hp01 = ((kw01 * 1000) / 745.7).toFixed(2);
    } else {
        let mult_1 = multiplication(input[0].value, input[1].value);
        hp01 = division(mult_1, 550).toFixed(2);
        let mult_2 = multiplication(hp01, 745.7);
        kw01 = division(mult_2, 1000).toFixed(2);
    }
    
    return [hp01, kw01];
};