import type { Wallet } from "./Wallet";

export interface Column {
  id: keyof Wallet | 'actions';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
}

export interface Data {
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
  valor_btc: number;
  actions: any;
}