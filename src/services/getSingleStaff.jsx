/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query"
import { customAxios } from "../hooks/customAxios"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const getSingleStaff = (id) => {

    const { token } = useContext(AuthContext);

    const { data = [] } = useQuery({
        queryKey: ['managers'],
        queryFn: () => customAxios.get(`/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            return res.data;
        }).catch(e => console.log(e))
    })

    return { data }
}

export default getSingleStaff