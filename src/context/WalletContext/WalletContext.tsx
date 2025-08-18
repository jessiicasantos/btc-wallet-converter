import { createContext, useContext, useReducer } from "react";
import type { Wallet, WalletContextProps } from "../../types/Wallet";
import walletReducer, { initialState } from "./WalletReducer";
import axios from "axios";

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [ state, dispatch ] = useReducer(walletReducer, initialState);
  
  const getWallets = async (filters = state.filters, page = state.page, limit = state.pageSize) => {
    try {
      let likeFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [`${key}_like`, value])
      );
      
      let params = {
        ...likeFilters,
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc'
      };
      
      let response = await axios.get('http://localhost:3000/users', { params });
      let dataResponse = response.data;
      
      dispatch({ type: 'SET_WALLETS', payload: dataResponse });
      dispatch({ type: 'SET_TOTAL_COUNT', payload: response.headers['x-total-count'] || dataResponse.length });
    } catch(error) {
      console.error('Erro ao buscar carteiras', error);
    }
  };
  
  const addWallet = async (walletData: Wallet): Promise<{ success: boolean; error?: any }> => {
    try {
      const response = await axios.post('http://localhost:3000/users/', walletData);
      
      if (response.status === 201) {
        dispatch({ type: 'ADD_WALLET', payload: walletData });
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Erro ao adicionar carteira:', error);
      return { success: false, error };
    }
  };
  
  const editWallet = async (wallet: Wallet): Promise<{ success: boolean; error?: any }> => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${wallet.id}`, wallet);
      
      if (response.status === 200 || response.status === 204) {
        dispatch({ type: 'EDIT_WALLET', payload: wallet });
        return { success: true };
      }
      return { success: false, error: `Status inesperado: ${response.status}` };
    } catch (error) {
      console.error('Erro ao editar carteira:', error);
      return { success: false, error }
    }
  };
  
  const deleteWallet = async (walletId: string): Promise<{ success: boolean; error?: any }> => {
    try {
      let response = await axios.delete(
        `http://localhost:3000/users/${walletId}`
      );
      
      if(response.status === 200 || response.status === 204) {
        dispatch({ type: 'DELETE_WALLET', payload: walletId });
        await getWallets(state.filters, state.page, state.pageSize);
      }
      return { success: false, error: `Status inesperado: ${response.status}` };
    } catch(error) {
      console.error('Erro ao deletar carteira', error);
      return { success: false, error }
    }
  };
  
  return (
    <WalletContext.Provider
    value={{
      wallets: state.wallets,
      page: state.page,
      pageSize: state.pageSize,
      totalCount: state.totalCount,
      getWallets,
      addWallet,
      editWallet,
      deleteWallet,
      setPage: (p: number) => dispatch({ type: 'SET_PAGE', payload: p }),
      setFilters: (f: Record<string, string>) => dispatch({ type: 'SET_FILTERS', payload: f }),
      setWallets: (wallets: Wallet[]) => dispatch({ type: 'SET_WALLETS', payload: wallets })
    }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if(!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
}
