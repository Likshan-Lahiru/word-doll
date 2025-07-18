import  { useState } from 'react'
type ForgotPasswordModalProps = {
  isOpen: boolean
  onClose: () => void
  onVerificationSuccess: (email: string) => void
  email?: string
}
export function ForgotPasswordModal({
                                      isOpen,
                                      onVerificationSuccess,
                                      email = 'acd@gmail.com',
                                    }: ForgotPasswordModalProps) {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)
      // Auto-focus next input
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }
  const handleVerifyCode = () => {
    // In a real app, you would verify the code with your backend
    console.log('Verifying code:', verificationCode.join(''))
    onVerificationSuccess(email)
  }
  const handleResendCode = () => {
    console.log('Resending verification code to:', email)
    // In a real app, you would resend the code
  }
  if (!isOpen) return null
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2432]/90">
        <div className="bg-[#353A47] rounded-lg p-5 sm:p-8 shadow-xl w-full max-w-md mx-4">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">
            Password Reset
          </h2>
          <p className="text-gray-400 text-center text-xs sm:text-sm mb-4 sm:mb-6">
            Please enter the 6 digits code that was sent to
            <br />
            <span className="text-white">{email}</span>
          </p>
          <div className="flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-6">
            {verificationCode.map((digit, index) => (
                <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold bg-white rounded-md focus:outline-none text-gray-800"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                />
            ))}
          </div>
          <button
              className="w-full bg-[#4299e1] hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-full transition-colors mb-2 sm:mb-3 text-sm sm:text-base"
              onClick={handleVerifyCode}
          >
            Verify
          </button>
          <button
              type="button"
              className="w-full text-center text-[#4299e1] hover:underline py-2 text-xs sm:text-sm"
              onClick={handleResendCode}
          >
            Resend code
          </button>
        </div>
      </div>
  )
}
