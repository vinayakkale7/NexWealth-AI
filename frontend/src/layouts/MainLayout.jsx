import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="main-layout fade-in">
      <Outlet />
    </div>
  );
}
