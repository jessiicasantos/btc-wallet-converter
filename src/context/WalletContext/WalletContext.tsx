import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import type { Wallet, WalletContextProps } from '../../types/Wallet';

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
  
  return (
    <WalletContext.Provider value={{ wallets, getWallets, setWallets, addWallet, editWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};