const calculadora = {
    valorPantalla: '0',
    primerOperando: null,
    esperandoSegundoOperando: false,
    operador: null,
};

function ingresarDigito(digito) {
    const { valorPantalla, esperandoSegundoOperando } = calculadora;

    if (esperandoSegundoOperando === true) {
        calculadora.valorPantalla = digito;
        calculadora.esperandoSegundoOperando = false;
    } else {
        calculadora.valorPantalla = valorPantalla === '0' ? digito : valorPantalla + digito;
    }
}

function ingresarDecimal(punto) {
    if (calculadora.esperandoSegundoOperando === true) return;

    if (!calculadora.valorPantalla.includes(punto)) {
        calculadora.valorPantalla += punto;
    }
}

function manejarOperador(siguienteOperador) {
    const { primerOperando, valorPantalla, operador } = calculadora;
    const valorEntrada = parseFloat(valorPantalla);

    if (operador && calculadora.esperandoSegundoOperando) {
        calculadora.operador = siguienteOperador;
        return;
    }

    if (primerOperando == null && !isNaN(valorEntrada)) {
        calculadora.primerOperando = valorEntrada;
    } else if (operador) {
        const resultado = realizarCalculo[operador](calculadora.primerOperando, valorEntrada);
        calculadora.valorPantalla = String(resultado);
        calculadora.primerOperando = resultado;
    }

    calculadora.esperandoSegundoOperando = true;
    calculadora.operador = siguienteOperador;
}

const realizarCalculo = {
    '/': (primerOperando, segundoOperando) => primerOperando / segundoOperando,
    '*': (primerOperando, segundoOperando) => primerOperando * segundoOperando,
    '+': (primerOperando, segundoOperando) => primerOperando + segundoOperando,
    '-': (primerOperando, segundoOperando) => primerOperando - segundoOperando,
    '=': (primerOperando, segundoOperando) => segundoOperando
};

function limpiarCalculadora() {
    calculadora.valorPantalla = '0';
    calculadora.primerOperando = null;
    calculadora.esperandoSegundoOperando = false;
    calculadora.operador = null;
}

function actualizarPantalla() {
    const pantalla = document.querySelector('.pantalla');
    pantalla.value = calculadora.valorPantalla;
}

actualizarPantalla();

const botones = document.querySelector('.botones');
botones.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operador')) {
        manejarOperador(target.value);
        actualizarPantalla();
        return;
    }

    if (target.classList.contains('decimal')) {
        ingresarDecimal(target.value);
        actualizarPantalla();
        return;
    }

    if (target.classList.contains('limpiar')) {
        limpiarCalculadora();
        actualizarPantalla();
        return;
    }

    ingresarDigito(target.value);
    actualizarPantalla();
});
