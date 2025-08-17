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
  getWallets: (filters?: any, page?: number, pageSize?: number) => Promise<void>;
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => Promise<void>;
  editWallet: (wallet: Wallet) => Promise<void>;
  deleteWallet: (id: string) => Promise<void>;
  page: any;
  setPage: any;
  pageSize: number;
  totalCount: number;
}