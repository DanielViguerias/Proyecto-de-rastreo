import { Time } from "@angular/common"

export interface MovimientosI{
    movId?: string,
    usuarioId?: string,
    usuario?: {
      usuarioid?: string,
      nombre: string,
      correo?: string,
      password?: string,
      role?: string,
      active?: boolean,
      movimientos?:[]
    },
    recursoId?: string,
    recurso?: {
      recursoId?: string,
      nombre?:string,
      tipo?: string,
      active?: boolean,
      movimientos?:[]
    },
    fInicio?: "1997-08-19T18:00:00.000Z",
    fFin?: string,
    active?: boolean
  }