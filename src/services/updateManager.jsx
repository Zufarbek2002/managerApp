import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customAxios } from '../hooks/customAxios'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const updateManagerMuation = () => {

    const query = useQueryClient();
    const { token } = useContext(AuthContext);

    const mutation = useMutation({
        mutationFn: ({ id, data }) => customAxios.patch(`/managers/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        onSuccess: () => query.invalidateQueries({ queryKey: ['managers'] })
    })

    return mutation
}

export default updateManagerMuation