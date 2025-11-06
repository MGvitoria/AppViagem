export class Viagem {
public id!: string;
public destino!: string;
public dataIda!: string;
public dataVolta!: string;
public orcamento!: string;
public transporte!: string;
public hospedagem!: string;


constructor(obj?: Partial<Viagem>){
this.id = obj?.id ?? ''
this.destino = obj?.destino ?? ''
this.dataIda = obj?.dataIda ?? ''
this.dataVolta = obj?.dataVolta ?? ''
this.orcamento = obj?.orcamento ?? ''
this.transporte = obj?.transporte ?? ''
this.hospedagem = obj?.hospedagem ?? ''
}


toString(): string {
const objeto = `{
"id" : "${this.id}",
"destino": "${this.destino}",
"dataIda" : "${this.dataIda}",
"dataVolta": "${this.dataVolta}",
"orcamento" : "${this.orcamento}",
"transporte" : "${this.transporte}",
"hospedagem" : "${this.hospedagem}"
}`
return objeto
}


toFirestore(){
const viagem = {
id : this.id,
destino : this.destino,
dataIda : this.dataIda,
dataVolta : this.dataVolta,
orcamento : this.orcamento,
transporte : this.transporte,
hospedagem : this.hospedagem
}
return viagem
}


}