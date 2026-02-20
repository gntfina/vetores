import os
import shutil

def organizar_pastas(caminho: str) -> None:
    
    # Lista os arquivos da pasta
    arquivos = os.listdir(caminho)

    for arquivo in arquivos:
        nome_pasta = arquivo.split()[0]
        caminho_pasta = os.path.join(caminho, nome_pasta)

        os.makedirs(caminho_pasta, exist_ok=True)

        indice = arquivo.split()[1].split('.')[0]
        indice = indice.split('(')[1].split(')')[0]
        nome_arquivo = f'frame_{indice:0>2}.svg'

        caminho_antigo = os.path.join(caminho, arquivo)
        caminho_novo = os.path.join(caminho_pasta, nome_arquivo)

        os.rename(caminho_antigo, caminho_novo)

#organizar_pastas('caminho')