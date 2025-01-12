import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../hooks/customAxios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const getTasks = () => {
  const { token } = useContext(AuthContext);

  const { data = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      customAxios
        .get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data.map((m, index) => {
            return {
              ...m,
              key: index,
            };
          });
        })
        .catch((e) => console.log(e)),
  });

  return { data };
};

export default getTasks;
