import axios from 'axios';
import { createContext, useContext, useState } from 'react';

type WalletType = 'add' | 'edit' | 'delete' | null;

interface Wallet {
  id?: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: string;
  data_nascimento: Date;
  data_abertura: Date;
  valor_carteira: number;
  endereco_carteira: string;
}

interface WalletContextProps {
  wallets: Wallet[];
  getWallets: any;
  addWallet: any;
  editWallet: any;
  deleteWallet: any;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  
  const getWallets = async () => {
    try {
      let response = await axios.get(
        'http://localhost:3000/users'
      );
      
      let dataResponse = await response.data;

      setWallets(dataResponse);
    } catch (error) {
      console.error('Errrroooo!!!', error);
    }
  }

  const addWallet = (walletData: Wallet) => {
    setWallets([...wallets, walletData]);
  }

  const editWallet = (walletData: Wallet) => {
    const updatedWallet = wallets.findIndex(w => w.id == walletData.id);
    let newWallets = [...wallets];

    newWallets[updatedWallet] = walletData;
    setWallets(newWallets);
  }

  const deleteWallet = (walletId: string) => {
    const updatedWallet = wallets.findIndex(w => w.id == walletId);
    let newWallets = [...wallets];
    newWallets.splice(updatedWallet, 1);

    setWallets(newWallets);
  }

    const filterWallet = (walletId: string) => {
    const updatedWallet = wallets.findIndex(w => w.id == walletId);
    let newWallets = [...wallets];
    newWallets.splice(updatedWallet, 1);

    setWallets(newWallets);
  }

  return (
    <WalletContext.Provider value={{ wallets, getWallets, addWallet, editWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};