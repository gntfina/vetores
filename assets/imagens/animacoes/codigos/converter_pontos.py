from vetor3d import Vetor3D as Vetor

def projecaoDoPontoNoPlano(posCamera: Vetor, dirCamera: Vetor, upCamera: Vetor, distPlano: float, ponto: Vetor) -> tuple[float, float] | None:
    dirCamera = dirCamera.normalizar()
    
    eixoX = Vetor.produtoVetorial(dirCamera, upCamera).normalizar()
    eixoY = Vetor.produtoVetorial(eixoX, dirCamera).normalizar()

    centroPlano = posCamera + dirCamera * distPlano
    coefLin = Vetor.produtoEscalar(dirCamera, centroPlano)

    t_numerador = coefLin - Vetor.produtoEscalar(dirCamera, posCamera)
    t_denominador = Vetor.produtoEscalar(dirCamera, ponto - posCamera)

    if abs(t_denominador) < 1e-9:
        return None
    
    t = t_numerador / t_denominador

    if t < 0:
        return None
    
    interNoPlano = (1 - t) * posCamera + t * ponto
    vetorRelativo = interNoPlano - centroPlano

    x = Vetor.produtoEscalar(vetorRelativo, eixoX)
    y = Vetor.produtoEscalar(vetorRelativo, eixoY)

    return (round(x, 2), round(y, 2))

distCamera = 5
cameras = [
    distCamera * Vetor(.6, -.8, .5).normalizar(), 
    distCamera * Vetor.i(),
    - distCamera * Vetor.j()
]
upCamera = Vetor.k()
distPlano = 1
pontos = [
    2 * Vetor.i(),
    - 2 * Vetor.i(),
    2 * Vetor.j(),
    - 2 * Vetor.j(),
    4 * Vetor.k(),
    - Vetor.k(),
    Vetor(-1, 1, 2),
    Vetor(3, -3, 1)
]


for ponto in pontos:
    lista = []
    for camera in cameras:
        lista.append(projecaoDoPontoNoPlano(camera, - camera, upCamera, distPlano, ponto))
    print(lista)
