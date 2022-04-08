import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase/Firebase.init';
import toast from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPass, setConfirmPass] = useState({ value: '', error: '' })
  const [error, setError] = useState('')

  // Sing in google auth
  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate('/')
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
    } else if (e.target.value.length < 6) {
      setPassword({ value: '', error: 'Password is too short!' })
    } else {
      setPassword({ value: e.target.value, error: '' });
    }
  }
  const handleConfirmPassBlur = e => {
    if (e.target.value === '') {
      setConfirmPass({ value: '', error: 'Field must not be empty!' })
    } else if (password.value !== e.target.value) {
      setConfirmPass({ value: '', error: 'Confirm password doesn\'t matched' })
    } else {
      setConfirmPass({ value: e.target.value, error: '' });
    }
  }

  const handleSignupForm = e => {
    e.preventDefault()

    if (email.value !== '' && password.value !== '' && confirmPass.value !== '') {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success('User created successfully', { id: 'success', duration: 6000, style: { padding: '10px 20px', fontSize: '15px' } })
          // navigate('/')
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          toast.error(errorMessage, { id: 'error', duration: 6000, style: { padding: '10px 20px', fontSize: '15px' } })
        });
    } else {
      if (email.value === '') {
        setEmail({ value: '', error: 'Field must not be empty!' })
      }
      if (password.value === '') {
        setPassword({ value: '', error: 'Field must not be empty!' })
      }
      if (confirmPass.value === '') {
        setConfirmPass({ value: '', error: 'Field must not be empty!' })
      }
    }


  }

  return (
    <>
      <div className='auth-form-container '>
        <div className='auth-form'>
          <h1>Sign Up</h1>
          <form onSubmit={handleSignupForm}>
            <div className='input-field'>
              <label htmlFor='email'>Email</label>
              <div className='input-wrapper'>
                <input onBlur={handleEmailBlur} type='email' name='email' id='email' />
              </div>
              <p className="error">{email?.error}</p>
            </div>
            <div className='input-field'>
              <label htmlFor='password'>Password</label>
              <div className='input-wrapper'>
                <input onBlur={handlePasswordBlur} type='password' name='password' id='password' />
              </div>
              <p className="error">{password?.error}</p>
            </div>
            <div className='input-field'>
              <label htmlFor='confirm-password'>Confirm Password</label>
              <div className='input-wrapper'>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirm-password'
                  onBlur={handleConfirmPassBlur}
                />
              </div>
              <p className="error">{confirmPass?.error}</p>
            </div>
            <button type='submit' className='auth-form-submit'>
              Sign Up
            </button>
          </form>
          <p className='redirect'>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
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
    </>
  );
};

export default Signup;
