import React, { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={ "flex items-center justify-center min-h-screen bg-slate-100" }>{ children }</div>
  );
}

export default AuthLayout;