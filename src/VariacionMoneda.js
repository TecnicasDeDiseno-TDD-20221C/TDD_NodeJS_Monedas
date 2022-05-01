class VariacionMoneda{
    constructor(valorInicial){
        this.valorMoneda = valorInicial;
        this.valorMaximo = valorInicial;
        this.valorMinimo = valorInicial;
    }

    getValor(){
        return this.valorMoneda;
    }

    _actualizarMaximo(){
        if(this._esMaximo(this.valorMoneda)){
            this.valorMaximo = this.valorMoneda;
        }
    }

    _actualizarMinimo(){
        if(this._esMinimo(this.valorMoneda)){
            this.valorMinimo = this.valorMoneda;
        }
    }

    modificarValor(diferencia){
        if(this.valorMoneda + diferencia < 0){
            throw new Error('La moneda no puede tomar monto negativo');
        }
        this.valorMoneda += diferencia;
        this._actualizarMaximo();
        this._actualizarMinimo();
        
    }

    _esMaximo(valorNuevo){
        return (valorNuevo > this.valorMaximo);
    }

    _esMinimo(valorNuevo){
        return (valorNuevo < this.valorMinimo);
    }

    valorBajoUnCincoPorcientoDelMaximo(){
        return (this.valorMoneda <= (this.valorMaximo*0.95))
    }

    valorSubioUnCincoPorcientoDelMinimo(){
        return (this.valorMoneda >= (this.valorMinimo*1.05));
    }

    restaurarMaximosYMinimos(){
        this.valorMaximo = this.valorMoneda;
        this.valorMinimo = this.valorMoneda;
    }
}

module.exports = VariacionMoneda;