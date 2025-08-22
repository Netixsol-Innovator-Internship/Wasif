import {
  Users,
  Trash2,
  Shield,
  ShieldCheck,
  UserX,
  UserCheck,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useUnblockUserMutation,
  useBlockUserMutation,
} from "../redux/apiSlice";
import Spinner from "../components/Spinner";

export default function UsersManagement({ userRole }) {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const canManageUser = (targetUserRole) => {
    if (userRole === "superAdmin") return true;
    if (userRole === "admin" && targetUserRole === "user") return true;
    return false;
  };

  const canChangeRole = (targetUserRole) => {
    if (userRole === "superAdmin") return targetUserRole !== "superAdmin";
    if (userRole === "admin") return targetUserRole === "user";
    return false;
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        alert("User deleted successfully!");
      } catch (error) {
        alert("Error deleting user: " + (error.data?.message || error.message));
      }
    }
  };

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (!canChangeRole(currentRole)) {
      alert("You do not have permission to change this user's role");
      return;
    }

    try {
      await updateUserRole({ id: userId, role: newRole }).unwrap();
      alert("User role updated successfully!");
    } catch (error) {
      alert(
        "Error updating user role: " + (error.data?.message || error.message)
      );
    }
  };

  const handleToggleBlock = async (userId, isBlocked) => {
    try {
      if (isBlocked) {
        await unblockUser(userId).unwrap();
      } else {
        await blockUser(userId).unwrap();
      }
      alert("User status updated successfully!");
    } catch (error) {
      alert(
        "Error updating user status: " + (error.data?.message || error.message)
      );
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "superAdmin":
        return <ShieldCheck className="text-purple-600" size={16} />;
      case "admin":
        return <Shield className="text-blue-600" size={16} />;
      default:
        return <Users className="text-gray-600" size={16} />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "superAdmin":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-red-600 text-center py-8">Error loading users</div>
    );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-md text-white">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <p className="text-sm opacity-90">
          Manage roles, access, and user account status
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user, idx) => (
                <tr
                  key={user._id || user.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-purple-50 transition`}
                >
                  {/* User Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {String(
                          user.name ||
                            user.username ||
                            user.email ||
                            "Unknown User"
                        )}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {String(user.email || "No email")}
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {String(user.role || "user")}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        user.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 flex items-center">
                    {canChangeRole(user.role) && (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id || user.id,
                            e.target.value,
                            user.role
                          )
                        }
                        className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="user">User</option>
                        {userRole === "superAdmin" && (
                          <option value="admin">Admin</option>
                        )}
                      </select>
                    )}

                    {/* Hide Block/Delete for superAdmin */}
                    {canManageUser(user.role) && user.role !== "superAdmin" && (
                      <>
                        <button
                          onClick={() =>
                            handleToggleBlock(
                              user._id || user.id,
                              user.isBlocked
                            )
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition flex items-center gap-1 ${
                            user.isBlocked
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-yellow-500 hover:bg-yellow-600 text-white"
                          }`}
                        >
                          {user.isBlocked ? (
                            <UserCheck size={12} />
                          ) : (
                            <UserX size={12} />
                          )}
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user._id || user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm transition"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
