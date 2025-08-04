import React, { useState, useEffect } from 'react'
import { ChevronDown, CheckCircle, X } from 'lucide-react'

const Add_Invoice = () => {
  const [formData, setFormData] = useState({
    name: '',
    invoice_no: '',
    invoice_date: '',
    due_date: '',
    logo: null,
    invoice_amount: '',
    gst_amount: '',
    net_amount: ''
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      logo: e.target.files[0]
    }))
  }

  const resetForm = () => {
    setFormData({
      entity_name: '',
      invoice_no: '',
      invoice_date: '',
      due_date: '',
      invoice_amount: null,
      gst_amount: '',
      net_amount: '',
      invoice: '',
    })
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async() => {
    setIsSubmitting(true)
    
    try {
        const form = new FormData();

        for (const key in formData){
            form.append(key,formData[key])
        }

        const res = await fetch('http://localhost:5000/api/add_invoice',{
            method: 'POST',
            body: form
        })
        
        const results = await res.json()
        
        if (res.ok) {
          // Show success popup
          setShowSuccessPopup(true)
          // Reset form
          resetForm()
          // Auto hide popup after 5 seconds
          setTimeout(() => {
            setShowSuccessPopup(false)
          }, 5000)
        } else {
          throw new Error(results.message || 'Submission failed')
        }
        
    } catch (error) {
        console.log('Submission Failed:- ', error)
        // You can add error popup here if needed
    } finally {
      setIsSubmitting(false)
    }
  }

  const closePopup = () => {
    setShowSuccessPopup(false)
  }

  // Success Popup Component
  const SuccessPopup = () => (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ease-in-out ${
      showSuccessPopup 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 min-w-80 max-w-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-m font-medium text-gray-900">
              Success!
            </p>
            <p className="text-m text-gray-500 mt-1">
              Entity has been added successfully.
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={closePopup}
              className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 bg-gray-200 rounded-full h-1">
          <div 
            className="bg-green-500 h-1 rounded-full animate-pulse"
            style={{
              width: '100%',
              animation: 'shrink 5s linear forwards'
            }}
          ></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      {/* Success Popup */}
      <SuccessPopup />
      
      {/* Custom CSS for progress bar animation */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">ADD INVOICE</h1>
          <div className="text-m text-gray-500">
            <span>Entities</span>
            <span className="mx-2">/</span>
            <span>addEntities</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Entity Name */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Entity Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none hover:border-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Invoice No. */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Invoice No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invoice_no"
                required
                value={formData.invoice_no}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Invoice Date */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Invoice Date 
              </label>
              <input
                type="date"
                name="invoice_date"
                value={formData.invoice_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Invoice amount */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Invoice Amount
              </label>
              <div className="relative">
                <input
                type="number"
                name="invoice_amount"
                value={formData.invoice_amount}
                onChange={handleInputChange}
                step="1"
                min="0"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              
              </div>
            </div>

            {/* GST Amount */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                GST Amount (%)
              </label>
              <input
                type="number"
                name="gst_amount"
                value={formData.gst_amount}
                onChange={handleInputChange}
                step="1"
                min="0"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Net Amount */}
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Net Amount
              </label>
              <input
                type="number"
                name="net_amount"
                value={formData.net_amount}
                onChange={handleInputChange}
                step="1"
                min="0"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Upload Invoice
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full hover:border-black h-full opacity-0 cursor-pointer"
                  disabled={isSubmitting}
                />
                <div className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg bg-white-20 text-gray-500 cursor-pointer">
                  {formData.logo ? formData.logo.name : 'Choose file | No file chosen'}
                </div>
              </div>
            </div>


            

            
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Invoice