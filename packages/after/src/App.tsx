import React from 'react';
import { Header } from './widgets/header.ui';
import { ManagementPage } from './pages/management/page.ui';
import { ModalRoot } from './app/providers/modal';

export const App: React.FC = () => {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
      <ModalRoot />
    </>
  );
};
