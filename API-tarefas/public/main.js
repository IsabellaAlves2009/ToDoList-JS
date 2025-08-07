const body = document.querySelector('body')
const div = document.createElement('div');
const text = document.querySelector('h3');
const buttonCreateList = document.getElementById('buttonCreateList');
const section = document.querySelector('section');
const createList = document.createElement('div');
const tarefa = document.createElement('input');
const prazo = document.createElement('input');
const sair = document.createElement('input');
const salvar = document.createElement('input');

createList.className = 'createList';

tarefa.type = 'text';
tarefa.placeholder = 'Tarefa';
tarefa.maxLength = '60';
tarefa.id = 'nomeTarefa';
tarefa.value = '';

prazo.type = 'date';
prazo.id = 'prazoTarefa';
prazo.placeholder = 'Prazo';

salvar.type = 'submit';
salvar.id = 'add';
salvar.value = 'Criar tarefa';

sair.type = 'submit';
sair.id = 'leave';
sair.value = 'Cancelar';

section.appendChild(createList);
createList.appendChild(tarefa);
createList.appendChild(prazo);
createList.appendChild(div);
div.appendChild(salvar);
div.appendChild(sair);

buttonCreateList.addEventListener('click', () => {
    createList.style.display = 'flex';
    tarefa.focus();
});

buttonCreateList.addEventListener('mouseover', () => {
    buttonCreateList.classList.add('ca__fx-hop');
    buttonCreateList.addEventListener('mouseout', () => {
        buttonCreateList.classList.remove('ca__fx-hop');
    }, { once: true });
});

sair.addEventListener('click', () => {
    createList.style.display = 'none';
});

function atualizarTextoVazio() {
    const divList = document.querySelector('.divList');
    const tarefasAtivas = divList.querySelectorAll('.list').length;
    text.style.display = tarefasAtivas === 0 ? 'block' : 'none';
}

function mudarModo() {
    const mode = document.getElementById('mode');
    const imgMode = document.createElement('img');
    if (!body.className === '') {
        imgMode.src = '/'; // define melhor essa lógica depois
    }
}

async function salvarTarefaNoBanco(titulo, prazo) {
    try {
        const response = await fetch('/api/tarefas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, prazo })
        });
        if (!response.ok) {
            alert('Erro ao salvar no servidor');
        }
    } catch (err) {
        console.error('Erro de conexão com o backend', err);
    }
}

function add() {
    let valor = tarefa.value.trim();
    let prazoValor = prazo.value;

    if (valor === '') {
        alert('Por favor, preencha o campo');
        return;
    }

    const divList = document.querySelector('.divList');
    const list = document.createElement('div');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const dataPrazo = document.createElement('p');
    const feito = document.createElement('button');
    const deletar = document.createElement('button');
    const imgcheck = document.createElement('img');
    const imgdelete = document.createElement('img');

    list.className = 'list';
    p.textContent = valor;

    dataPrazo.className = 'data';
    dataPrazo.innerHTML = prazoValor ? `Prazo: <br>${prazoValor}` : 'Sem prazo';

    feito.className = 'check';
    imgcheck.src = '/assets/check_24dp_1ED760_FILL0_wght400_GRAD0_opsz24.svg';
    deletar.className = 'delete';
    imgdelete.src = '/assets/delete_24dp_F71E1E_FILL0_wght400_GRAD0_opsz24.svg';

    divList.appendChild(list);
    list.appendChild(p);
    list.appendChild(dataPrazo);
    list.appendChild(div);
    div.appendChild(feito);
    div.appendChild(deletar);
    feito.appendChild(imgcheck);
    deletar.appendChild(imgdelete);

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push({ titulo: valor, prazo: prazoValor });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    salvarTarefaNoBanco(valor, prazoValor);

    createList.style.display = 'none';
    tarefa.value = '';
    prazo.value = '';

    deletar.addEventListener('click', () => {
        list.remove();
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas = tarefas.filter(t => t.titulo !== valor);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        atualizarTextoVazio();
    });

    atualizarTextoVazio();
}

salvar.addEventListener('click', (e) => {
    e.preventDefault();
    add();
});

window.onload = async function () {
    const divList = document.querySelector('.divList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefaObj => {
        const checkAll = document.getElementById('checkAll').addEventListener('click', () => {
            document.querySelectorAll('.tarefa input[type="checkbox"]').forEach(cb => {
              cb.checked = true;
            });
          });
        const list = document.createElement('div');
        const div = document.createElement('div');
        const p = document.createElement('p');
        const dataPrazo = document.createElement('p');
        const feito = document.createElement('button');
        const deletar = document.createElement('button');
        const imgcheck = document.createElement('img');
        const imgdelete = document.createElement('img');

        list.className = 'list';
        p.textContent = tarefaObj.titulo;

        dataPrazo.className = 'data';
        dataPrazo.innerHTML = tarefaObj.prazo
            ? `Prazo:<br><span style="font-size: 12px;">${tarefaObj.prazo}</span>`
            : 'Sem prazo';

        feito.className = 'check';
        imgcheck.src = '/assets/check_24dp_1ED760_FILL0_wght400_GRAD0_opsz24.svg';
        deletar.className = 'delete';
        imgdelete.src = '/assets/delete_24dp_F71E1E_FILL0_wght400_GRAD0_opsz24.svg';

        divList.appendChild(list);
        list.appendChild(p);
        list.appendChild(dataPrazo);
        list.appendChild(div);
        div.appendChild(feito);
        div.appendChild(deletar);
        feito.appendChild(imgcheck);
        deletar.appendChild(imgdelete);

        deletar.addEventListener('click', () => {
            list.remove();
            let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            tarefas = tarefas.filter(t => t.titulo !== tarefaObj.titulo);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            atualizarTextoVazio();
        });

        feito.addEventListener('click', () => {
            feito.style.backgroundColor = 'rgba(107, 106, 106, 0.5)';
            feito.disabled = true;
            feito.style.cursor = 'not-allowed';
            p.style.textDecoration = 'line-through';
            dataPrazo.style.textDecoration = 'line-through';
            p.style.opacity = '0.6';
        });
    });

    atualizarTextoVazio();
};

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = input.value.trim();
  if (nome === '') return;

  const resposta = await fetch('/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome })
  });

  const novaTarefa = await resposta.json();
  console.log('Tarefa criada:', novaTarefa);

  input.value = '';
});