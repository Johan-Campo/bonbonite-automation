# language: es
Característica: Compra de producto

  Escenario: Un cliente compra un producto seleccionando talla
    Dado que Camila navega al módulo "Zapatos"
    Cuando selecciona el primer producto disponible del listado
    Y elige una talla disponible
    Y lo agrega al carrito
    Entonces el carrito refleja el producto agregado
