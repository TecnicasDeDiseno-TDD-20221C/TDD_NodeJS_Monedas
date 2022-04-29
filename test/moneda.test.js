class Billetera{
    constructor(){
        this.monto = 0;
        this.montoCripto = 0;
    } 
    
    getMonto(){
        return this.monto;
    }

    agregarPlata(monto){
        if(monto < 0){
            throw new Error('Monto negativo no permitido');
        }
        this.monto += monto;
    }

    comprarCripto(cantidad){

    }
}

class VariacionMoneda{
    constructor(valorInicial){
        this.valorMoneda = valorInicial;
    }

    getValor(){
        return this.valorMoneda;
    }

    modificarValor(diferencia){
        if(this.valorMoneda + diferencia < 0){
            throw new Error('La moneda no puede tomar monto negativo');
        }
        this.valorMoneda += diferencia;
    }
}

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

test('')