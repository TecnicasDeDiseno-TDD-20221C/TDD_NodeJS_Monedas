class Billetera{
    constructor(){
        this.monto = 0;
        this.montoCripto = 0;
    } 
    
    getMonto(){
        return this.monto;
    }

    getMontoCripto(){
        return this.montoCripto;
    }

    agregarPlata(monto){
        if(monto < 0){
            throw new Error('Monto negativo no permitido');
        }
        this.monto += monto;
    }

    comprarCripto(tipoMoneda, cantidadCriptoComprada){
        let monedaConvertida = cantidadCriptoComprada * tipoMoneda.getValor();
        if (this.monto - monedaConvertida >= 0){
            this.montoCripto += cantidadCriptoComprada;
            this.monto -= monedaConvertida;
        }else{
            throw new Error('No posees monto suficiente en tu billetera para comprar esa cantidad de cripto.');
        }
    }

    venderCripto(tipoMoneda, cantidadCriptoVendida){
        if(this.montoCripto - cantidadCriptoVendida >= 0){
            this.montoCripto -= cantidadCriptoVendida;
            this.monto += cantidadCriptoVendida * tipoMoneda.getValor();
        }
        else{
            throw new Error('No posees esa cantidad de cripto para vender');
        }
    }

    tomarDecisionCripto(tipoMoneda){
        if(tipoMoneda.valorBajoUnCincoPorcientoDelMaximo()){
            this.venderCripto(tipoMoneda, this.montoCripto);
            tipoMoneda.restaurarMaximosYMinimos();
        }
        else if(tipoMoneda.valorSubioUnCincoPorcientoDelMinimo()){
            this.comprarCripto(tipoMoneda, this.monto/tipoMoneda.getValor());
            tipoMoneda.restaurarMaximosYMinimos();
        }
    }
}

module.exports = Billetera;