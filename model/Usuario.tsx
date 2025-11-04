// model/Usuario.tsx

export class Usuario {
    public id!: string; 
    public nome!: string;
    public email!: string;
    public fone!: string; 
    public dataNascimento!: Date; 
    public dataCriacao!: Date;    

    constructor(obj?: Partial<Usuario>) {
        const toDate = (value: any) => value instanceof Date ? value : (value ? new Date(value) : new Date());

        if (obj) {
            this.id = obj.id || '';
            this.nome = obj.nome || '';
            this.email = obj.email || '';
            this.fone = obj.fone || '';
            this.dataNascimento = toDate(obj.dataNascimento);
            this.dataCriacao = toDate(obj.dataCriacao);
        } else {
            this.dataNascimento = new Date();
            this.dataCriacao = new Date();
        }
    }

    toFirestore() {
        return {
            nome: this.nome,
            email: this.email,
            fone: this.fone,
            dataNascimento: this.dataNascimento.toISOString().split('T')[0],
            dataCriacao: this.dataCriacao.toISOString(), 
        };
    }
}