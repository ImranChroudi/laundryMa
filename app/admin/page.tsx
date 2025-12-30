import DashboardSidebar from "./components/Sidebar";

  //import { useAuth } from "../context/AdminProvider";

const App = () => {
  //const { user } = useAuth();
  return (
    <div className="flex">
      <div className="border-r lg:relative absolute h-screen ">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default App;
