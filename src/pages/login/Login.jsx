import { Button, Form, Input, Spin } from "antd"
import { useContext, useState } from "react"
import { customAxios } from "../../hooks/customAxios";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";

const Login = () => {

  const { setToken } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {

    setIsLoading(true);
    customAxios.post('/login', {
      email,
      password
    }).then(res => {
      setToken(res.data.accessToken);
    }).catch(_ => {
      toast.error('Email or Password incorrect');
    }).finally(() => setTimeout(() => setIsLoading(false), 200))
  }

  return <div className="flex w-full h-screen justify-center items-center">
    <Toaster position="top-right" />
    <div className="flex flex-col h-[450px] gap-3 w-[400px] px-10 py-8 rounded-md">
      <p className="text-2xl font-semibold py-3 border-b-2 border-b-slate-300">Kirish</p>
      <Form size='large' className="flex text-lg font-semibold gap-5 flex-col tex-xl">
        <Form.Item name='email' layout="vertical" label='E-mail'>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="font-sans" placeholder="Email kiriting" />
        </Form.Item>
        <Form.Item name='password' layout="vertical" label='Parol'>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} className="font-sans" placeholder="Parol kiriting" />
        </Form.Item>
        <Form.Item name='vertical' className="mt-6">
          <Button onClick={handleLogin} className="!text-md px-1 py-2 text-white font-semibold bg-darkGreen w-[72px] h-[40px]">
            { isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Kirish'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login