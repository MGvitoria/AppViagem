export class Viagem {
    public id!: string;
    public idUsuario!: string;
    public nome!: string;
    public destino!: string;
    public dataInicio!: Date;
    public dataFim!: Date;    

    private toDate = (value: any) => {
        if (value instanceof Date) return value;
        if (value && typeof value.toDate === 'function') return value.toDate(); 
        if (value) return new Date(value);
        return new Date();
    };

    constructor(obj?: Partial<Viagem>) {
        if (obj) {
            this.id = obj.id || '';
            this.idUsuario = obj.idUsuario || '';
            this.nome = obj.nome || '';
            this.destino = obj.destino || '';
            this.dataInicio = this.toDate(obj.dataInicio);
            this.dataFim = this.toDate(obj.dataFim);
        } else {
            this.dataInicio = new Date();
            this.dataFim = new Date();
        }
    }

    toFirestore() {
        return {
            idUsuario: this.idUsuario,
            nome: this.nome,
            destino: this.destino,
            dataInicio: this.dataInicio.toISOString().split('T')[0],
            dataFim: this.dataFim.toISOString().split('T')[0],
        };
    }
}
