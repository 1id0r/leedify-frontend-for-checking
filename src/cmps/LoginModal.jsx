import { SpotifyIcon } from '../assets/img/app-header/icons'
import { useState } from 'react'

export function LoginModal({ isOpen, onClose, onLogin, onSignup }) {
  if (!isOpen) return null

  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  })

  if (!isOpen) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isLoginMode) {
      onLogin({ username: formData.username, password: formData.password })
    } else {
      onSignup(formData)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev)
    setFormData({
      email: '',
      username: '',
      password: '',
    })
  }

  return (
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='login-modal'>
        <div className='login-modal__content'>
          <SpotifyIcon className='login-modal__logo' />
          <h1 className='login-modal__title'>{isLoginMode ? 'Log in to Spotify' : 'Sign up for Spotify'}</h1>

          <div className='login-modal__social-buttons'>
            <button className='login-modal__social-button'>
              <img src='/google-icon.png' alt='Google' />
              Continue with Google
            </button>

            <button className='login-modal__social-button'>
              <img src='/apple-icon.png' alt='Apple' />
              Continue with Apple
            </button>
          </div>

          <div className='login-modal__divider'>
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className='login-modal__form'>
            {!isLoginMode && (
              <div className='login-modal__form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className='login-modal__form-group'>
              <label>Username</label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                placeholder='Username'
                required
              />
            </div>

            <div className='login-modal__form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Password'
                required
              />
            </div>

            <button type='submit' className='login-modal__submit'>
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {isLoginMode && (
            <a href='#' className='login-modal__forgot'>
              Forgot your password?
            </a>
          )}

          <div className='login-modal__signup'>
            <span>{isLoginMode ? "Don't have an account?" : 'Already have an account?'}</span>
            <button onClick={toggleMode} className='login-modal__mode-toggle'>
              {isLoginMode ? 'Sign up for Spotify' : 'Log in to Spotify'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}