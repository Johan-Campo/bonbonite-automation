export const obtenerOFallar = <T>(mapa: Map<string, T>, clave: string, mensaje: string): T => {
  const valor = mapa.get(clave);
  if (!valor) {
    throw new Error(mensaje);
  }

  return valor;
};
