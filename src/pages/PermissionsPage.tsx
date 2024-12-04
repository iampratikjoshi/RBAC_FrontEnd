import React, { useState } from 'react';
import { Key, Pencil, Trash2, Search } from 'lucide-react';
import { Permission } from '../types/auth';
import { PermissionModal } from '../components/PermissionModal';

// Mock data - replace with actual API calls
const mockPermissions: Permission[] = [
  { id: 'view_users', name: 'View Users', roles: ['admin', 'moderator'] },
  { id: 'manage_users', name: 'Manage Users', roles: ['admin'] },
  { id: 'view_roles', name: 'View Roles', roles: ['admin', 'moderator'] },
  { id: 'manage_roles', name: 'Manage Roles', roles: ['admin'] },
  { id: 'view_permissions', name: 'View Permissions', roles: ['admin'] },
  { id: 'manage_permissions', name: 'Manage Permissions', roles: ['admin'] },
];

export function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPermission = (permissionData: Partial<Permission>) => {
    const newPermission: Permission = {
      id: permissionData.id!,
      name: permissionData.name!,
      roles: permissionData.roles || [],
    };
    setPermissions([...permissions, newPermission]);
  };

  const handleEditPermission = (permissionData: Partial<Permission>) => {
    setPermissions(permissions.map(permission =>
      permission.id === selectedPermission?.id
        ? { ...permission, ...permissionData }
        : permission
    ));
  };

  const handleDeletePermission = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
    }
  };

  const openModal = (permission?: Permission) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Permissions</h1>
          <p className="mt-1 text-sm text-gray-500">Manage system permissions and role assignments</p>
        </div>
        <button
          onClick={() => openModal()}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Key className="h-4 w-4 mr-2" />
          Add Permission
        </button>
      </div>

      <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-2 block w-full text-sm border-0 focus:ring-0"
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Roles
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPermissions.map((permission) => (
                <tr key={permission.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{permission.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{permission.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {permission.roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(permission)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePermission(permission.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPermission(undefined);
        }}
        onSubmit={selectedPermission ? handleEditPermission : handleAddPermission}
        permission={selectedPermission}
        title={selectedPermission ? 'Edit Permission' : 'Add Permission'}
      />
    </div>
  );
}