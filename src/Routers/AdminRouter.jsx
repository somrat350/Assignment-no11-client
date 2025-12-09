import { Link } from "react-router";
import useRole from "../Hooks/useRole";

const AdminRouter = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) return;
  if (role === "admin") {
    return children;
  }
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-10">
      <p className="text-center">
        You don't have permission to access this page!
      </p>
      <Link to="/dashboard" className="btn btn-secondary">
        Go To Dashboard
      </Link>
    </div>
  );
};

export default AdminRouter;
