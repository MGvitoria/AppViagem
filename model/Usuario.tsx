export class Usuario{
public id!: string;
public nome!: string;
public email!: string;
public fone!: string;
public senha!: string;
public dataNascimento!: string;


constructor(obj?: Partial<Usuario>){
this.id = obj?.id ?? ''
this.nome = obj?.nome ?? ''
this.email = obj?.email ?? ''
this.fone = obj?.fone ?? ''
this.senha = obj?.senha ?? ''
this.dataNascimento = obj?.dataNascimento ?? ''
}


toString(): string {
const objeto = `{
"id" : "${this.id}",
"nome" : "${this.nome}",
"email" : "${this.email}",
"fone" : "${this.fone}",
"senha" : "${this.senha}",
"dataNascimento" : "${this.dataNascimento}"
}`
return objeto
}


toFirestore(){
const usuario = {
id : this.id,
nome : this.nome,
email : this.email,
fone : this.fone,
senha : this.senha,
dataNascimento : this.dataNascimento
}
return usuario
}


}