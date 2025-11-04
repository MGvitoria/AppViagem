export class Atividade {
    public id!: string;
    public idViagem!: string;
    public nome!: string;
    public detalhes!: string;
    public data!: Date; 

    private toDate = (value: any) => {
        if (value instanceof Date) return value;
        if (value && typeof value.toDate === 'function') return value.toDate(); 
        if (value) return new Date(value);
        return new Date();
    };

    constructor(obj?: Partial<Atividade>) {
        if (obj) {
            this.id = obj.id || '';
            this.idViagem = obj.idViagem || '';
            this.nome = obj.nome || '';
            this.detalhes = obj.detalhes || '';
            this.data = this.toDate(obj.data);
        } else {
            this.data = new Date();
        }
    }

    toFirestore() {
        return {
            idViagem: this.idViagem,
            nome: this.nome,
            detalhes: this.detalhes,
            data: this.data.toISOString().split('T')[0],
        };
    }
}