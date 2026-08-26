# language: es
Característica: Registro y edición de cuenta de usuario

  Escenario: Un cliente potencial se registra exitosamente en Bon-bonite
    Dado que Camila visita la página de "Mi cuenta" de Bon-bonite
    Cuando se registra con una cédula, nombres, apellidos, correo y contraseña válidos y únicos
    Entonces el sistema confirma que la cuenta fue creada exitosamente

  Escenario: Un usuario registrado modifica sus datos de cuenta
    Dado que Camila ha iniciado sesión con una cuenta previamente registrada
    Cuando actualiza su nombre desde "Mi cuenta"
    Y guarda los cambios
    Entonces el sistema confirma que los datos fueron actualizados correctamente
