export interface PistasResponse {
  pistas?: Pista[];
}

export interface Pista {
  nombre?:              string;
  horariosDisponibles: HorariosDisponibles;
  deporte?:             string;
  reservas?:            Reserva[];
  uid?:                 string;
}

export interface HorariosDisponibles {
  [day: string]: string[] | undefined;
  Lunes:     any[];
  Martes:    any[];
  Miercoles: any[];
  Jueves:    any[];
  Viernes:   any[];
  Sabado:    any[];
  Domingo:   any[];


}




export interface Reserva {
  fecha?:   Date;
  hora?:    string;
  usuario?: string;
  pista?:   string;
  _id?:     string;
}

