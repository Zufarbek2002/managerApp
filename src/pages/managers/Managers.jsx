import { Button, Form, Input, Modal, Select } from "antd";
import CustomTable from "../../components/CustomTable";
import getManagers from "../../services/getManagers"
import deleteManagerMuation from "../../services/deleteManager";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import updateManagerMuation from "../../services/updateManager";

const Manager = () => {

    const managers = getManagers();
    const deleteMuation = deleteManagerMuation();
    const updateMuation = updateManagerMuation();
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [id, setId] = useState(false);
    const [state, setState] = useState(null);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState();

    const columns = [
        {
            key: 1,
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 2,
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 3,
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            key: 4,
            title: 'Update',
            dataIndex: 'id',
            render: (id) => <Button onClick={() => {
                const data = managers.data.find(u => u.id == id);

                setEmail(data.email);
                setName(data.name);
                setStatus(data.isActive);
                setModal(true);
                setId(id);

            }} style={{ backgroundColor: 'green' }} type='primary' >Update</Button>
        },
        {
            key: 5,
            title: 'Delete',
            dataIndex: 'id',
            render: (id) => <Button onClick={() => {
                setModalDelete(true);
                setId(id);
            }} style={{ backgroundColor: 'red' }} type='primary' >Delete</Button>
        },
    ]

    return (
        <div>
            <Toaster position="'top-center" />
            <CustomTable data={managers.data} loading={deleteMuation.isPending} columns={columns} scroll={{ x: 5, y: 500 }} />
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                onClose={() => setModal(false)}
                onOk={() => {
                    if (state == 'add'){
                        
                    }
                    if (state == 'update') {
                        updateMuation.mutate({ id, data: { email, name, isActive: status } });
                        if (deleteMuation.isSuccess) toast.success('Manager Updated');
                        setModal(false);
                        setState(null);
                    }
                    setState(null);
                    setId(null);
                }}

                className="!flex flex-col items-center"
            >
                <p className="text-xl">Update User</p>
                <div className="flex pt-5 flex-col w-[300px]">
                    <Form.Item label='Email' layout="vertical" >
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label='Name' layout="vertical" >
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label='Activity' layout="vertical" >
                        <Select onSelect={value => console.log(value)
                        } value={status ? 'Active' : 'DiActive'}>
                            <Option key="active" >{'Active'}</Option>
                            <Option key="diactive" >{'DiActive'}</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Modal>
            <Modal
                open={modalDelete}
                onCancel={() => setModalDelete(false)}
                onClose={() => setModalDelete(false)}
                onOk={() => {
                    deleteMuation.mutate(id);
                    if (deleteMuation.isSuccess) toast.success('Manager Deleted')
                    setModalDelete(false);
                    setId(null)
                }}
            >
                <p className="text-xl"> Are you sure</p>
            </Modal>
        </div>
    )
}

export default Manager