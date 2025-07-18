import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from 'lucide-react'
import { BottomNavigation } from '../components/BottomNavigation'
import { BalanceSelector } from '../components/BalanceSelector'
export function RedeemPage() {
  const navigate = useNavigate()
  const [redeemAmount, setRedeemAmount] = useState(75)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showCompletedModal, setShowCompletedModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('redeem')
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  // Mock data
  const availableGems = 77.4
  const totalGems = 107.25
  const handleRedeemNow = () => {
    setShowTransferModal(true)
  }
  const handleConfirmTransaction = () => {
    setShowTransferModal(false)
    setShowCompletedModal(true)
  }
  const handleDone = () => {
    setShowCompletedModal(false)
  }
  const handleAddBankAccount = () => {
    alert('Bank account setup would open here')
  }
  // Mobile view
  if (isMobile) {
    return (
        <div className="flex flex-col w-full min-h-screen bg-[#1F2937] text-white">
          {/* Store title */}
          <h1 className="text-2xl font-bold text-center my-4">Store</h1>
          {/* Tabs */}
          <div className="flex px-6 mb-8">
            <button
                className={`flex-1 py-4 px-4 rounded-2xl flex items-center justify-center space-x-2 ${activeTab === 'coins' ? 'bg-blue-500' : 'bg-[#131520]'}`}
                onClick={() => {
                  setActiveTab('coins')
                  navigate('/store')
                }}
            >
              <span className="font-bold text-sm">Get Gold Coins</span>
              <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/tseH8zwDf6PgMMJLoCm3uz/gold-store.png"
                  alt="Coins"
                  className="w-7 h-7"
              />
            </button>
            <div className="w-4"></div>
            <button
                className={`flex-1 py-4 px-4 rounded-2xl flex items-center justify-center space-x-2 ${activeTab === 'redeem' ? 'bg-blue-500' : 'bg-[#131520]'}`}
                onClick={() => setActiveTab('redeem')}
            >
              <span className="font-bold text-sm">Redeem</span>
              <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/5ARgETPVNopfYddtEfN6Yn/redeem.png"
                  alt="Redeem"
                  className="w-7 h-7"
              />
            </button>
          </div>
          {/* Withdraw section */}
          <div className="px-6 mb-8">
            <h2 className="text-xl font-bold mb-5">Withdraw</h2>
            <div className="mb-4">
              {/* Updated to match the image more closely - colon closer to the number */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Available Gems</span>
                <span className="text-gray-300">
                :{' '}
                  <span className="font-medium">{availableGems.toFixed(2)}</span>
              </span>
              </div>
              <div className="flex justify-between mb-5">
                <span className="text-gray-300">Total Gems</span>
                <span className="text-gray-300">
                : <span className="font-medium">{totalGems.toFixed(2)}</span>
              </span>
              </div>
            </div>
            {/* Bullet points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-400 text-xs">
                Total gems show your earnings to date, while available gems is
                the amount you can withdraw now. Gems earned today will be added
                to your available gems after 7 days.
              </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-400 text-xs">
                A minimum 100 Gems required to process a redeem.
              </span>
              </li>
            </ul>
            {/* Redeem input */}
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <p className="mr-2 text-sm">Redeem</p>
                <div className="w-24 bg-white rounded-md px-4 py-2 flex justify-between mx-2">
                  <input
                      type="number"
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(Number(e.target.value))}
                      className="bg-transparent w-16 outline-none text-black text-sm"
                  />
                </div>
                <p className="text-gray-600 text-sm">({`$${redeemAmount}`})</p>
                <p className="text-gray-400 text-xs ml-2">
                  gems to cash
                  <br />
                  ($1 per gem)
                </p>
              </div>
              <div className="flex justify-center mt-5">
                <button
                    onClick={handleRedeemNow}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded-full font-medium text-sm w-auto"
                >
                  Transfer Now
                </button>
              </div>
            </div>
          </div>
          {/* Setup Payment Method */}
          <div className="px-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Setup Payment Method</h2>
            <p className="text-gray-400 mb-6 text-center text-xs font-bold">
              Setup your payment method by entering your bank account details to
              receive funds.
            </p>
            <div className="flex justify-center">
              <button
                  onClick={handleAddBankAccount}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full font-medium text-sm"
              >
                Add Bank Account
              </button>
            </div>
          </div>
          {/* Note */}
          <div className="px-6 mb-20">
            <p className="text-gray-400 text-xs text-center">
              Note : 0.25% + $0.25 per payout
            </p>
          </div>
          {/* Transfer Funds Modal */}
          {showTransferModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">Transfer funds?</h2>
                  <p className="mb-6">
                    Do you want to transfer ${redeemAmount} to your bank account?
                  </p>
                  <div className="flex space-x-4">
                    <button
                        onClick={() => setShowTransferModal(false)}
                        className="flex-1 bg-white text-gray-800 py-2 px-4 rounded-full font-medium"
                    >
                      Cancel
                    </button>
                    <button
                        onClick={handleConfirmTransaction}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-medium"
                    >
                      Confirm Transaction
                    </button>
                  </div>
                </div>
              </div>
          )}
          {/* Transaction Completed Modal */}
          {showCompletedModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                  <div className="flex justify-center mb-2">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-center mb-4">
                    Transaction Completed
                  </h2>
                  <p className="text-center mb-6">
                    You transferred ${redeemAmount} to your bank account. You will
                    receive it in 3-5 business days.
                  </p>
                  <div className="flex justify-center">
                    <button
                        onClick={handleDone}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full font-medium"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
          )}
          {/* Bottom navigation */}
          <BottomNavigation />
        </div>
    )
  }
  // Desktop view
  return (
      <div className="flex flex-col w-full min-h-screen bg-[#1F2937] text-white">
        {/* Top balance bar */}
        <div className="p-4">
          <BalanceSelector
              onSelect={(type) => console.log(`Selected: ${type}`)}
          />
        </div>
        {/* Main content */}
        <div className="flex flex-1 px-20 pb-8">
          {/* Left sidebar */}
          <div className="w-72 bg-[#374151] rounded-xl p-6 mr-8">
            <h1 className="text-2xl font-bold mb-8">Store</h1>
            <button
                className="w-full bg-[#1F2937] hover:bg-gray-700 text-white py-4 px-5 rounded-xl mb-4 flex items-center"
                onClick={() => navigate('/store')}
            >
            <span className="flex-1 text-left ml-2 font-medium">
              Get Gold Coins
            </span>
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/tseH8zwDf6PgMMJLoCm3uz/gold-store.png"
                    alt="Coins"
                    className="w-10 h-10"
                />
              </div>
            </button>
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-5 rounded-xl flex items-center"
                onClick={() => {}}
            >
              <span className="flex-1 text-left ml-2 font-medium">Redeem</span>
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/5ARgETPVNopfYddtEfN6Yn/redeem.png"
                    alt="Redeem"
                    className="w-10 h-10"
                />
              </div>
            </button>
          </div>
          {/* Right content area - Updated to match the image exactly */}
          <div className="flex-1 bg-[#374151] rounded-xl p-10">
            <h2 className="text-2xl font-medium mb-6">Withdraw</h2>
            <div className="space-y-4 mb-10">
              <div className="flex">
                <p className="text-white">Available Gems</p>
                <p className="flex-1 mx-1">:</p>
                <p className="font-medium">{availableGems.toFixed(2)}</p>
              </div>
              <div className="flex">
                <p className="text-white">Total Gems</p>
                <p className="flex-1 mx-1">:</p>
                <p className="font-medium">{totalGems.toFixed(2)}</p>
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-4 mb-10">
              <li className="text-white">
                Total gems show your earnings to date, while available gems is the
                amount you can withdraw now. Gems earned today will be added to
                your available gems after 7 days.
              </li>
              <li className="text-white">
                A minimum 100 Gems required to process a redeem.
              </li>
            </ul>
            <div className="flex items-center mb-8">
              <p className="text-white text-lg mr-4">Redeem</p>
              <div className="bg-white rounded-md px-4 py-2 flex items-center">
                <input
                    type="number"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(Number(e.target.value))}
                    className="bg-transparent w-16 outline-none text-black text-lg"
                />
                <span className="text-gray-500 ml-1">({`$${redeemAmount}`})</span>
              </div>
              <p className="text-white ml-4">gems to cash ($1 per gem)</p>
              <div className="flex-1 flex justify-end">
                <button
                    onClick={handleRedeemNow}
                    className="bg-[#4299e1] hover:bg-blue-600 text-white py-2 px-10 rounded-full font-medium"
                >
                  Redeem Now
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-medium mt-12 mb-6">
              Setup Payment Method
            </h2>
            <div className="flex items-center mb-12">
              <p className="text-gray-300">
                Setup your payment method by entering your bank account details to
                receive funds.
              </p>
              <div className="flex-1 flex justify-end">
                <button
                    onClick={handleAddBankAccount}
                    className="bg-[#4299e1] hover:bg-blue-600 text-white py-2 px-8 rounded-full font-medium"
                >
                  Add Bank Account
                </button>
              </div>
            </div>
            <ul className="list-disc pl-5 mt-16">
              <li className="text-gray-400">Note : 0.25% + $0.25 per payout</li>
            </ul>
          </div>
        </div>
        {/* Transfer Funds Modal */}
        {showTransferModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Transfer funds?</h2>
                <p className="mb-6">
                  Do you want to transfer ${redeemAmount} to your bank account?
                </p>
                <div className="flex space-x-4">
                  <button
                      onClick={() => setShowTransferModal(false)}
                      className="flex-1 bg-white text-gray-800 py-2 px-4 rounded-full font-medium"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleConfirmTransaction}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-medium"
                  >
                    Confirm Transaction
                  </button>
                </div>
              </div>
            </div>
        )}
        {/* Transaction Completed Modal */}
        {showCompletedModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-center mb-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-center mb-4">
                  Transaction Completed
                </h2>
                <p className="text-center mb-6">
                  You transferred ${redeemAmount} to your bank account. You will
                  receive it in 3-5 business days.
                </p>
                <div className="flex justify-center">
                  <button
                      onClick={handleDone}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
        )}
        <BottomNavigation />
      </div>
  )
}
