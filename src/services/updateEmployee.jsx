import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "../hooks/customAxios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const updateEmployee = () => {
  const query = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({ id, data }) =>
      customAxios.patch(`/employees/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => query.invalidateQueries({ queryKey: ["employees"] }),
  });

  return mutation;
};

export default updateEmployee;
