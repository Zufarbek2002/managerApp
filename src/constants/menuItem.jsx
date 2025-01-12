import { BlockOutlined, ToolFilled, UserOutlined } from "@ant-design/icons";
import { FiServer } from "react-icons/fi";

export const menuItem = [
  {
    icon: (path) => {
      return <><FiServer className={path}/></>
    },
    name: "Umumiy",
    slug: "umumiy",
  },
  {
    icon: (path) => {
      return <><BlockOutlined className={path} /></>
    },
    name: "Block langanar",
    slug: "block-langanar",
  },
  {
    icon: (path) => {
      return <><UserOutlined className={path} /></>
    },
    name: "Managerlar",
    slug: "managerlar",
  },
  {
    icon: (path) => {
      return <><UserOutlined className={path} /></>
    },
    name: "Hodimlar",
    slug: "hodimlar",
  },
  {
    icon: (path) => {
      return <><ToolFilled className={path} /></>
    },
    name: "Vazifalar",
    slug: "vazifalar",
  },
];
