const hamburguer = document.getElementById('hamburguer')
const menu = document.getElementById('menu-conteiner')
const cabecalho = document.querySelector('header')
const main = document.querySelector('main')
const botoes_topico = document.querySelectorAll('#menu .abrir-topico')
const botao_escuro = document.getElementById('modo-escuro')
const rodape = document.querySelector('footer')
const body = document.querySelector('body')
const links_menu = document.querySelectorAll('#menu a')

// coloca o menu abaixo do header
const observador = new ResizeObserver(() => {
    menu.style.top = `${cabecalho.offsetHeight}px`
})

observador.observe(cabecalho)


// funções para mover o menu lateralmente
function moverMenu () {
    menu.classList.toggle('ativo')
    main.classList.toggle('overlay')
    rodape.classList.toggle('overlay')
}

function fecharMenu () {
    if (menu.classList.contains('ativo')) {
        moverMenu()
    }
}

if (hamburguer) {

    // caso clique no botão
    hamburguer.addEventListener('click', moverMenu)

    // caso o menu esteja ativo e clique fora
    main.addEventListener('click', fecharMenu)

    rodape.addEventListener('click', fecharMenu)

}

// Feito para abrir e fechar os tópicos de navegação
botoes_topico.forEach((botao) => {
    botao.addEventListener('click', () => {
        const li = botao.closest('li')
        const submenu = li.querySelector('.submenu')
        submenu.classList.toggle('aberto')
    })
})

// Caso selecione algum link do menu, fechar o menu
links_menu.forEach((link) => {
    link.addEventListener('click', () => {
        fecharMenu()
    })
})


// verifica qual tema estava sendo usado
const tema = localStorage.getItem('tema')

// muda automáticamente para o tema que foi escolhido na outra página ou antes de recarregar
if (tema === 'escuro') {
    botao_escuro.classList.remove('fa-moon')
    botao_escuro.classList.add('fa-sun')
    body.classList.add('escuro')
}

// Modo escuro
if (botao_escuro) {
    botao_escuro.addEventListener('click', () => {
        botao_escuro.classList.toggle('fa-moon')
        botao_escuro.classList.toggle('fa-sun')
        body.classList.toggle('escuro')

        // altera a memóra da página
        const estaEscuro = body.classList.contains('escuro')
        localStorage.setItem('tema', estaEscuro ? 'escuro' : 'claro')
    })
}
