import { Observable } from "rxjs";


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
  date: string
  items: Item[]
  createdAt: string
  updatedAt: string
    currency: string
}


export interface Income {
    _id: string;
    userId: string;
    name: string;
    amount: string;
    currency: string;
    date: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}


export interface Item {
  category: { _id: string, name: string }
  name: string
  price: number

  _id?: string
}

export type ExpenseSummary = Omit<Expense, 'items'> & { total: number };



export interface Field<T> {
  name: keyof T;
  label: string;
  type: string
  sortable?: boolean
}

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}