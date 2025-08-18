export type WalletType = 'add' | 'edit' | 'delete' | null;

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
  addWallet: (wallet: Wallet) => Promise<{success: boolean; error?: any}>;
  editWallet: (wallet: Wallet) => Promise<{success: boolean; error?: any}>;
  deleteWallet: (id: string) => Promise<{success: boolean; error?: any}>;
  page: any;
  setPage: any;
  pageSize: number;
  totalCount: number;
  setFilters: (filters: WalletFilters) => void;
  clearFilters: () => void;
}

export type WalletFormData = {
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
};

export type WalletState = {
  wallets: Wallet[];
  page: number;
  pageSize: number;
  totalCount: number;
  filters: Record<string, string>;
};

 export type WalletFilters = {
    nome?: string;
    sobrenome?: string;
    email?: string;
}

export type WalletAction =
  | { type: "SET_WALLETS"; payload: Wallet[] }
  | { type: "ADD_WALLET"; payload: Wallet }
  | { type: "EDIT_WALLET"; payload: Wallet }
  | { type: "DELETE_WALLET"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_TOTAL_COUNT"; payload: number }
  | { type: "SET_FILTERS"; payload: Record<string, string> };