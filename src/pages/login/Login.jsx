import { Button, Form, Input } from "antd"

const Login = () => {
  return <div className="flex w-full h-screen justify-center items-center">
    <div className="flex flex-col h-[450px] gap-3 w-[370px] px-10 py-8 rounded-md">
      <p className="text-2xl font-semibold py-3 border-b-2 border-b-slate-300">Kirish</p>
      <Form size='large' onFinish={(email, password) => {
        console.log(email, password);

      }} className="flex text-lg font-semibold gap-5 flex-col tex-xl">
        <Form.Item name='email' layout="vertical" label='E-mail'>
          <Input className="font-sans" placeholder="Email kiriting" />
        </Form.Item>
        <Form.Item name='password' layout="vertical" label='Parol'>
          <Input.Password className="font-sans" placeholder="Parol kiriting" />
        </Form.Item>
        <Form.Item name='vertical' className="mt-6">
          <Button className="!text-md px-1 py-2 text-white font-semibold bg-emerald-400 w-[72px] h-[40px]">Kirish</Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login