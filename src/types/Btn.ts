import type { Column } from "./DataTable";
import type { Wallet } from "./Wallet";

export interface BtnExportProps {
  wallets: Wallet[];
  columns: Column[];
  className?: string;
  children?: React.ReactNode;
}