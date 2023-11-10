import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  
 const {  setToken} = useContext(authContext)


  let navigate = useNavigate()
const [fail, setFail] = useState(null)
const [success, setSuccess] = useState(null)
const [isLoading, setIsLoading] = useState(false)

let user = {
  email : "",
  password:"",
}

async function getLogin(values){

  setIsLoading(true)

  try{
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)

  
  if(data.message === "success"){

    setToken(data.token);
    localStorage.setItem("tkn" , data.token);

    setSuccess("welcome to our world");
    setTimeout(function(){
      navigate("/products")
    },1000)
  }
  
  }
  catch(err){
    console.log(err.response.data.message);
    setFail(err.response.data.message)
  }

    setIsLoading(false)

  }


const formikObj = useFormik({
  initialValues:user,
  onSubmit: getLogin,
  
  validate:function(values){
    setFail(null);
  }
 })

  return <>

  <Helmet>
      <title>Login</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
    <div className='w-75 m-auto py-5 shadow px-5 my-5 rounded-2'>
      <h1 className='py-5 text-center'>Login Now</h1>

    <form onSubmit={formikObj.handleSubmit}>

      
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.email} type="email" id='email' placeholder='E-mail' className='form-control mb-3'/>
      {formikObj.errors.email && formikObj.touched.email? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.email} </p>  : "" }
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.password} type="password" id='password' placeholder='Password' className='form-control mb-3'/>
      {formikObj.errors.password && formikObj.touched.password? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.password} </p>  : "" }
      
      
      {fail ? <div className='alert alert-danger'> {fail} </div>: ""}
      {success ? <div className='alert alert-success'> {success} </div>: ""}
      <button type='submit' disabled={ formikObj.isValid === false || formikObj.dirty === false  } className='btn btn-success ms-auto d-block'>
        
        {isLoading === false? "Login" : <ThreeDots 
            height="50" 
            width="50" 
            radius="9"
            color="#fff" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />}
       
      
        
      
      </button>

      <Link  to={"/ForgetPassword"}> Forget password ? </Link>
    </form>

    </div>
  
  </>
}

