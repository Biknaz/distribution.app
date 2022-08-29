import { ReactElement } from "react";

export interface ILinkObj {
  name: string;
  href: string;
  icon: ReactElement;
  current: boolean;
}

export interface IStatus {
  id: number;
  title: string;
}

export interface IType {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILogin {
  phone: string;
  password: string;
}

export interface IAuthorization {
  name: string;
  phone: string;
  password: string;
}

export interface IAutoComplete {
  index: string;
  search: string;
  filter?: string[];
}

export interface IUser {
  id: number;
  name: string;
  phone?: string;
  role?: IRole;
  orders?: IOrder[];
  bonuses?: number;
  cashback?: number;
  password?: string;
}

export interface IRole {
  id: number;
  title: string;
}

export interface IOrder {
  id: number;
  status: IOrderStatus;
  user?: IUser;
  items?: IOrderItem[];
  summa?: number;
  byBonus?: boolean;
  createdAt?: string;
}

export interface IOrderStatus {
  id: number;
  title: string;
}

export interface IOrderItem {
  id: number;
  item: IItem;
  count: number;
}

export interface IItem {
  id: number;
  title: string;
  price?: number;
  byBonus?: boolean;
  file?: {
    id: number;
    name: string;
    path: string;
  };
}
