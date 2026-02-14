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

async function carregarPrimeiroFrame ({
    idCanvas, caminho
})
{
    const canvas = document.getElementById(idCanvas)
    const arquivo = await fetch(`${caminho}/passo1/frame_01.svg`)
    let svgTexto = await arquivo.text()

    canvas.innerHTML = configurarSVG(svgTexto)
}

function animar_frente ({
    idBotao, caminho, totalPassos, framesPorPasso, duracao
})
{

} 

function animar_step_frente({
    idBotao, caminho, totalPassos, framesPorPasso, duracao=1
})
{
    const botao = document.getElementById(idBotao)
    const canvas = botao.closest('figure').querySelector('div.conteirner-svg')

    function tocar () {

        let frameAtual = 1
        let passoAtual = Number(canvas.dataset.passo)

        if (passoAtual > totalPassos) return
        if (canvas.classList.contains('tocando')) return

        canvas.classList.add('tocando')

        let intervalo = setInterval(async () => {

            const arquivo = await fetch(`${caminho}/passo${passoAtual}/frame_${frameAtual.toString().padStart(2, '0')}.svg`)
            let svgTexto = await arquivo.text()

            canvas.innerHTML = configurarSVG(svgTexto)

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
    idBotao, caminho, framesPorPasso, duracao=1
})
{
    const botao = document.getElementById(idBotao)
    const canvas = botao.closest('figure').querySelector('div.conteirner-svg')

    function tocar() {
        let frame = framesPorPasso
        let passoAtual = Number(canvas.dataset.passo)

        if (passoAtual <= 1) return
        if (canvas.classList.contains('tocando')) return

        canvas.classList.add('tocando')

        let intervalo = setInterval(async () => {

            const arquivo = await fetch(`${caminho}/passo${passoAtual - 1}/frame_${frame.toString().padStart(2, '0')}.svg`)
            let svgTexto = await arquivo.text()

            canvas.innerHTML = configurarSVG(svgTexto)

            frame--

            if (frame < 1) {
                clearInterval(intervalo)
                canvas.dataset.passo = passoAtual - 1
                canvas.classList.remove('tocando')
            }
        }, duracao * 1000 / framesPorPasso)
    }
    botao.addEventListener('click', tocar)
}

async function animarPrimeiroFrame ({
    idBotao, caminho
})
{
    const botao = document.getElementById(idBotao)
    const canvas = botao.closest('figure').querySelector('div.conteirner-svg')
    const arquivo = await fetch(`${caminho}/passo1/frame_01.svg`)
    let svgTexto = await arquivo.text()

    botao.addEventListener('click', () => {
        canvas.innerHTML = configurarSVG(svgTexto)
        canvas.dataset.passo = 1
    })   
}

async function animarUltimoFrame ({
    idBotao, caminho, totalPassos, framesPorPasso
})
{
    const botao = document.getElementById(idBotao)
    const canvas = botao.closest('figure').querySelector('div.conteirner-svg')
    const arquivo = await fetch(`${caminho}/passo${totalPassos}/frame_${framesPorPasso.toString().padStart(2, '0')}.svg`)
    let svgTexto = await arquivo.text()

    botao.addEventListener('click', () => {
        canvas.innerHTML = configurarSVG(svgTexto)
        canvas.dataset.passo = totalPassos + 1
    })   
}