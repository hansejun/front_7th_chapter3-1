import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-1000 border-b border-gray-200 bg-white shadow-xs">
      <div className="px-xl mx-auto flex h-16 max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <div className="gap-base flex items-center">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-bold text-white">
            L
          </div>
          <div>
            <h1 className="m-0 text-xl leading-none font-bold text-gray-900">Hanghae Company</h1>
            <p className="text-muted m-0 mt-[2px] text-[11px] leading-none">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="gap-base flex items-center">
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">Demo User</div>
            <div className="text-muted text-xs">demo@example.com</div>
          </div>
          <div className="bg-primary-weak text-primary flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
