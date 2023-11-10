import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let navigate = useNavigate()
const [fail, setFail] = useState(null)
const [success, setSuccess] = useState(null)
const [isLoading, setIsLoading] = useState(false)

let user = {
  name : "",
  email : "",
  password:"",
  rePassword:"",
  phone:""
}

async function getSubmit(values){

  setIsLoading(true)

  try{
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)

  console.log(data.message);
  if(data.message === "success"){
    setSuccess(data.message)
    setTimeout(function(){
      navigate("/login")
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
  onSubmit: getSubmit,
  
  validate:function(values){
    setFail(null);

    let errors = {}

    if(values.name.length < 3 || values.name.length > 10){
      errors.name = "name must be from 3 characters to 10 characters"
    }

    if(values.email.includes("@") === false || values.email.includes(".") === false ){
      errors.email = "email must include ( @ and .) to be valid "
    }

    if(! values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
      errors.phone = "your Phone must be 11 digits starting with 01"
    }
    if(! values.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
      errors.password = "Your password must be from 6 to 16 character and has at least one number and has at least one special character"
    }
    if(values.rePassword !== values.password){
      errors.rePassword = "Your repassword not match with password"
    }
    return errors
  }
 })

  return <>

    <Helmet>
      <title>Register</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
    <div className='w-75 m-auto py-5 shadow px-5 my-5 rounded-2'>
      <h1 className='py-5 text-center'>Register Now</h1>

    <form onSubmit={formikObj.handleSubmit}>

      <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange}  value={formikObj.values.name} type="text" id='name' placeholder='Name'className='form-control mb-3' />
      {formikObj.errors.name && formikObj.touched.name? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.name} </p>  : "" }
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.email} type="email" id='email' placeholder='E-mail' className='form-control mb-3'/>
      {formikObj.errors.email && formikObj.touched.email? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.email} </p>  : "" }
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.password} type="password" id='password' placeholder='Password' className='form-control mb-3'/>
      {formikObj.errors.password && formikObj.touched.password? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.password} </p>  : "" }
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.rePassword} type="password" id='rePassword' placeholder='Repassword' className='form-control mb-3'/>
      {formikObj.errors.rePassword && formikObj.touched.rePassword? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.rePassword} </p>  : "" }
      <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" placeholder='Phone' id='phone' className='form-control mb-3'/>
      {formikObj.errors.phone && formikObj.touched.phone? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.phone} </p>  : "" }
      {fail ? <div className='alert alert-danger'> {fail} </div>: ""}
      {success ? <div className='alert alert-success'> {success} </div>: ""}
      <button type='submit' disabled={ formikObj.isValid === false || formikObj.dirty === false  } className='btn btn-success ms-auto d-block'>
        
        {isLoading === false? "Register" : <ThreeDots 
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
    </form>

    </div>
  
  </>
}
