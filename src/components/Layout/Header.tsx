import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 h-16 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">RBAC Dashboard</h1>
          </div>
          
          <div className="ml-4 flex items-center md:ml-6">
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User size={20} />
                <span>{user?.name}</span>
              </button>
            </div>
            <button
              onClick={logout}
              className="ml-4 p-2 text-gray-500 hover:text-gray-700"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}