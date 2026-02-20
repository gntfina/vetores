from vetor3d import Vetor3D as Vetor
from string import ascii_lowercase

def projecaoDoPontoNoPlano(posCamera: Vetor, dirCamera: Vetor, upCamera: Vetor, ponto: Vetor) -> tuple[float, float] | None:
    dirCamera = dirCamera.normalizar()
    
    eixoX = Vetor.produtoVetorial(dirCamera, upCamera).normalizar()
    eixoY = Vetor.produtoVetorial(eixoX, dirCamera).normalizar()

    centroPlano = posCamera + dirCamera
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


def textoGGB(posCameras: Vetor, dirCameras: Vetor, upCameras: Vetor, pontos: Vetor) -> None:

    print('\n')
    # Cria a lista de pontos
    texto = []
    for ponto in pontos:
        for indice, camera in enumerate(posCameras):
            texto.append(str(projecaoDoPontoNoPlano(camera, dirCameras[indice], upCameras[indice], ponto)))
    print('{' + ', '.join(texto) + '}')

    print('\n')
    # Cria a interpolação entre os pontos
    letras = list(ascii_lowercase)
    letras.remove('x')
    letras.remove('y')
    letras.remove('z')

    qtd = len(posCameras)
    texto = f'l1({qtd} k - {qtd - 1})'
    for k in range(qtd - 1):
        texto = f'(1 - {letras[k]}) (' + texto + f') + {letras[k]} l1({qtd} k - {1-k})'
    texto = 'Sequence(' + texto + f', k, 1, {len(pontos)})'
    print(texto)

    print('\n')
    # Cria as bases vetoriais
    for k in range(3):
        print(f'Vector(l2({2 * k + 2}), l2({2 * k + 1}))\n')

    print('\n')
    # Cria o plano
    texto = []
    for i in range(2):
        for j in range(2):
            texto.append(f'l2({i + 1}) + l2({j + 3})')
    texto.insert(-1, texto.pop(-1))
    print('Polygon({' + ', '.join(texto) + '})')

    print('\n')
    # Cria um lista com os pontos restantes
    print('pontos = Take(l2, 7, length(l2))\n')


distCamera = 5
posCameras = [
    distCamera * Vetor(.6, -.8, .5).normalizar(), 
    distCamera * Vetor.i(),
    - distCamera * Vetor.j()
]
dirCameras = [ -camera for camera in posCameras]
upCameras = [Vetor.k()] * len(posCameras)
pontos = [
    2 * Vetor.i(),
    - 2 * Vetor.i(),
    2 * Vetor.j(),
    - 2 * Vetor.j(),
    4 * Vetor.k(),
    - Vetor.k(),
    Vetor(-1, 1, 2),
    Vetor(3, -3, 1),
    Vetor(-1, 1, 0),
    Vetor(3, -3, 0)
]

textoGGB(posCameras, dirCameras, upCameras, pontos)
