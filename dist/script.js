"use strict";
const localStorageKey = 'tasks';
function validateIfExist() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const inputElement = document.getElementById('inputNewTask');
    if (!inputElement) {
        throw new Error("Elemento com id 'inputNewTask' não encontrado");
    }
    let inputValue = inputElement.value;
    let exists = values.find((x) => x.name === inputValue);
    return exists ? true : false;
}
function newTask() {
    const input = document.getElementById('inputNewTask');
    if (!input) {
        throw new Error("Elemento com id 'inputNewTask' não encontrado");
    }
    if (!input.value) {
        alert('Não há informação');
    }
    else if (validateIfExist()) {
        alert('Já existe uma tarefa com esse nome!');
    }
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}
function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const list = document.getElementById('task-List');
    if (!list) {
        throw new Error("Elemento com id 'task-List' não encontrado");
    }
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><span class="material-symbols-outlined">check</span></button></li>`;
    }
}
function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex((x) => x.name === data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}
showValues();
