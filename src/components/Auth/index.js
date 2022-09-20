import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { ADMIN, USER } from '../../config/path'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = (data) => {
    axios.get('https://61440844411c860017d25289.mockapi.io/user').then((res) => {
      res?.data?.map((item) => {
        if (data?.email === item?.email && data?.password === item?.password && item.isAdmin === true) {
          history.push('/admin')
          localStorage.setItem(ADMIN, JSON.stringify(item))
        } else if (data?.email === item?.email && data?.password === item?.password && item.isAdmin === false) {
          history.push('/user')
          localStorage.setItem(USER, JSON.stringify(item))
        }
      })
    })
  }

  return (
    <div className="w-full pt-[100px] h-screen bg-[#e7e7e7]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] mx-auto p-5 shadow-lg rounded-lg bg-[#FFFFFF]">
        <div className="text-center text-[24px]">Login</div>
        <div className="mt-[10px]">
          <div className="text-[18px]">Email: </div>
          <input
            {...register('email')}
            placeholder="Enter email"
            className="border-2 mt-[5px] border-[#000] py-1 pl-2 w-[100%]"
          />
        </div>
        <div className="mt-[10px]">
          <div className="text-[18px]">Password: </div>
          <input
            {...register('password')}
            className="border-2 mt-[5px] border-[#000] py-1 pl-2 w-[100%]"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="w-[100%] py-2 mt-[20px] bg-[#e7e7e7]">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
