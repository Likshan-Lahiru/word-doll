import React, { useEffect, useState, useRef } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
type ChangePasswordModalProps = {
  isOpen: boolean
  onClose: () => void
}
export function ChangePasswordModal({
                                      isOpen,
                                      onClose,
                                    }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    // Handle password update logic here
    console.log('Updating password')
    onClose()
  }
  if (!isOpen) return null
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90">
        <div
            ref={modalRef}
            className="bg-[#2A3042] rounded-lg p-6 shadow-xl w-full max-w-md mx-4"
        >
          <h2 className="text-xl font-bold text-center mb-4">Change Password</h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            Enter a new password below to change your password.
          </p>
          {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md mb-4">
                {error}
              </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <div className="relative">
                <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Old Password"
                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-full focus:outline-none"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                  ) : (
                      <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <div className="relative">
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-full focus:outline-none"
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
                      <EyeOffIcon className="w-5 h-5" />
                  ) : (
                      <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="relative mb-6">
              <div className="relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-full focus:outline-none"
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
                      <EyeOffIcon className="w-5 h-5" />
                  ) : (
                      <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
  )
}
