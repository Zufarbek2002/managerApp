import getManagers from "../../services/getManagers"

const Umumiy = () => {
    const managers = getManagers();
    console.log(managers?.data[0]);
    
    return (
        <div>Umumiy</div>
    )
}

export default Umumiy