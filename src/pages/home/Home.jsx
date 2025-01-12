import { useState } from "react";
import LogoI from "../../assets/logo";
import { menuItem } from "../../constants/menuItem";
import Details from "../details/Details";

const Home = () => {
 const [isActive, setisActive] = useState(0)

  return <div className="flex ">
    <div className="sidebar w-[230px] h-screen bg-[#F3F3F3] border-r-[2px] border-[#E8E8E8] p-[16px]">
      <div>
        <a href="#">
          <LogoI></LogoI>
        </a>
      </div>
      <div>
        {menuItem.map(audio => (
          <div onClick={() => setisActive(audio.id)} key={audio.id} className={`${isActive == audio.id ? 'bg-white/10' : ''} flex items-center p-2 rounded-md transition-all`}>
          </div>
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
        <Details />
      </div>
    </div>
  </div>;
};

export default Home;
