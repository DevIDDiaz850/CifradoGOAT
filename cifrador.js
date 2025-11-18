const VOCABULARIO_PLANO = [
    "gol", "mitad", "cancha", "quita", "camino", "obra", "gracias", "tiro", "libre", "perfila", "combaperfecta", "mejor", "cabeza", "final", "champions", "united", "salta", "bombeado", "red", "vivá", "clasificar", "asegurar", "completa", "vamos", "esférico", "defensor", "césped", "campnou", "diez", "vaselina", "ospina", "ejecuta", "barrera", "balón", "ángulo", "centenario", "sirve", "aparece", "remata", "descuento", "gesto", "sepulcral", "acomoda", "pica", "definición", "portero", "goleador", "registro", "oro", "precisión", "absoluta", "concentra", "rosca", "vuelo", "impacto", "psicológico", "descanso", "torneo", "presiona", "roba", "achicar", "toque", "calidad", "gloriosa", "barcelonismo", "observa", "chute", "potentísimo", "vuela", "ferocidad", "misil", "letales", "derecha", "curvado", "zurda", "escuadra", "sobrelahora", "júbilo", "destino", "salvador", "peligrosa", "metros", "cuero", "violencia", "extrema", "raso", "hueco", "courtois", "éxtasis", "brillante", "obra", "maestra", "potencia", "elevado", "joven", "anulado", "convalidado", "tanto", "oficial", "promesa", "convertida", "era", "mediocampo", "amortigua", "volea", "derecha", "impecable", "control", "inigualable", "magistral", "técnica", "centro", "lanza", "mano", "igual", "árbitro", "válido", "polémico", "pillería", "pibe", "traslada", "leo", "disputado", "emocionante", "extraordinario", "fantástico", "sensacional", "espectacular", "inolvidable", "memorable", "increíble", "sublime", "único", "extraño", "gigante", "monstruo", "fenómeno", "artillero", "goleador", "killer", "matador", "rematador", "zurdo", "derecho", "cabezazo", "potente", "suave", "preciso", "lejano", "cercano", "ángulo", "poste", "redonda", "malla", "travesaño", "larguero", "arquero", "defensa", "zaguero", "lateral", "mediocentro", "delantero", "equipo", "rival", "campeón", "victoria", "derrota", "empate", "resultado", "minuto", "tiempo", "prórroga", "penalti", "falta", "saque", "córner", "banderín", "área", "castigo", "castigar", "celebración", "alegría", "tristeza", "rabia", "frustración", "esperanza"
];

const VOCABULARIO_MAPA = [];
const SINONIMOS_POR_DIGITO = 4;
let indicePlano = 0;

for (let i = 0; i < VOCABULARIO_PLANO.length; i += SINONIMOS_POR_DIGITO) {
    const lista = [];
    for (let j = 0; j < SINONIMOS_POR_DIGITO && (i + j) < VOCABULARIO_PLANO.length; j++) {
        lista.push(VOCABULARIO_PLANO[i + j]);
    }
    VOCABULARIO_MAPA.push(lista);
}

let vocabulario = VOCABULARIO_MAPA;
const KEY_DESPLAZAMIENTO = 3; 

const frases_iniciales = [
    "¡la tiene el genio!", "¡messi encara!", "¡leo toma la pelota!",
    "¡arranca messi desde tres cuartos!", "¡el diez se prepara para la magia!",
    "¡visión de juego activada!", "¡el mago de rosario recibe en corto!",
    "¡se abre el mar para la zurda!", "¡el balón encuentra a su dueño!",
    "¡mirada fija en el arco rival!"
];

const frases_finales = [
    "¡gol!", "¡golazo!", "¡es gol!", "¡obra de arte!",
    "¡final de lujo!", "¡imparable!", "¡la rompió!",
    "¡qué maravilla!", "¡un poema al fútbol!", "¡el broche de oro!"
];

function seleccionarleatorio(array) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
}

function cifrarPalabra(texto, vocabMapa) {
    let palabrasCodificadas = [];
    if (!vocabMapa || vocabMapa.length === 0) {
        return "Error: El vocabulario no se cargó correctamente.";
    }
    
    if (vocabMapa.length < 13) {
        return "Error: El vocabulario debe tener al menos 13 grupos de sinónimos para cifrar.";
    }

    for (let i = 0; i < texto.length; i++) {
        const codigo = texto.charCodeAt(i);
        const cadenacodigo = codigo.toString(); 
        for (let j = 0; j < cadenacodigo.length; j++) {
            const numerodigito = parseInt(cadenacodigo[j]);
            const indiceDesplazado = numerodigito + KEY_DESPLAZAMIENTO;
            
            const listaSinonimos = vocabMapa[indiceDesplazado];
            
            if (!listaSinonimos || listaSinonimos.length === 0) {
                 return `Error: El grupo de sinónimos para el índice ${indiceDesplazado} está vacío.`;
            }
            
            const palabraAleatoria = seleccionarleatorio(listaSinonimos);
            palabrasCodificadas.push(palabraAleatoria);
        }
    }
    return palabrasCodificadas.join(' ');
}

function descifrarPalabra(narracionCuerpo, vocabMapa) {
    const palabras = narracionCuerpo.split(' ');
    if (!vocabMapa || vocabMapa.length === 0) {
        return "Error: El vocabulario no se cargó correctamente.";
    }
    
    let asciiDesplazado = [];
    for (const palabra of palabras) {
        let indice = -1;

        for (let i = 0; i < vocabMapa.length; i++) {
            if (vocabMapa[i].includes(palabra)) {
                indice = i;
                break;
            }
        }
        
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
        
        if (digito2 === undefined) {
            return `Error: Cadena incompleta. El código ASCII final ('${digito1}') es inválido.`;
        }

        const codigoASCII = parseInt(digito1.toString() + digito2.toString());
        textoDescifrado += String.fromCharCode(codigoASCII);
    }

    return textoDescifrado;
}

function aislarCuerpoCifrado(narracionCompleta) {
    let cuerpoLimpio = narracionCompleta.trim();

    for (const frase of frases_iniciales) {
        if (cuerpoLimpio.startsWith(frase)) {
            cuerpoLimpio = cuerpoLimpio.substring(frase.length).trim();
            break; 
        }
    }

    for (const frase of frases_finales) {
        const fraseCompleta = `¡${frase}!`;
        if (cuerpoLimpio.endsWith(fraseCompleta)) {
            cuerpoLimpio = cuerpoLimpio.substring(0, cuerpoLimpio.length - fraseCompleta.length).trim();
            break;
        }
    }

    return cuerpoLimpio;
}


function ejecutarCifrado() {
    const clave = document.getElementById('claveInput').value.toUpperCase();
    if (clave.length === 0) return;

    const fraseInicial = seleccionarleatorio(frases_iniciales); 
    const fraseFinal = seleccionarleatorio(frases_finales);
    
    const palabrasCifradas = cifrarPalabra(clave, vocabulario);
    
    if (palabrasCifradas.startsWith("Error")) {
        document.getElementById('descifradoInput').value = palabrasCifradas;
        document.getElementById('claveDescifradaOutput').textContent = '';
        return;
    }

    const narracionCifrada = `${fraseInicial} ${palabrasCifradas} ¡${fraseFinal}!`;
    
    document.getElementById('descifradoInput').value = narracionCifrada;
    document.getElementById('claveDescifradaOutput').textContent = '';
}

function ejecutarDescifrado() {
    const narracionCompleta = document.getElementById('descifradoInput').value.trim();
    if (narracionCompleta.length === 0) {
        document.getElementById('claveDescifradaOutput').textContent = 'Por favor, ingrese la narración completa.';
        return;
    }
    
    const cuerpoCifrado = aislarCuerpoCifrado(narracionCompleta);

    if (cuerpoCifrado.length === 0) {
        document.getElementById('claveDescifradaOutput').textContent = 'Error: No se pudo aislar el cuerpo cifrado. Asegúrese de que el inicio y el final estén correctos.';
        return;
    }
    
    const claveDescifrada = descifrarPalabra(cuerpoCifrado, vocabulario);
    
    document.getElementById('claveDescifradaOutput').textContent = claveDescifrada.startsWith("Error") ? claveDescifrada : claveDescifrada;
}

function inicializar() {
    if (vocabulario.length > 0) {
        document.getElementById('cifradoBtn').addEventListener('click', ejecutarCifrado);
        document.getElementById('descifradoBtn').addEventListener('click', ejecutarDescifrado);
        ejecutarCifrado();
    } else {
        alert("Error crítico: El vocabulario no contiene palabras.");
    }
}

inicializar();