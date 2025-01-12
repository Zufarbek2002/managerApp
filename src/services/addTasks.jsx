import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "../hooks/customAxios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const addTasks = () => {
  const query = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data) =>
      customAxios.post(`/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => query.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return mutation;
};

export default addTasks;
