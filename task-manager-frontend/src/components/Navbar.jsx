import useAuth from "../hooks/useAuth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
      <h1 className="font-semibold text-lg">Task Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Hi, {user?.name}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
