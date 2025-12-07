import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);
  return <div></div>;
};

export default DashboardLayout;
