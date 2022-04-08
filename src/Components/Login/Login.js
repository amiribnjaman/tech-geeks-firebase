import React, { useState } from "react";
import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/Firebase.init'

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const user = result.user;
        // console.log(user);
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  // Sign up with email and password
  const handleEmailBlur = e => {
    if (e.target.value === '') {
      setEmail({ value: '', error: 'Field must not be empty!' })
    } else {
      setEmail({ value: e.target.value, error: '' });
    }
  }
  const handlePasswordBlur = e => {
    if (e.target.value === '') {
      setPassword({ value: '', error: 'Field must not be empty!' })
    } else {
      setPassword({ value: e.target.value, error: '' });
    }
  }

  const handleLoginForm = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/')
      })
      .catch((error) => {
        // const errorMessage = error.message;
      });

  }

  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Login</h1>
        <form onClick={handleLoginForm}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input onBlur={handleEmailBlur} type='text' name='email' id='email' />
            </div>
            <p className='error'>{email?.error}</p>
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input onBlur={handlePasswordBlur} type='password' name='password' id='password' />
            </div>
            <p className='error'>{password?.error}</p>
          </div>
          <button type='submit' className='auth-form-submit'>
            Login
          </button>
        </form>
        <p className='redirect'>
          New to Tech Geeks?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
