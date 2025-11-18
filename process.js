import vocabmessi from './vocabulary.json' assert { type: 'json' };

const KEY_DESPLAZAMIENTO = 3; 

const vocabulario = vocabmessi.vocabMessi; 


const frases_iniciales = [
    "¡la tiene el genio!",
    "¡messi encara!",
    "¡leo toma la pelota!",
    "¡arranca messi desde tres cuartos!",
    "¡el diez se prepara para la magia!",
    "¡visión de juego activada!",
    "¡el mago de rosario recibe en corto!",
    "¡se abre el mar para la zurda!",
    "¡el balón encuentra a su dueño!",
    "¡mirada fija en el arco rival!"
];

const frases_finales = [
    "¡gol!",
    "¡golazo!",
    "¡es gol!",
    "¡obra de arte!",
    "¡final de lujo!",
    "¡imparable!",
    "¡la rompió!",
    "¡qué maravilla!",
    "¡un poema al fútbol!",
    "¡el broche de oro!"
];

// --- FUNCIONES DE CIFRADO Y DESCIFRADO (SIN CAMBIOS) ---

function seleccionarleatorio(array) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
}

function cifrarPalabra(texto, vocabulario) {
    let palabrasCodificadas = [];
    for (let i = 0; i < texto.length; i++) {
        const codigo = texto.charCodeAt(i);
        const cadenacodigo = codigo.toString(); 
        for (let j = 0; j < cadenacodigo.length; j++) {
            const numerodigito = parseInt(cadenacodigo[j]);
            const indiceDesplazado = numerodigito + KEY_DESPLAZAMIENTO;
            if (indiceDesplazado >= vocabulario.length) {
                return `Error: Índice ${indiceDesplazado} fuera del límite del vocabulario.`;
            }
            palabrasCodificadas.push(vocabulario[indiceDesplazado]);
        }
    }
    return palabrasCodificadas.join(' ');
}

function descifrarPalabra(narracionCuerpo, vocabulario) {
    const palabras = narracionCuerpo.split(' ');
    let asciiDesplazado = [];
    for (const palabra of palabras) {
        const indice = vocabulario.indexOf(palabra); 
        if (indice === -1) {
            return `Error de Descifrado: La palabra "${palabra}" no existe en el vocabulario.`;
        }
        const digitoOriginal = indice - KEY_DESPLAZAMIENTO;
        asciiDesplazado.push(digitoOriginal);
    }
    
    let textoDescifrado = '';
    for (let i = 0; i < asciiDesplazado.length; i += 2) {
        const digito1 = asciiDesplazado[i];
        const digito2 = asciiDesplazado[i+1];
        const codigoASCII = parseInt(digito1.toString() + digito2.toString());
        textoDescifrado += String.fromCharCode(codigoASCII);
    }

    return textoDescifrado;
}


const clave = 'GOAT';
const fraseInicial = seleccionarleatorio(frases_iniciales); 
const fraseFinal = seleccionarleatorio(frases_finales);

const palabrasCifradas = cifrarPalabra(clave, vocabulario);
const narracionCifrada = `${fraseInicial} ${palabrasCifradas} ¡${fraseFinal}!`;

console.log(`--- CIFRADO ---`);
console.log(`Clave Original: "${clave}"`);
console.log(`Narración Cifrada: ${narracionCifrada}`);

console.log(`--------------------------------------------------`);

const claveDescifrada = descifrarPalabra(palabrasCifradas, vocabulario);

console.log(`--- DESCIFRADO ---`);
console.log(`Cuerpo de la Narración: "${palabrasCifradas}"`);
console.log(`Clave Descifrada: "${claveDescifrada}"`);