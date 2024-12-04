import React, { useState } from 'react';
import { Shield, Pencil, Trash2, Search } from 'lucide-react';
import { RoleDefinition, Permission } from '../types/auth';
import { RoleModal } from '../components/RoleModal';

// Mock data - replace with actual API calls
const mockPermissions: Permission[] = [
  { id: 'view_users', name: 'View Users', roles: ['admin', 'moderator'] },
  { id: 'manage_users', name: 'Manage Users', roles: ['admin'] },
  { id: 'view_roles', name: 'View Roles', roles: ['admin', 'moderator'] },
  { id: 'manage_roles', name: 'Manage Roles', roles: ['admin'] },
  { id: 'view_permissions', name: 'View Permissions', roles: ['admin'] },
  { id: 'manage_permissions', name: 'Manage Permissions', roles: ['admin'] },
];

const mockRoles: RoleDefinition[] = [
  {
    name: 'admin',
    permissions: ['view_users', 'manage_users', 'view_roles', 'manage_roles', 'view_permissions', 'manage_permissions'],
  },
  {
    name: 'moderator',
    permissions: ['view_users', 'view_roles'],
  },
  {
    name: 'user',
    permissions: ['view_users'],
  },
];

export function RolesPage() {
  const [roles, setRoles] = useState<RoleDefinition[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | undefined>();

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (roleData: Partial<RoleDefinition>) => {
    const newRole: RoleDefinition = {
      name: roleData.name!,
      permissions: roleData.permissions || [],
    };
    setRoles([...roles, newRole]);
  };

  const handleEditRole = (roleData: Partial<RoleDefinition>) => {
    setRoles(roles.map(role =>
      role.name === selectedRole?.name
        ? { ...role, ...roleData }
        : role
    ));
  };

  const handleDeleteRole = (roleName: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.name !== roleName));
    }
  };

  const openModal = (role?: RoleDefinition) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const getPermissionNames = (permissionIds: string[]): string => {
    return permissionIds
      .map(id => mockPermissions.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
          <p className="mt-1 text-sm text-gray-500">Manage system roles and their permissions</p>
        </div>
        <button
          onClick={() => openModal()}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Shield className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search roles..."
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
                  Role Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {getPermissionNames(role.permissions)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(role)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.name)}
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

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(undefined);
        }}
        onSubmit={selectedRole ? handleEditRole : handleAddRole}
        role={selectedRole}
        title={selectedRole ? 'Edit Role' : 'Add Role'}
        availablePermissions={mockPermissions}
      />
    </div>
  );
}