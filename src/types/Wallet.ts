type WalletType = 'add' | 'edit' | 'delete' | null;

export interface Wallet {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: string;
  data_nascimento: Date;
  data_abertura: Date;
  valor_carteira: number;
  valor_btc: number;
  endereco_carteira: string;
}

export interface WalletContextProps {
  wallets: Wallet[];
  getWallets: any;
  setWallets: (wallets: Wallet[]) => void;
  addWallet: any;
  editWallet: any;
  deleteWallet: any;
  page: any;
  setPage: any;
  pageSize: number;
  totalCount: number;
}