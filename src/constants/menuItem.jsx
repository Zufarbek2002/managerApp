import { BsBriefcaseFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { IoIosCheckbox } from "react-icons/io";
import { MdPieChart } from "react-icons/md";
import { RiServerFill } from "react-icons/ri";

export const menuItem = [
  {
    icon: (colour) => {
      return <><RiServerFill size={20} className={colour} /></>
    },
    name: "Umumiy",
    slug: "/",
  },
  {
    icon: (colour) => {
      return <><IoIosCheckbox size={20} className={colour} /></>
    },
    name: "Bloklanganar",
    slug: "block-langanar",
  },
  {
    icon: (colour) => {
      return <><HiUsers size={20} className={colour} /></>
    },
    name: "Managerlar",
    slug: "managerlar",
  },
  {
    icon: (colour) => {
      return <><BsBriefcaseFill size={20} className={colour} /></>
    },
    name: "Hodimlar",
    slug: "hodimlar",
  },
  {
    icon: (colour) => {
      return <><MdPieChart size={20} className={colour} /></>
    },
    name: "Vazifalar",
    slug: "vazifalar",
  },
];