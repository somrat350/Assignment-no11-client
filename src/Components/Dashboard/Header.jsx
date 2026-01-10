import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { FaMoon, FaSun } from "react-icons/fa6";

const Header = () => {
  const { user, userLoading } = useAuth();
  const { role, isLoading } = useRole();
  const get = localStorage.getItem("assignment-no11-theme");
  const getTheme = JSON.parse(get ? get : "true");
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", theme ? "dark" : "light");
    localStorage.setItem("assignment-no11-theme", JSON.stringify(theme));
  }, [theme]);

  if (userLoading || isLoading) return;
  return (
    <div className="pr-5 flex justify-end items-center gap-3 w-full">
      <div
        className="tooltip tooltip-bottom"
        data-tip={`${theme ? "Switch To Light Mode" : "Switch To Dark Mode"}`}
      >
        <button
          onClick={() => setTheme(!theme)}
          className="btn btn-sm btn-circle text-lg"
        >
          {theme ? <FaMoon /> : <FaSun className="text-orange-500" />}
        </button>
      </div>
      <img src={user?.photoURL} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <h2 className="font-semibold text-base">{user?.displayName}</h2>
        <span className="text-sm">{role}</span>
      </div>
    </div>
  );
};

export default Header;
