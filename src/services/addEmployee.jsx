import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "../hooks/customAxios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const addEmployee = () => {
  const query = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data) =>
      customAxios.post(`/employees`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => query.invalidateQueries({ queryKey: ["employees"] }),
  });

  return mutation;
};

export default addEmployee;
