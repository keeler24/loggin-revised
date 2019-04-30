import React from 'react'
import { connect } from 'react-redux'
import { login } from './store'

const Login = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    props.login({
      email: event.target.email.value,
      password: event.target.password.value
    })
      .catch(error => console.log(error))

  }

  return (
    <div className='h100 w100 flex column align-items-center justify-center'>
      <h1>Let's Loggin'!</h1>
      <div className='flex w50'>
        <img src='/loggin.png' />
        <form className='grow1' onSubmit={handleSubmit}>
          <div className='flex column'>
            <div className='flex column m1'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' className='input' />
            </div>
            <div className='flex column m1'>
              <label htmlFor='email'>Password</label>
              <input type='password' name='password' className='input' />
            </div>
            <div className='m1'>
              <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  };
}

export default connect(null, mapDispatchToProps)(Login)
