const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
const quant = document.querySelector("#quantidade");
const itens = JSON.parse(localStorage.getItem('itens')) || [];
verificarElemento();

const redefinir = document.getElementById('resetar');
redefinir.addEventListener('click', () => {
    lista.innerHTML = '';
    itens.length = 0;
    localStorage.clear();
    verificarElemento();
});

itens.forEach(e => {
    criaElemento(e);
});

form.addEventListener('submit', evento => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    if(quantidade.value === '') quantidade.value = 1;
    
    quant.style.backgroundColor = "white";
    quant.removeAttribute('placeholder');
    if(quantidade.value > 999 || quantidade.value < 0) {
        quant.style.backgroundColor = "red";
        quant.setAttribute('placeholder', 'O número dever ser menor que 1000 e maior que 0');
        quant.value = '';
        return;
    }

    const existe = itens.find(e => e.nome === nome.value);
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    if(existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1].id +1) : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));
    verificarElemento();

    nome.value = "";
    quantidade.value = "";
    nome.focus();
});

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.append(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener('click', function() {
        deletarElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletarElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(e => e.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
    verificarElemento();
}

function verificarElemento() {
    itens.length !== 0 ? lista.style.display = 'flex' : lista.style.display = 'none';
}
