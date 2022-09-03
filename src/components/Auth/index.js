import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('email')} placeholder="Enter email" />
        </div>
        <div>
          <input {...register('password')} placeholder="Enter password" />
        </div>
        <button type="submit">Login</button>
      </form> */}
      Login
    </div>
  )
}

export default Login
