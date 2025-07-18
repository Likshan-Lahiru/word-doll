import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { ForgotPasswordModal } from '../components/ForgotPasswordModal'
import { ResetPasswordModal } from '../components/ResetPasswordModal'
export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login with:', email, password)
  }
  const handleForgotPassword = () => {
    setVerificationEmail(email || 'acd@gmail.com') // Use entered email or default
    setShowForgotPasswordModal(true)
  }
  const handleVerificationSuccess = (email: string) => {
    setVerificationEmail(email)
    setShowForgotPasswordModal(false)
    setShowResetPasswordModal(true)
  }
  const handlePasswordReset = () => {
    setShowResetPasswordModal(false)
    // Show success message or redirect
  }
  return (
      <div className="flex flex-col w-full min-h-screen bg-[#1E2432] text-white">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md px-4 sm:px-0">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              Log In
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-[#353A47] rounded-md focus:outline-none text-sm sm:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </div>
              <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-[#353A47] rounded-md focus:outline-none text-sm sm:text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                  ) : (
                      <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <button
                    type="button"
                    className="text-[#4299e1] text-xs sm:text-sm hover:underline"
                    onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <button
                  type="submit"
                  className="w-full bg-[#4299e1] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition-colors text-sm sm:text-base"
              >
                Log in
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                Don't have an account?{' '}
                <button
                    className="text-[#4299e1] hover:underline"
                    onClick={() => navigate('/signup')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
        {/* Forgot Password Modal - now skips email input */}
        <ForgotPasswordModal
            isOpen={showForgotPasswordModal}
            onClose={() => setShowForgotPasswordModal(false)}
            onVerificationSuccess={handleVerificationSuccess}
            email={verificationEmail}
        />
        {/* Reset Password Modal */}
        <ResetPasswordModal
            isOpen={showResetPasswordModal}
            onClose={() => setShowResetPasswordModal(false)}
            email={verificationEmail}
            onPasswordReset={handlePasswordReset}
        />
      </div>
  )
}
