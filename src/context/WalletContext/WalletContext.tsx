import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import type { Wallet, WalletContextProps } from '../../types/Wallet';

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const getWallets = async (filters = {}, page = 1, limit = 10) => {
    try {
      const likeFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [`${key}_like`, value])
      );

      const params = filters && Object.keys(filters).length > 0 ? {...likeFilters, _page: page, _limit: limit} : {};

      let response = await axios.get(
        'http://localhost:3000/users', {
          params
        });
      
      let dataResponse = response.data;

      setWallets(dataResponse);
      setTotalCount(Number(response.headers['x-total-count']) || dataResponse.length);
    } catch (error) {
      console.error('Erro ao buscar carteiras', error);
    }
  }

  const addWallet = async (walletData: Wallet): Promise<void> => {
    setWallets([...wallets, walletData]);
  }

  const editWallet = async (walletData: Wallet): Promise<void> => {
    const updatedWallet = wallets.findIndex(w => w.id == walletData.id);
    let newWallets = [...wallets];

    newWallets[updatedWallet] = walletData;
    setWallets(newWallets);
  }

  const deleteWallet = async (walletId: string): Promise<void> => {
    const updatedWallet = wallets.findIndex(w => w.id == walletId);
    let newWallets = [...wallets];
    newWallets.splice(updatedWallet, 1);

    setWallets(newWallets);
  }
  
  return (
    <WalletContext.Provider value={{ wallets, getWallets, page, setPage, pageSize, totalCount, setWallets, addWallet, editWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};