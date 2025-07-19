const body = document.querySelector('body')
const div = document.createElement('div');
const text = document.querySelector('h3');
const buttonCreateList = document.getElementById('buttonCreateList')
const section = document.querySelector('section')
const createList = document.createElement('div')
const tarefa = document.createElement('input')
const sair = document.createElement('input')
const salvar = document.createElement('input')
createList.className = 'createList'
//informações dos elementos
tarefa.type = 'text';
tarefa.placeholder = 'Tarefa';
tarefa.maxLength = '60';
tarefa.id = 'nomeTarefa'
tarefa.value = ''

salvar.type = 'submit';
salvar.id = 'add'
salvar.value = 'Criar tarefa';

sair.type = 'submit';
sair.id = 'leave';
sair.value = 'Cancelar';

section.appendChild(createList)
createList.appendChild(tarefa)
createList.appendChild(div)
div.appendChild(salvar)
div.appendChild(sair)

buttonCreateList.addEventListener('click', () => {
    createList.style.display = 'flex'
    createList.focus();
})

sair.addEventListener('click', () => {
    createList.style.display = 'none';
})

function atualizarTextoVazio() {
    const divList = document.querySelector('.divList');
    const text = document.querySelector('h3');
    const tarefasAtivas = divList.querySelectorAll('.list').length
    if (tarefasAtivas === 0) {
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}


function add() {
    let valor = tarefa.value;
    if (valor === '') {
        alert('Por favor, preencha o campo')
        return
    }
    
   const divList = document.querySelector('.divList')
   const list = document.createElement('div')
   const div = document.createElement('div')
   const p = document.createElement('p')
   const feito = document.createElement('input');
   const deletar = document.createElement('input')
   list.className = 'list'
   p.innerText = valor
   feito.className = 'check'
   feito.value = 'Feito'
   feito.type = 'submit'
   deletar.className = 'delete'
   deletar.type = 'submit'
   deletar.value = 'Deletar'
   divList.appendChild(list)
   list.appendChild(p)
   list.appendChild(div)
   div.appendChild(feito)
   div.appendChild(deletar)
    
   let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
   tarefas.push(valor);
   localStorage.setItem('tarefas', JSON.stringify(tarefas));

   createList.style.display = 'none'
   deletar.addEventListener('click', () => {
    list.remove();

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter(t => t !== valor); 
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarTextoVazio()
});
    atualizarTextoVazio()
   return;
}

salvar.addEventListener('click', add)

window.onload = function () {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const divList = document.querySelector('.divList');

    tarefas.forEach(valor => {
        const text = document.querySelector('h3')
        const divList = document.querySelector('.divList')
        const list = document.createElement('div')
        const div = document.createElement('div')
        const p = document.createElement('p')
        const feito = document.createElement('input');
        const deletar = document.createElement('input')
        list.className = 'list'
        p.textContent = valor
        feito.className = 'check'
        feito.value = 'Feito'
        feito.type = 'submit'
        deletar.className = 'delete'
        deletar.type = 'submit'
        deletar.value = 'Deletar'
        divList.appendChild(list)
        list.appendChild(p)
        list.appendChild(div)
        div.appendChild(feito)
        div.appendChild(deletar)
        deletar.addEventListener('click', () => {
            list.remove();

            alert('tarefa deletada')

            let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            tarefas = tarefas.filter(t => t !== valor); 
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            createList.style.display = 'none'     
            atualizarTextoVazio()
        });
        feito.addEventListener('click', () => {
            feito.style.backgroundColor = ' rgba(107, 106, 106, 0.5)'
            feito.disabled = true
            feito.style.cursor = 'not-allowed'
            p.style.textDecoration = 'line-through';
            p.style.opacity = '0.6';  
        })
    });
    atualizarTextoVazio()
}