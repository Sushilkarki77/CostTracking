

export type Token = {
  _id: string,
  email: string,
  fullname: string;
};

export const Initial_State: Token = {
  _id: '',
  email: '',
  fullname: ''
};


export interface ResponseItem<T> {
  message?: string
  status?: number
  data: T
}

export interface TokenRes {
  accessToken: string, refreshToken: string
}

export interface Category {
  _id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}
