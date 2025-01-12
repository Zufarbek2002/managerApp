import { useState } from "react";
import LogoI from "../../assets/logo";
import { menuItem } from "../../constants/menuItem";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
 const [isActive, setisActive] = useState(0)
  return <div className="flex ">
    <div className="sidebar w-[230px] h-screen bg-[#F3F3F3] border-r-[2px] border-[#E8E8E8] p-[16px]">
      <div className="mb-[25px]">
        <a href="#">
          <LogoI />
        </a>
      </div>
      <div>
        {menuItem.map((item, index) => (
          <NavLink to={item.slug} onClick={() => index == isActive.activeIndex? setisActive({activeIndex:index,color:'text-[red]'}) : setisActive({activeIndex:index,color:'text-[black]'})} key={index} className={`${isActive.activeIndex == index ? 'bg-[#E8E8E8]' : ''} gap-5 rounded-lg block`}>

            <div className="flex items-center gap-1 p-2 mb-2 cursor-pointer">
              <div>
                {item.icon(`${isActive.color}`)}
              </div>
              <p className={`${isActive.activeIndex == index ? 'text-[black]' : 'text-[#2c3030a9]'} drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] font-[500] text-[#E8E8E8]`}>{item.name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>

    <div className="mainSide w-full">
      <div className="navbar border-b-2 border-[#E8E8E8] px-[24px] py-[14px] flex">
        <div className="flex ml-auto">
          <button className="">manager@mail.ru</button>
        </div>
      </div>
      <div className="content py-[28px] px-[24px]">
        <Outlet />
      </div>
    </div>
  </div>;
};

export default Home;
