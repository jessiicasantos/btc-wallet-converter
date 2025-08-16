export interface Column {
  id: 'nome' | 'sobrenome' | 'email' | 'valor_carteira' | 'valor_btc' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
}

export interface Data {
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
  valor_btc: number;
  actions: any;
}