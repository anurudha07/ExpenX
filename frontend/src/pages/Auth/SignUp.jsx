import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/uploadImage'
import { UserContext } from '../../context/userContext'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    let profileImageUrl = ''

    if (!fullName) return setError('Please enter your name')
    if (!validateEmail(email)) return setError('Please enter a valid email address.')
    if (!password) return setError('Please enter the password')

    setError('')

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ''
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        { fullName, email, password, profileImageUrl }
      )
      const { token, user } = response.data

      if (token) {
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
      setError(msg)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-4 py-8">
        
        <h3 className="text-xl font-semibold text-center text-black mb-4">
          Create an Account
        </h3>
        <p className="text-xs text-center text-slate-700 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
            className="mx-auto"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
            <div className="sm:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full py-2"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-center text-slate-800 mt-3 ">
            Already have an account?{' '}
            <Link
              className="font-medium text-primary underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
