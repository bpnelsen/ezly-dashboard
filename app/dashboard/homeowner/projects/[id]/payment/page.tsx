'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Building2, Lock, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'paypal'
  name: string
  details: string
  icon: React.ReactNode
}

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [selectedMethod, setSelectedMethod] = useState<string>('card')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const project = {
    id: params.id,
    title: 'Kitchen Remodel with Island',
    contractor: 'Elite Kitchen Renovations',
    amount: 12500,
    description: 'Work completed on April 14, 2026'
  }

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      details: 'Visa, Mastercard, American Express',
      icon: <CreditCard size={24} />
    },
    {
      id: 'bank',
      type: 'bank',
      name: 'Bank Transfer',
      details: 'Direct transfer from your bank account',
      icon: <Building2 size={24} />
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      details: 'Pay securely with your PayPal account',
      icon: <CreditCard size={24} />
    }
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPaymentComplete(true)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Complete!</h1>
            <p className="text-gray-600 mb-8">Your payment has been successfully processed.</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium">PROJECT</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{project.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">CONTRACTOR</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{project.contractor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">AMOUNT PAID</p>
                  <p className="text-lg font-bold text-green-600 mt-1">${project.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">DATE</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-900">
                  Contractor has been notified and paid
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  Invoice #EZ-{project.id}-{new Date().getFullYear()} has been saved
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard/homeowner/projects"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Back to Projects
              </Link>
              <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                Download Receipt
              </button>
            </div>

            <p className="text-xs text-gray-600 mt-6">
              You'll receive a detailed invoice and payment receipt via email
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <Link href={`/dashboard/homeowner/projects/${params.id}/review`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Review
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
          <p className="text-gray-600 mt-1">Secure payment for {project.title}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project</span>
                  <span className="font-semibold text-gray-900">{project.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contractor</span>
                  <span className="font-semibold text-gray-900">{project.contractor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Date</span>
                  <span className="font-semibold text-gray-900">April 14, 2026</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">${project.amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h2>

              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{method.details}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Details (Card) */}
            {selectedMethod === 'card' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Card Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Expiration
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Info */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex gap-3">
                <Lock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Your payment is secure</p>
                  <p className="text-sm text-blue-800 mt-1">
                    All transactions are encrypted with SSL security. Your card information is never stored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            {/* Payment Summary Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${project.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total Due</span>
                  <span className="font-bold text-gray-900">${project.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded mt-0.5 cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I confirm that the work is complete and satisfactory, and authorize payment to {project.contractor}
                </span>
              </label>

              {/* Pay Button */}
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition mb-3"
              >
                Pay ${project.amount.toLocaleString()}
              </button>

              {/* Confirmation Modal */}
              {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl max-w-md w-full p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Payment</h3>

                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-2xl font-bold text-gray-900">${project.amount.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-bold text-gray-900">{project.contractor}</p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-900">
                          ✓ Payment is secure and encrypted
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold transition text-white ${
                          isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : 'Confirm Payment'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex gap-2">
                  <span>✓</span>
                  <span>Instant payment confirmation</span>
                </p>
                <p className="flex gap-2">
                  <span>✓</span>
                  <span>Contractor paid immediately</span>
                </p>
                <p className="flex gap-2">
                  <span>✓</span>
                  <span>30-day dispute window</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
