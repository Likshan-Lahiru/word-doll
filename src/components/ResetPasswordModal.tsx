import  { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
type ResetPasswordModalProps = {
  isOpen: boolean
  onClose: () => void
  email: string
  onPasswordReset: () => void
}
export function ResetPasswordModal({
                                     isOpen,
                                     onClose,
                                     email,
                                     onPasswordReset,
                                   }: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    // In a real app, you would send the new password to your backend
    console.log('Resetting password for:', email, 'New password:', newPassword)
    onPasswordReset()
  }
  if (!isOpen) return null
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2432]/90">
        <div className="bg-[#353A47] rounded-lg p-5 sm:p-8 shadow-xl w-full max-w-md mx-4">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">
            Password Reset
          </h2>
          <p className="text-gray-400 text-center text-xs sm:text-sm mb-4 sm:mb-6">
            Enter a new password below to reset your password.
          </p>
          {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md mb-4 text-xs sm:text-sm">
                {error}
              </div>
          )}
          <form onSubmit={handleResetPassword}>
            <div className="relative mb-3 sm:mb-4">
              <div className="relative">
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    className="w-full px-4 py-2 sm:py-3 bg-white rounded-full focus:outline-none text-gray-800 text-sm sm:text-base"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                      <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="relative mb-4 sm:mb-6">
              <div className="relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 sm:py-3 bg-white rounded-full focus:outline-none text-gray-800 text-sm sm:text-base"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                      <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
            <button
                type="submit"
                className="w-full bg-[#4299e1] hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-full transition-colors mb-2 sm:mb-3 text-sm sm:text-base"
            >
              Reset
            </button>
            <button
                type="button"
                className="w-full bg-white text-gray-800 font-bold py-2 sm:py-3 px-4 rounded-full transition-colors text-sm sm:text-base"
                onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
  )
}
