

function animar_frente ({
    idBotao, totalPassos, framesPorPasso, duracao = 1
}) {
    const botao = document.getElementById(idBotao)
    const img = botao.parentElement.querySelector('img')

    let intervalo = null

    function tocar () {
        if (botao.classList.contains('tocando')) return

        let passoAtual = Number(img.dataset.passo)
        if (img.dataset.passo > passoAtual) return

        botao.classList.add('tocando')
        let frame = 1

        intervalo = setInterval(() => {
            
            let indice = frame.toString().padStart(2, '0')
            img.src = `../assets/imagens/sla/passo${passoAtual}/frame_${indice}.png`
            frame++

            if (frame > framesPorPasso) {
                clearInterval(intervalo)
                botao.classList.remove('tocando')

                if (passoAtual <= totalPassos) {
                    img.dataset.passo++
                }
            }
        }, duracao * 1000 / framesPorPasso);
    }
    botao.addEventListener('click', tocar)
}

function animar_tras ({
    idBotao, framesPorPasso, duracao = 1
}) {

    const botao = document.getElementById(idBotao)
    const img = botao.parentElement.querySelector('img')

    let intervalo = null

    function tocar () {

        if (botao.classList.contains('tocando')) return
        if (img.dataset.passo <= '1') return

        botao.classList.add("tocando")

        let frame = 1
        let passoAtual = Number(img.dataset.passo)

        intervalo = setInterval(() => {
            
            let indice = (framesPorPasso - frame + 1).toString().padStart(2, '0')
            img.src = `../assets/imagens/sla/passo${passoAtual-1}/frame_${indice}.png`
            frame++

            if (frame > framesPorPasso) {
                clearInterval(intervalo)
                botao.classList.remove("tocando")

                if (passoAtual > 1) {
                    img.dataset.passo--
                }            
            }

        }, duracao * 1000 / framesPorPasso);

    }
    
    botao.addEventListener("click", tocar)

}