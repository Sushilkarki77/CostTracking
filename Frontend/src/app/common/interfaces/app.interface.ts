

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


export interface Expense {
  _id: string
  userId: string
  name: string
  paymentMethod: string
  note: string
  items: Item[]
  createdAt: string
  updatedAt: string
}

export interface Item {
  category: string
  name: string
  price: number
  currency: string
  _id: string
}

export type ExpenseSummary = Omit<Expense, 'items'> & {total: number};



export interface Field<T> {
  name: keyof T;
  label: string;
  type: string
}