function configurarSVG(svgTexto) {
    const larguraMatch = svgTexto.match(/width="(\d+)"/);
    const alturaMatch = svgTexto.match(/height="(\d+)"/);
    
    if (larguraMatch && alturaMatch) {
        const w = larguraMatch[1];
        const h = alturaMatch[1];

        if (!svgTexto.includes('viewBox')) {
            svgTexto = svgTexto.replace('<svg', `<svg viewBox="0 0 ${w} ${h}"`);
        }
    }
    return svgTexto
        .replace(/width=".*?"/, 'width="100%"')
        .replace(/height=".*?"/, 'height="100%"')
        .replace(/stroke="rgb\(28,28,31\)"/g, 'stroke="currentColor"')
        .replace(/stroke="rgb\(0,0,0\)"/g, 'stroke="currentColor"')
        .replace(/fill="rgb\(0,0,0\)"/g, 'fill="currentColor"');
}

function animar_step_frente({
    imagensPrecarregadas, botao, canvas, totalPassos, framesPorPasso, duracao=1
})
{
    function tocar () {

        let frameAtual = 1
        let passoAtual = Number(canvas.dataset.passo)

        if (passoAtual > totalPassos) return
        if (canvas.classList.contains('tocando')) return

        canvas.classList.add('tocando')

        let intervalo = setInterval(async () => {


            canvas.innerHTML = imagensPrecarregadas[passoAtual - 1][frameAtual - 1]

            frameAtual++

            if (frameAtual > framesPorPasso) {
                clearInterval(intervalo)
                canvas.classList.remove('tocando')
                canvas.dataset.passo = passoAtual + 1
            }
        }, duracao * 1000 / framesPorPasso)
    }
    botao.addEventListener('click', tocar)
}

function animar_step_tras({
    imagensPrecarregadas, botao, canvas, framesPorPasso, duracao=1
})
{
    function tocar() {
        let frameAtual = framesPorPasso
        let passoAtual = Number(canvas.dataset.passo)

        if (passoAtual <= 1) return
        if (canvas.classList.contains('tocando')) return

        canvas.classList.add('tocando')

        let intervalo = setInterval(() => {

            canvas.innerHTML = imagensPrecarregadas[passoAtual - 2][frameAtual - 1]

            frameAtual--

            if (frameAtual < 1) {
                clearInterval(intervalo)
                canvas.dataset.passo = passoAtual - 1
                canvas.classList.remove('tocando')
            }
        }, duracao * 1000 / framesPorPasso)
    }
    botao.addEventListener('click', tocar)
}

function animarPrimeiroFrame ({
    imagensPrecarregadas, botao, canvas
})
{
    botao.addEventListener('click', () => {
        if (canvas.classList.contains('tocando')) return

        canvas.innerHTML = imagensPrecarregadas[0][0]
        canvas.dataset.passo = 1
    })   
}

function animarUltimoFrame ({
    imagensPrecarregadas, botao, canvas, totalPassos, framesPorPasso
})
{
    botao.addEventListener('click', () => {
        if (canvas.classList.contains('tocando')) return

        canvas.innerHTML = imagensPrecarregadas[totalPassos - 1][framesPorPasso - 1]
        canvas.dataset.passo = totalPassos + 1
    })   
}

async function animar ({
    idCanvas, caminho, totalPassos, framesPorPasso, duracao=1 
})
{
    const canvas = document.getElementById(idCanvas)
    const botoes = canvas.closest('figure').querySelectorAll("button")

    const imagensPrecarregadas = []

    for (let passo = 1; passo <= totalPassos; passo++) {
        const listaTemp = []

        for (let frame = 1; frame <= framesPorPasso; frame++) {
            const frameTexto = frame.toString().padStart(2, '0')
            const arquivo = await fetch(`${caminho}/passo${passo}/frame_${frameTexto}.svg`)
            let svgTexto = await arquivo.text()
            listaTemp.push(configurarSVG(svgTexto))
        }

        imagensPrecarregadas.push(listaTemp)
    }

    // Carrega o primeiro frame
    canvas.innerHTML = imagensPrecarregadas[0][0]


    animarPrimeiroFrame({
        imagensPrecarregadas,
        botao: botoes[0],
        canvas
    })

    animar_step_tras({
        imagensPrecarregadas,
        botao: botoes[1],
        canvas, framesPorPasso, duracao
    })

    animar_step_frente({
        imagensPrecarregadas,
        botao: botoes[2],
        canvas, totalPassos, framesPorPasso, duracao
    })

    animarUltimoFrame ({
        imagensPrecarregadas,
        botao: botoes[3],
        canvas, totalPassos, framesPorPasso
    })   
}