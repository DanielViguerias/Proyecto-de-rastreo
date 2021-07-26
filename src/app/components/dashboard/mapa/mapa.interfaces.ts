// --- interfaces necesarias --- //
export interface Lugar {
    id?: number,
    nombre: string,
    domicilio: string,
    geocerca?: google.maps.Polygon
}

export interface user {
    aud: string,
    exp: number,
    idUsuario: number,
    iss: string,
    role: string,
    sub: string
}
export interface punto{
    LugarId: number,
    latitud: number,
    longitud: number
}

export interface sitio{
    lugarId: number, 
    nombre: string,
    domicilio: string,
    latitud?: number,
    longitud?: number,
    active?: boolean
}

export interface pto{
    "latitud":number,
    "longitud":number
}