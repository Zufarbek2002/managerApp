import { useQuery } from "@tanstack/react-query"
import { customAxios } from "../hooks/customAxios"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const getManagers = () => {

    const { token } = useContext(AuthContext);

    const { data = [] } = useQuery({
        queryKey: ['managers'],
        queryFn: () => customAxios.get('/managers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            return res.data.map((m, index) => {
                return {
                    ...m,
                    key: index,
                    phone: '+7 900 000-00-00'
                }
            });
        }).catch(e => console.log(e))
    })

    return { data }
}

export default getManagers