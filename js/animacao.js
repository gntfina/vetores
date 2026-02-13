

function animar_frente ({
    caminho, idBotao, totalPassos, framesPorPasso, duracao = 1
}) {
    // Pegar o botão e a imagem
    const botao = document.getElementById(idBotao)
    const img = botao.closest('figure').querySelector('img')

    // Cria a variável do intervalo
    let intervalo = null

    // Função que será chamada quando o botão for precionado
    function tocar () {

        // Impede de começar uma animação antes que a anterior termine
        if (img.classList.contains('tocando')) return

        // Verifica se é uma animação válida de acordo com o passo atual
        let passoAtual = Number(img.dataset.passo)
        if (passoAtual > totalPassos) return

        // Define o começo da animação
        img.classList.add('tocando')
        let frame = 1

        // Loop
        intervalo = setInterval(() => {
            
            // Transforma o frame em um índice válido de acordo com o nome do arquivo
            let indice = frame.toString().padStart(2, '0')
            // Muda a imagem
            img.src = `${caminho}/passo${passoAtual}/frame_${indice}.png`
            // muda o índice do frame
            frame++

            // Checa para ver se chegou ao último frae
            if (frame > framesPorPasso) {
                // Termina o loop
                clearInterval(intervalo)

                // Termina a animação
                img.classList.remove('tocando')

                // Verifica se podemos ir ao próximo passo ou se chegamos ao último
                if (passoAtual <= totalPassos) {
                    img.dataset.passo++
                }
            }
        },
        // duração de cada animação em segundos
        duracao * 1000 / framesPorPasso);
    }
    botao.addEventListener('click', tocar)
}

function animar_tras ({
    caminho, idBotao, framesPorPasso, duracao = 1
}) {

    const botao = document.getElementById(idBotao)
    const img = botao.closest('figure').querySelector('img')

    let intervalo = null

    function tocar () {

        if (img.classList.contains('tocando')) return
        if (img.dataset.passo <= '1') return

        img.classList.add("tocando")

        let frame = 1
        let passoAtual = Number(img.dataset.passo)

        intervalo = setInterval(() => {
            
            let indice = (framesPorPasso - frame + 1).toString().padStart(2, '0')
            img.src = `${caminho}/passo${passoAtual-1}/frame_${indice}.png`
            frame++

            if (frame > framesPorPasso) {
                clearInterval(intervalo)
                img.classList.remove("tocando")

                // coloca a imagem sendo a última do paso anterior
                // Ta bugando quando volta pro passo 1
                // img.src = `${caminho}/passo${passoAtual - 2}/frame_${framesPorPasso}.png`

                if (passoAtual > 1) {
                    img.dataset.passo--
                }            
            }

        }, duracao * 1000 / framesPorPasso);

        

    }
    
    botao.addEventListener("click", tocar)

}