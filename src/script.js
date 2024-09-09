// if (typeof window !== 'undefined') {
import titlesJson from '../languages/titles.json';
import {conveyor, conveyorInclined, winch} from './utils/fn_computes.js';
import {systemConverter, unitValue} from './utils/fn_converter.js';
///////////////////////////////////////////////////////////
const switchMain = document.getElementById('switch');
const switchLightButton = document.getElementById('header__button');
const iconSwitchLight = document.querySelectorAll('.header__button i');
const content = document.querySelector('.content');
const h1 = document.querySelector('.header__h1');
const titles = [...document.getElementsByClassName('inputs__title')];
const calculateDark = document.querySelector('.inputs__calculate');
const arrowContainer = document.querySelector('.conversor__arrow');
const menuSystem = document.querySelector('.header__menu-title');
const arrowIcon = document.querySelector('.bxs-down-arrow');
const paragraphs = document.querySelectorAll('.conversor__paragraph');
const converterInput = document.querySelectorAll('.conversor__input');
const buttonSystems = [...document.getElementsByClassName('header__button-system')];
///////////////////////////////////////////////////////////
const unitConverterContent = document.getElementById('conversor__content');
const titleConverter = document.querySelector('.conversor__title');
const unitConverter = document.querySelectorAll('.conversor__unit');
const arrowDownIcon = document.querySelector('.conversor__arrow i');
///////////////////////////////////////////////////////////
const systemsMenu = document.querySelector('.header__menu');
const systemsImages = document.querySelectorAll('.system__images img');
///////////////////////////////////////////////////////////
const systemInputs = document.querySelector('.inputs');
let input = Array.from(systemInputs.children);
///////////////////////////////////////////////////////////
const parameters = document.querySelector('.inputs__table');
const results = document.querySelector('.inputs__table1');
///////////////////////////////////////////////////////////
const menuButton = document.querySelector('.header__menu-button');
const menuIcons = document.querySelectorAll('.header__menu-button i');
///////////////////////////////////////////////////////////
const powerOutputs = document.getElementsByClassName('inputs__output');
///////////////////////////////////////////////////////////
const calculate = document.querySelector('.inputs__calculate');
///////////////////////////////////////////////////////////
const languageButton = document.getElementById('language');
const dataLanguageValue = document.querySelectorAll('[data-value]');
///////////////////////////////////////////////////////////

const items1 = {
    'header__h1--dark-mode': h1,
    'background_content': content,
    'inputs__calculate--dark-mode': calculateDark,
    'conversor__title--dark-mode': titleConverter,
    'conversor__arrow--dark-mode': arrowContainer,
    'header__button--dark-mode': switchLightButton,
    'header__language--dark-mode': languageButton,
    'header__menu-button--dark-mode': menuButton,
    'header__menu-title--dark-mode': menuSystem,
    'conversor__content--dark-mode': unitConverterContent,
    'bxs-down-arrow--dark-mode': arrowIcon,
    'deploy_menu--dark-mode': systemsMenu
};

const items2 = {
    'bx--dark-mode': menuIcons,
    'change_light': iconSwitchLight,
    'inputs__title--dark-mode': titles,
    'conversor__input--dark-mode': converterInput,
    'conversor__paragraph--dark-mode': paragraphs,
    'header__button-system--dark-mode': buttonSystems
}

switchLightButton.addEventListener('click', () => {

    const h3 = document.querySelectorAll('.inputs__h3');
    h3.forEach((title) => title.classList.toggle('inputs__h3--dark-mode'));
    Object.entries(items1).forEach(([attribute, element]) => element.classList.toggle(attribute));
    Object.entries(items2).forEach(([att, items]) => items.forEach((item) => item.classList.toggle(att)));
});

titleConverter.addEventListener('click', () => {
    unitConverter.forEach((unit) => unit.classList.toggle('conversor_fold'));
    arrowDownIcon.classList.toggle('arrow_rotate');
});

const splitTitles = (text) => {return text.split(" ")};

function removeTableElements(elements) {

    let collection = Array.from(elements.children);
    collection.forEach((element) => element.remove());
    return elements;
};

function createTableElements(table, t, l) {
    
    for (let i = 0; i < l; i++) {
        
        let newSubTable = document.createElement('div');
        newSubTable.className = 'inputs__div';

        let newSubTitle = document.createElement('h3');
        newSubTitle.className = 'inputs__h3';
        newSubTitle.innerText = splitTitles(t[i])[0] + "\n" + splitTitles(t[i])[1];

        let condition = switchLightButton.className
        if (condition === 'header__button header__button--dark-mode') newSubTitle.classList.add('inputs__h3--dark-mode'); 
        else newSubTitle.classList.remove('inputs__h3--dark-mode'); 

        let newInput = undefined;

        if (table.id == "table") {

            newInput = document.createElement('input');
            newInput.type = 'number';
            newInput.className = 'inputs__input';
        } else {

            newInput = document.createElement('output');
            newInput.className = 'inputs__output';
        };
        newInput.id = i;
        newSubTable.append(newSubTitle, newInput);
        table.append(newSubTable);
    };
    return table;
};

function changeTitlesLanguage(table) {

    try{
        let inc = 1;
        let lg = table.lang;

        if (lg !== undefined) {
            let container = Array.from(table.children)
            container.forEach((title) => {
    
                if (table.id == "table") {
                    let system = table.attributes[3].nodeValue;
                    let txt1 = titlesJson[`titles1-${lg}`][system][inc];
                    title.firstElementChild.innerText = splitTitles(txt1)[0] + "\n" + splitTitles(txt1)[1];
                } else {
                    let txt2 = titlesJson[`titles2-${lg}`][inc];
                    title.firstElementChild.innerText = splitTitles(txt2)[0] + "\n" + splitTitles(txt2)[1];
                };
                inc += 1;
            });
        } else throw new Error('lg undefined is not allowed');
    } catch (error){
        return error;
    }  
};

function getTitlesJson(tab1, sys, lim) {
 
    let txt = [];
    if (tab1.id == "table") {
        for (let i = 1; i <= lim; i++) txt.push(titlesJson[`titles1-${tab1.lang}`][sys][i]);
    } else {
        for (let j = 1; j <= lim; j++) txt.push(titlesJson[`titles2-${tab1.lang}`][j]);
    };
    return txt;
};

function modifyTableContent(table, system, limit) {

    let emptyTable = removeTableElements(table);
    let newTitles = getTitlesJson(table, system, limit);
    let newTable = createTableElements(emptyTable, newTitles, limit);
    return newTable;
};

systemsMenu.addEventListener('click', (ev) =>{
    // const systems = {'conveyor': 4, 'inclined': 6, 'winch': 2, 'pump': 3};
    const systems = {'conveyor': 4, 'inclined': 6, 'winch': 2};
    let object = Object.entries(systems).find(([system, numb]) => system == ev.target.name);
    input[0].insertAdjacentElement('afterend', modifyTableContent(parameters, object[0], object[1]));
    input[3].insertAdjacentElement('afterend', modifyTableContent(results, "N/A", 4));
    calculate.id = ev.target.name;
    parameters.attributes[3].nodeValue = ev.target.name;
    systemsImages.forEach((btn) => {
        btn.alt == ev.target.name ? btn.classList.add('z_index'): btn.removeAttribute('class');
    });
});

menuButton.addEventListener('click', () => {
    systemsMenu.classList.toggle('deploy_menu');
    menuIcons.forEach((icon) => icon.classList.toggle('change_icon'));
});


unitConverterContent.addEventListener('keyup', (ev) => {
  
    let langConversor = ev.target.parentElement.parentElement.lang;
    let value = Object.values(systemConverter[ev.target.id]).map((sysUnit) => {
        return sysUnit;
    });
    unitValue(value[0], value[1], value[2], value[3], langConversor, ev);
});
const comercialHp = [0.18, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5.5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 180]
const comercialKw = [0.12, 0.18, 0.25, 0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132]

calculate.addEventListener('click', (ev) =>{

    const objectSystem = {"conveyor": conveyor, "inclined": conveyorInclined, "winch": winch};
    let language = parameters.lang;
    const fnSystem = objectSystem[ev.target.id];

    let [powerHp, powerKw] = fnSystem(language);
    const valueHp = comercialHp.find((value) => value > powerHp)
    const valueKw = comercialKw.find((value) => value > powerKw)
    powerOutputs[0].innerText = powerHp;
    powerOutputs[1].innerText = valueHp;
    powerOutputs[2].innerText = powerKw;
    powerOutputs[3].innerText = valueKw;
});

const changeAppLanguage = async (lang) => {
    try{
        if (lang !== undefined) {

            const response = await fetch(`./languages/${lang}.json`);
            const textLang = await response.json();

            dataLanguageValue.forEach((lng) => {
                const section = lng.dataset.section;
                const value = lng.dataset.value
                lng.innerText = textLang[section][value];
            });
        } else {
            const switchArray = Array.from(switchMain.children);
            switchArray.forEach((sw) => sw.classList.remove('change_light'));
            throw new Error('lang value is undefined');
        }
    } catch (error){
        console.error(error);
        throw error;
    }  
};

let containers = [parameters, results, unitConverterContent];

languageButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    const childrens =Array.from(ev.target.parentElement.children);
    childrens.forEach((child) => child.classList.toggle('change_light'));
    changeAppLanguage(ev.target.dataset.lang);
    containers.forEach((element) => element.lang = ev.target.dataset.lang);
    changeTitlesLanguage(parameters);
    changeTitlesLanguage(results);
});