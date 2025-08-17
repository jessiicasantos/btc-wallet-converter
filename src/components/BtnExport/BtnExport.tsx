import React from "react";
import type { Column } from "../../types/DataTable";
import type { Wallet } from "../../types/Wallet";

interface BtnExportProps {
  wallets: Wallet[];
  columns: Column[];
  className?: string;
  children?: React.ReactNode;
}

const BtnExport: React.FC<BtnExportProps> = ({ wallets, columns, className, children }) => {
  const handleExport = () => {
    const headers = columns
      .filter(col => col.id !== 'actions')
      .map(col => col.label)
      .join(',');

    const rows = wallets.map(wallet => {
      return columns
        .filter(col => col.id !== 'actions')
        .map(col => {
          const value = wallet[col.id as keyof Wallet];
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'carteiras.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className={className} onClick={handleExport}>
      {children}
    </button>
  );
};

export default BtnExport;