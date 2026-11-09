import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [fail, setFail] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function getLogin(values) {
    setIsLoading(true);
    setFail(null);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success') {
        setToken(data.token);
        localStorage.setItem('tkn', data.token);
        setSuccess('Welcome back! You are being signed in.');
        setTimeout(() => navigate('/', { replace: true }), 900);
      }
    } catch (err) {
      setFail(err?.response?.data?.message || 'We could not sign you in. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const formikObj = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: getLogin,
    validate: () => {
      setFail(null);
      return {};
    }
  });

  return <>
    <Helmet><title>Sign in | FreshCart</title></Helmet>
    <main className="fc-auth-page">
      <section className="fc-auth-shell fc-auth-login">
        <aside className="fc-auth-aside">
          <div className="fc-auth-brand-mark"><i className="fa-solid fa-leaf" /></div>
          <span className="fc-auth-eyebrow">FRESH PICKS. EVERY DAY.</span>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p>Your everyday essentials, thoughtfully picked and delivered with care.</p>
          <div className="fc-auth-aside-points">
            <span><i className="fa-solid fa-check" /> Fresh finds, all in one place</span>
            <span><i className="fa-solid fa-check" /> A smoother way to shop</span>
          </div>
          <div className="fc-auth-decoration auth-decoration-one" />
          <div className="fc-auth-decoration auth-decoration-two" />
        </aside>
        <div className="fc-auth-content">
          <div className="fc-auth-heading">
            <span className="fc-auth-step">YOUR FRESHCART ACCOUNT</span>
            <h2>Welcome back</h2>
            <p>Sign in to continue to your account.</p>
          </div>
          <form onSubmit={formikObj.handleSubmit} className="fc-auth-form">
            <label className="fc-auth-field">
              <span>Email address</span>
              <div className="fc-auth-input-wrap">
                <i className="fa-regular fa-envelope" />
                <input name="email" id="email" type="email" autoComplete="email" placeholder="you@example.com"
                  onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} required />
              </div>
            </label>
            <label className="fc-auth-field">
              <span>Password</span>
              <div className="fc-auth-input-wrap">
                <i className="fa-solid fa-lock" />
                <input name="password" id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password"
                  onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} required />
                <button type="button" className="fc-auth-password-toggle" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} />
                </button>
              </div>
            </label>
            <div className="fc-auth-meta"><Link to="/ForgetPassword">Forgot password?</Link></div>
            {fail && <div className="fc-auth-alert is-error" role="alert"><i className="fa-solid fa-circle-exclamation" />{fail}</div>}
            {success && <div className="fc-auth-alert is-success" role="status"><i className="fa-solid fa-circle-check" />{success}</div>}
            <button type="submit" disabled={isLoading || !formikObj.values.email || !formikObj.values.password} className="fc-auth-submit">
              {isLoading ? <ThreeDots height="25" width="48" radius="8" color="#fff" ariaLabel="Signing in" visible /> : <>Sign in <i className="fa-solid fa-arrow-right" /></>}
            </button>
          </form>
          <p className="fc-auth-switch">New to FreshCart? <Link to="/register">Create an account</Link></p>
          <div className="fc-auth-trust"><i className="fa-solid fa-shield-halved" /> Your account details are protected</div>
        </div>
      </section>
    </main>
  </>;
}
