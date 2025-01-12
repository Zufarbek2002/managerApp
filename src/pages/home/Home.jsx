import { useState } from "react";
import LogoI from "../../assets/logo";
import { NavLink, Outlet } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { menuItem } from "../../constants/menuItem";

const Home = () => {
  const [numberF, setNumberF] = useState(0)

  let newFunck = (index) => {
    setNumberF(index)
  }

  return (
    <div className="flex ">
      <div className="sidebar w-[230px] h-screen bg-[#F3F3F3] border-r-[2px] border-[#E8E8E8] p-[16px]">
        <div className="mb-[25px]">
          <a href="#">
            <LogoI />
          </a>
        </div>
        <div>

          {menuItem.map((item, index) => (
            <NavLink onClick={() => { newFunck(index) }} to={item.slug} key={index} className={`${index == numberF ? 'bg-[#E8E8E8]' : 'text-[#141A1899]'} p-[13px] w-full flex items-center rounded-lg`}>
              <div>{item.icon(`${index == numberF ? 'text-darkGreen' : 'text-[#141A1899]'}`)}</div>
              <p className="ml-2">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mainSide w-full">
        <div className="navbar border-b-2 border-[#E8E8E8] px-[24px] py-[14px] flex">
          <div className="flex flex-col ml-auto leading-4">
            <div className="flex cursor-pointer ml-auto">
              <button className="block mr-2">manager@mail.ru</button>
              <IoIosArrowDown className="text-[#141A1899]" />
            </div>
            <button className="text-[#141A1899]">Администратор компании</button>
          </div>
        </div>
        <div className="content py-[28px] px-[24px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
