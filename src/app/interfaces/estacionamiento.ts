export interface Estacionamiento{
    id:number;
    patente:string;
    horaIngreso:string;
    horaEgreso: string | null;
    costo: number|null;
    idUsuarioIngreso:string;
    idUsuarioEgreso:string;
    idCochera: number;
    eliminado:null;
}
