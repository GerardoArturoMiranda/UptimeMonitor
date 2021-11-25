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