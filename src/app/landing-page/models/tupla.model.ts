export interface User{
  id: number;
  direccion_url: string;
  id_usuario: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetResponse {
  response: User[];
}

export interface Historial{
  id: number;
  status: string;
  id_url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetResponseH {
  response: Historial[];
}

