import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { ModalProvider } from './context/ModalContext/ModalContext.tsx';
import { AlertProvider } from './context/AlertContext/AlertContext.tsx';
import { WalletProvider } from './context/WalletContext/WalletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <AlertProvider>
        <WalletProvider>
          <RouterProvider router={router} />
        </WalletProvider>
      </AlertProvider>
    </ModalProvider>
  </StrictMode>
)
