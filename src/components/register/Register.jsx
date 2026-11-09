import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [fail, setFail] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getSubmit(values) {
    setIsLoading(true);
    setFail(null);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      if (data.message === 'success') {
        setSuccess('Your account has been created. Redirecting you to sign in...');
        setTimeout(() => navigate('/login'), 1100);
      }
    } catch (err) {
      setFail(err?.response?.data?.message || 'We could not create your account. Please review your details and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const formikObj = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    onSubmit: getSubmit,
    validate(values) {
      setFail(null);
      const errors = {};
      if (values.name.length < 3 || values.name.length > 10) errors.name = 'Name must be between 3 and 10 characters.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
      if (!/^(02)?01[0125][0-9]{8}$/.test(values.phone)) errors.phone = 'Enter an Egyptian mobile number starting with 01 (11 digits).';
      if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) errors.password = 'Use 6–16 characters, including a number and a special character.';
      if (values.rePassword !== values.password) errors.rePassword = 'Passwords do not match.';
      return errors;
    }
  });

  const fieldError = (name) => formikObj.touched[name] && formikObj.errors[name];

  return <>
    <Helmet><title>Create account | FreshCart</title></Helmet>
    <main className="fc-auth-page fc-auth-register-page">
      <section className="fc-auth-shell fc-auth-register">
        <aside className="fc-auth-aside">
          <div className="fc-auth-brand-mark"><i className="fa-solid fa-leaf" /></div>
          <span className="fc-auth-eyebrow">A FRESH START</span>
          <h1>Make room<br />for <em>better.</em></h1>
          <p>Create your FreshCart account and make your everyday shopping feel a little easier.</p>
          <div className="fc-auth-aside-points">
            <span><i className="fa-solid fa-check" /> Keep your orders together</span>
            <span><i className="fa-solid fa-check" /> Save your favourite finds</span>
            <span><i className="fa-solid fa-check" /> Shop at your own pace</span>
          </div>
          <div className="fc-auth-decoration auth-decoration-one" />
          <div className="fc-auth-decoration auth-decoration-two" />
        </aside>
        <div className="fc-auth-content">
          <div className="fc-auth-heading">
            <span className="fc-auth-step">JOIN FRESHCART</span>
            <h2>Create your account</h2>
            <p>Just a few details and you’re ready to go.</p>
          </div>
          <form onSubmit={formikObj.handleSubmit} className="fc-auth-form fc-auth-form-grid" noValidate>
            <label className="fc-auth-field">
              <span>Full name</span>
              <div className="fc-auth-input-wrap"><i className="fa-regular fa-user" />
                <input name="name" id="name" type="text" autoComplete="name" placeholder="Your name" value={formikObj.values.name} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} />
              </div>
              {fieldError('name') && <small className="fc-auth-field-error">{formikObj.errors.name}</small>}
            </label>
            <label className="fc-auth-field">
              <span>Email address</span>
              <div className="fc-auth-input-wrap"><i className="fa-regular fa-envelope" />
                <input name="email" id="email" type="email" autoComplete="email" placeholder="you@example.com" value={formikObj.values.email} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} />
              </div>
              {fieldError('email') && <small className="fc-auth-field-error">{formikObj.errors.email}</small>}
            </label>
            <label className="fc-auth-field">
              <span>Password</span>
              <div className="fc-auth-input-wrap"><i className="fa-solid fa-lock" />
                <input name="password" id="password" type="password" autoComplete="new-password" placeholder="Create a password" value={formikObj.values.password} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} />
              </div>
              {fieldError('password') && <small className="fc-auth-field-error">{formikObj.errors.password}</small>}
            </label>
            <label className="fc-auth-field">
              <span>Confirm password</span>
              <div className="fc-auth-input-wrap"><i className="fa-solid fa-lock" />
                <input name="rePassword" id="rePassword" type="password" autoComplete="new-password" placeholder="Repeat your password" value={formikObj.values.rePassword} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} />
              </div>
              {fieldError('rePassword') && <small className="fc-auth-field-error">{formikObj.errors.rePassword}</small>}
            </label>
            <label className="fc-auth-field fc-auth-field-wide">
              <span>Mobile number</span>
              <div className="fc-auth-input-wrap"><i className="fa-solid fa-mobile-screen-button" />
                <input name="phone" id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="01xxxxxxxxx" value={formikObj.values.phone} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} />
              </div>
              {fieldError('phone') && <small className="fc-auth-field-error">{formikObj.errors.phone}</small>}
            </label>
            {fail && <div className="fc-auth-alert is-error fc-auth-field-wide" role="alert"><i className="fa-solid fa-circle-exclamation" />{fail}</div>}
            {success && <div className="fc-auth-alert is-success fc-auth-field-wide" role="status"><i className="fa-solid fa-circle-check" />{success}</div>}
            <button type="submit" disabled={isLoading || !formikObj.isValid || !formikObj.dirty} className="fc-auth-submit fc-auth-field-wide">
              {isLoading ? <ThreeDots height="25" width="48" radius="8" color="#fff" ariaLabel="Creating account" visible /> : <>Create account <i className="fa-solid fa-arrow-right" /></>}
            </button>
          </form>
          <p className="fc-auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <div className="fc-auth-trust"><i className="fa-solid fa-shield-halved" /> Your account details are protected</div>
        </div>
      </section>
    </main>
  </>;
}
