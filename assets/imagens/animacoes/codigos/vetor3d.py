from __future__ import annotations
from math import sqrt

class Vetor3D:
    def __init__(self, x: float, y: float, z: float, displayCut: int=2) -> None:
        self.x = x
        self.y = y
        self.z = z
        self.displayCut = displayCut

    def __str__(self) -> str:
        x = round(self.x, self.displayCut)
        y = round(self.y, self.displayCut)
        z = round(self.z, self.displayCut)

        return f'({x}, {y}, {z})'
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def __neg__(self) -> Vetor3D:
        return Vetor3D(-self.x, -self.y, -self.z)
    
    def __add__(self, outro: Vetor3D) -> Vetor3D:
        return Vetor3D(self.x + outro.x, self.y + outro.y, self.z + outro.z)
    
    def __sub__(self, outro: Vetor3D) -> Vetor3D:
        return Vetor3D(self.x - outro.x, self.y - outro.y, self.z - outro.z)
    
    def __mul__(self, escalar: float) -> Vetor3D:
        return Vetor3D(self.x * escalar, self.y * escalar, self.z * escalar)
    
    def __rmul__(self, escalar: float) -> Vetor3D:
        return Vetor3D(self.x * escalar, self.y * escalar, self.z * escalar)
    
    def __truediv__(self, escalar: float) -> Vetor3D:
        return Vetor3D(self.x / escalar, self.y / escalar, self.z / escalar)
    
    def __eq__(self, outro: Vetor3D) -> bool:
        return abs(self.x - outro.x) < 1e-9 and abs(self.y - outro.y) < 1e-9 and abs(self.z - outro.z) < 1e-9
    
    def magnitude(self) -> float:
        return sqrt(self.x * self.x + self.y * self.y + self.z * self.z)
    
    def normalizar(self) -> Vetor3D:
        return self / self.magnitude()
    
    def normalizar_ip(self) -> None:
        mag = self.magnitude()
        self.x /= mag
        self.y /= mag
        self.z /= mag

    @classmethod
    def nulo(cls) -> Vetor3D:
        return cls(0, 0, 0)
    
    @classmethod
    def i(cls) -> Vetor3D:
        return cls(1, 0, 0)
    
    @classmethod
    def j(cls) -> Vetor3D:
        return cls(0, 1, 0)
    
    @classmethod
    def k(cls) -> Vetor3D:
        return cls(0, 0, 1)

    @classmethod
    def produtoEscalar(cls, v1: Vetor3D, v2: Vetor3D) -> float:
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    
    @classmethod
    def produtoVetorial(cls, v1: Vetor3D, v2: Vetor3D) -> Vetor3D:
        return cls(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)
