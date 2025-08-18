import type { WalletAction, WalletState } from "../../types/Wallet";

export const initialState: WalletState = {
  wallets: [],
  page: 1,
  pageSize: 10,
  totalCount: 0,
  filters: {},
};

export const walletReducer = (
  state: WalletState,
  action: WalletAction
): WalletState => {
  switch (action.type) {
    case "SET_WALLETS":
      return { ...state, wallets: action.payload };
    case "ADD_WALLET":
      return {
        ...state,
        wallets: [action.payload, ...state.wallets].sort(
          (a, b) => Number(b.id) - Number(a.id)
        ),
        page: 1
      };
    case "EDIT_WALLET":
      return {
        ...state,
        wallets: [
            action.payload,
            ...state.wallets.filter(wallet => wallet.id !== action.payload.id)
        ],
      }
    case "DELETE_WALLET":
      return {
        ...state,
        wallets: state.wallets.filter((wallet) => wallet.id !== action.payload),
      };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload, page: 1 };
    default:
      return state;
  }
};

export default walletReducer;