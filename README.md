# CifradoGOAT
Este cifrado será hecho para conmemorar al 10 de la historia
el crifrado tiene de 3 a 4 opciones para cifrar con palabras
## README: Cifrador de Narración GOAT

Este proyecto es un sistema de **cifrado y descifrado bidireccional** que convierte una clave secreta (texto) en una narración de fútbol utilizando un vocabulario temático. El objetivo principal fue eliminar la repetición de palabras en el mensaje cifrado.

***

### Fundamento del Cifrado

El sistema utiliza la **Sustitución Aleatoria por Sinónimos** para garantizar que la misma clave siempre produzca narraciones distintas:

1.  **Mapeo del Vocabulario:** El `VOCABULARIO_PLANO` se reestructura en un **Mapa de Sinónimos** (`VOCABULARIO_MAPA`). Cada índice del mapa (que corresponde a un dígito ASCII desplazado) contiene un grupo de sinónimos.
2.  **Cifrado:** Al cifrar un dígito, el código **elige una palabra al azar** de la lista de sinónimos correspondiente a ese índice. Esto rompe la repetición de palabras que resulta de la repetición de dígitos en los códigos ASCII.
3.  **Descifrado:** La función de descifrado busca la palabra recibida en **todas las listas de sinónimos** para identificar el índice original y, por lo tanto, el dígito ASCII correcto.

***

### Estructura y Componentes

El proyecto se compone de tres archivos principales:

1.  **`index.html`:** La estructura de la interfaz de usuario con estilos CSS profesionales y *responsive*. Contiene los campos para la clave y el resultado.
2.  **`cifrador.js`:** La lógica completa de cifrado, descifrado, manejo del vocabulario integrado, y conexión de eventos (`click`).
3.  **`vocabulary.json` (Integrado):** El vocabulario temático de fútbol (188 palabras) está contenido directamente en el archivo `cifrador.js` como `VOCABULARIO_PLANO`.

***

### Ejecución del Proyecto

Para que el proyecto funcione correctamente (debido al uso de módulos ES6 y la función `fetch` en el navegador), es necesario utilizar un **servidor web local**:

1.  Asegúrese de tener todos los archivos (`index.html`, `cifrador.js`, recursos de imagen) en la misma carpeta.
2.  Ejecute la carpeta utilizando herramientas como **Live Server** (extensión de VS Code) o **`http-server`** (Node.js).
3.  Acceda a la dirección local proporcionada (ej., `http://localhost:8080`).
