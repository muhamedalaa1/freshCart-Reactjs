import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import {  useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function GetNewPass() {
  
  let navigate = useNavigate()
const [fail, setFail] = useState(null)
const [success, setSuccess] = useState(null)
const [isLoading, setIsLoading] = useState(false)

let user = {
  email : "",
  newPassword:"",
}

async function getUpdatePassword(values){
console.log(values);
  setIsLoading(true)

  try{
  const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , values)

  console.log(data);
  

    console.log("success");

    setSuccess("Password Updated");
    setTimeout(function(){
      navigate("/Login")
    },1000)
  
  
  }
  catch(err){
    console.log(err.response.data.message);
    setFail(err.response.data.message)
  }

    setIsLoading(false)

  }


const formikObj = useFormik({
  initialValues:user,
  onSubmit: getUpdatePassword,
  
  validate:function(values){
    setFail(null);

    let errors = {}

    

    if(values.email.includes("@") === false || values.email.includes(".") === false ){
      errors.email = "email must include ( @ and .) to be valid "
    }

    
    if(! values.newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
      errors.newPassword = "Your password must be from 6 to 16 character and has at least one number and has at least one special character"
    }
    
    return errors
  }
 })

  return <>

  <Helmet>
      <title>update password</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
    <div className='w-75 m-auto py-5 shadow px-5 my-5 rounded-2'>
      <h1 className='py-5 text-center'>update password</h1>

    <form onSubmit={formikObj.handleSubmit}>

      
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.email} type="email" id='email' placeholder='E-mail' className='form-control mb-3'/>
      {formikObj.errors.email && formikObj.touched.email? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.email} </p>  : "" }
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.newPassword} type="password" id='newPassword' placeholder='new Password' className='form-control mb-3'/>
      {formikObj.errors.newPassword && formikObj.touched.newPassword? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.newPassword} </p>  : "" }
      
      
      {fail ? <div className='alert alert-danger'> {fail} </div>: ""}
      {success ? <div className='alert alert-success'> {success} </div>: ""}
      <button type='submit' disabled={ formikObj.isValid === false || formikObj.dirty === false  } className='btn btn-success ms-auto d-block'>
        
        {isLoading === false? "Confirm new password" : <ThreeDots 
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

