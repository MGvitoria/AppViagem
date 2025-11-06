export class Hospedagem {
public id!: string;
public nomeHospedagem!: string;
public endereco!: string;


constructor(obj?: Partial<Hospedagem>){
this.id = obj?.id ?? ''
this.nomeHospedagem = obj?.nomeHospedagem ?? ''
this.endereco = obj?.endereco ?? ''
}


toString(): string {
const objeto = `{
"id" : "${this.id}",
"nomeHospedagem" : "${this.nomeHospedagem}",
"endereco" : "${this.endereco}"
}`
return objeto
}


toFirestore(){
const hospedagem = {
id : this.id,
nomeHospedagem : this.nomeHospedagem,
endereco : this.endereco
}
return hospedagem
}


}