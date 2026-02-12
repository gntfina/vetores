

function animar ({
    botaoId, totalPassos, totalFrames
}) {
    const botao = document.getElementById(botaoId)
    const img = botao.parentElement.querySelector("img")

    let frame = 1
    let intervalo = null


    function tocar() {
        if (botao.classList.contains('tocando')) return

        botao.classList.add('tocando')
        let passo = Number(botao.dataset.passo)

        intervalo = setInterval(() => {

            let indice = frame.toString().padStart(2, "0");
            img.src = `../assets/imagens/sla/passo${passo}/frame_${indice}.png`
            frame++

            if (frame > totalFrames) {
                clearInterval(intervalo)
                frame = 1
                botao.classList.remove('tocando')

                if (passo < totalPassos) {
                    botao.dataset.passo++
                }
            }
        }, 50)

        
        
    }

    botao.addEventListener("click", tocar)
}