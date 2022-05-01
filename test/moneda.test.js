const Billetera = require('../src/Billetera.js');
const VariacionMoneda = require('../src/VariacionMoneda.js');

test('Crear una billetera deberia tener monto 0', ()=>{
    const billetera = new Billetera();
    expect(billetera.getMonto()).toBe(0);
});

test('Agregar 10 pesos a una billetera vacía pone el monto en 10', ()=>{
    const billetera = new Billetera();
    billetera.agregarPlata(10);
    expect(billetera.getMonto()).toBe(10);
});

test('Agregar monto a una billetera no debería poder ser negativo', ()=>{
    const billetera = new Billetera();
    try{
        billetera.agregarPlata(-10);
    }catch(e){
        expect(e.message).toBe('Monto negativo no permitido');
    }
});

test('Crear una grafica de moneda con un valor inicial de 10 empieza con valor 10', ()=>{
    const moneda = new VariacionMoneda(10);
    expect(moneda.getValor()).toBe(10);
});

test('Variar el valor de una moneda positivamente lo varía', ()=>{
    const moneda = new VariacionMoneda(15);
    moneda.modificarValor(15);
    expect(moneda.getValor()).toBe(30);
});

test('Variar el valor de una moneda negativamente y que mantenga valor mayor a 0 lo permite', ()=>{
    const moneda = new VariacionMoneda(15);
    moneda.modificarValor(-10);
    expect(moneda.getValor()).toBe(5);
});

test('Variar el valor de una moneda negativamente y que tome valor menor a 0 lanza error', ()=>{
    const moneda = new VariacionMoneda(9);
    try{
        moneda.modificarValor(-10);
    }catch(e){
        expect(e.message).toBe('La moneda no puede tomar monto negativo');
    }
});

test('Comprar criptomonedas en la billetera con monto no suficiente tira error.', ()=>{
    const moneda = new VariacionMoneda(2);
    const billetera = new Billetera();
    billetera.agregarPlata(10);
    try{
        billetera.comprarCripto(moneda, 6);
    }catch(e){
        expect(e.message).toBe('No posees monto suficiente en tu billetera para comprar esa cantidad de cripto.');
    }
});

test('Crear una billetera la inicializa con montoCripto en 0', ()=>{
    const billetera = new Billetera();
    expect(billetera.getMontoCripto()).toBe(0);
});

test('Comprar criptomonedas con saldo suficiente las añade al montoCripto y me resta del monto', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    expect(billetera.getMontoCripto()).toBe(5);
    expect(billetera.getMonto()).toBe(0);
});

test('Vender criptomonedas que no poseo no me lo permite y tira error', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    try{
        billetera.venderCripto(moneda, 5);
    }catch(e){
        expect(e.message).toBe('No posees esa cantidad de cripto para vender');
    }
});

test('Vender criptomonedas que poseo me es permitido y se refleja en los montos', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    expect(billetera.getMontoCripto()).toBe(5);
    expect(billetera.getMonto()).toBe(0);
    billetera.venderCripto(moneda, 2);
    expect(billetera.getMontoCripto()).toBe(3);
    expect(billetera.getMonto()).toBe(4);
});

test('Vender criptomonedas cuyo valor varió que poseo me es permitido y se refleja en los montos', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    expect(billetera.getMontoCripto()).toBe(5);
    expect(billetera.getMonto()).toBe(0);
    moneda.modificarValor(10);
    billetera.venderCripto(moneda, 2);
    expect(billetera.getMontoCripto()).toBe(3);
    expect(billetera.getMonto()).toBe(24);
    moneda.modificarValor(-5);
    billetera.venderCripto(moneda, 2);
    expect(billetera.getMontoCripto()).toBe(1);
    expect(billetera.getMonto()).toBe(38);
});

test('La billetera al subir un 5% la criptomoneda define que comprará y compra todo', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    moneda.modificarValor(2*0.05);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(0);
    expect(billetera.getMontoCripto()).toBe(10/(2*1.05));
});

test('La billetera al subir un 25% la criptomoneda define que comprará y compra todo', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    moneda.modificarValor(2*0.25);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(0);
    expect(billetera.getMontoCripto()).toBe(10/(2*1.25));
});

test('La billetera al subir un 25% la criptomoneda define que comprará y compra todo. Luego el valor Máximo de la moneda se restaura.', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    moneda.modificarValor(2*0.25);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(0);
    expect(billetera.getMontoCripto()).toBe(10/(2*1.25));
    expect(moneda.valorMaximo).toBe(2*1.25);
    expect(moneda.valorMinimo).toBe(2*1.25);
});

test('La billetera al bajar un 5% la criptomoneda define que venderá el monto que tenga de criptos. Luego se restauran los maximos y minimos.', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    moneda.modificarValor(-2*0.05);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(5*2*0.95);
    expect(billetera.getMontoCripto()).toBe(0);
    expect(moneda.valorMaximo).toBe(2*0.95);
    expect(moneda.valorMinimo).toBe(2*0.95);
});

test('La billetera al bajar un 25% la criptomoneda define que venderá el monto que tenga de criptos. Luego se restauran los maximos y minimos.', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    moneda.modificarValor(-2*0.25);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(5*2*0.75);
    expect(billetera.getMontoCripto()).toBe(0);
    expect(moneda.valorMaximo).toBe(2*0.75);
    expect(moneda.valorMinimo).toBe(2*0.75);
});

test('La billetera al bajar un 4.99% la criptomoneda define que no hará nada y no se restauran los maximos y minimos.', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    moneda.modificarValor(-2*0.0499);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(0);
    expect(billetera.getMontoCripto()).toBe(5);
    expect(moneda.valorMaximo).toBe(2);
    expect(moneda.valorMinimo).toBe(2-2*0.0499);
});

test('La billetera al aumentar un 4.99% la criptomoneda define que no hará nada y no se restauran los maximos y minimos.', ()=>{
    const billetera = new Billetera();
    const moneda = new VariacionMoneda(2);
    billetera.agregarPlata(10);
    billetera.comprarCripto(moneda, 5);
    moneda.modificarValor(2*0.0499);
    billetera.tomarDecisionCripto(moneda);
    expect(billetera.getMonto()).toBe(0);
    expect(billetera.getMontoCripto()).toBe(5);
    expect(moneda.valorMaximo).toBe(2+2*0.0499);
    expect(moneda.valorMinimo).toBe(2);
});