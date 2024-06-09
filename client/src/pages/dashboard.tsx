import CustomChart from "../components/barChart";
import PieCustomChart from "../components/piChart";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return (
      <div>
        <p>Loading......</p>
      </div>
    );
  }
  return (
    <div className=" bg-white mt-5 ">
      <h3 className="font-bold text-[25px] text-blue-500 text-center uppercase">
        Dashboard
      </h3>
      <div className="flex justify-evenly flex-wrap">
        <PieCustomChart />
        <CustomChart />
      </div>
    </div>
  );
};

export default Dashboard;
