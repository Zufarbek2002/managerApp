import { useParams } from "react-router-dom"
// import getEmployee from "../../services/getEmployee"
import getSingleStaff from "../../services/getSingleStaff"
import { Button } from "antd"

const StuffSingle = () => {
    const { id } = useParams()
    let data = getSingleStaff(id).data

    return (
        <div className="rounded-2xl border-[1px] p-[25px] border-[#E3E1E1] h-[500px]">
            {data.name ? (<>
                <h1 className="font-[500] text-[24px]">{data.name}</h1>
                <h2 className="text-secondaryColor">{data.last_name}</h2>
                <div className="mt-[25px]">
                    <h1 className="">hunarlari tasks</h1>
                    <ul className="list-decimal text-textDarkGrey flex-col py-5">
                        {data?.tasks ? data.tasks.map((task, index) => (
                            <li key={index} className="ml-5">{task.name}asdf</li>
                        )) : (<p className="">vazifalar tayinlanmagan</p>)}
                    </ul>
                    <Button className="bg-darkGreen hover:bg-darkRed" type="primary">{"Task qo'shish"}</Button>
                </div>
            </>) : (<h1>something went wrong</h1>)}
        </div>
    )
}

export default StuffSingle