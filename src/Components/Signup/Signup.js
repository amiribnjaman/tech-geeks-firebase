import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase/Firebase.init'

const googleProvider = new GoogleAuthProvider();
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({value: '', error: ''})
  const [password, setPassword] = useState({value: '', error: ''})
  const [confirmPass, setConfirmPass] = useState({value: '', error: ''})

  // Sing in google auth
  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }


  // Sign up with email and password
  const handleEmailBlur = e => {
    if(e.target.value === ''){
      setEmail({value: '', error: 'Field must not be empty!'})
    } else {
      setEmail({value: e.target.value, error: ''});
    }
  }
  const handlePasswordBlur = e => {
    if(e.target.value === ''){
      setPassword({value: '', error: 'Field must not be empty!'})
    } else if (e.target.value.length < 7){
      setPassword({value: '', error: 'Password is too short!'})
    } else {
      setPassword({value: e.target.value, error: ''});
    }
  }
  const handleConfirmPassBlur = e => {
    if(e.target.value === ''){
      setConfirmPass({value: '', error: 'Field must not be empty!'})
    }else if(password != e.target.value){
      setConfirmPass({value: '', error: 'Confirm password doesn\'t matched'})
    } else {
      setConfirmPass({value: e.target.value, error: ''});
    }
  }

  const handleSignupForm = e => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      setEmail('')
  }

  return (
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
  );
};

export default Signup;
