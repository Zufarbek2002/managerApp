import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customAxios } from '../hooks/customAxios'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const deleteManagerMuation = () => {

    const query = useQueryClient();
    const { token } = useContext(AuthContext);

    const mutation = useMutation({
        mutationFn: (id) => customAxios.delete(`/managers/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }),
        onSuccess: () => query.invalidateQueries({ queryKey: ['managers'] })
    })

    return mutation
}

export default deleteManagerMuation