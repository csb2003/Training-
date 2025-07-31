import React, { useState, useEffect } from 'react'
import { ChevronDown, CheckCircle, X } from 'lucide-react'

const Add_Entities = () => {
  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    gstn: '',
    mobile: '',
    logo: null,
    cgst: '',
    sgst: '',
    igst: '',
    tdsRoi: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    state: '',
    city: '',
    pincode: ''
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
      name: '',
      pan: '',
      gstn: '',
      mobile: '',
      logo: null,
      cgst: '',
      sgst: '',
      igst: '',
      tdsRoi: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      state: '',
      city: '',
      pincode: ''
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

        const res = await fetch('http://localhost:5000/api/add_entities',{
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
            <p className="text-sm font-medium text-gray-900">
              Success!
            </p>
            <p className="text-sm text-gray-500 mt-1">
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
          <h1 className="text-2xl font-semibold text-gray-800">ADD ENTITIES</h1>
          <div className="text-sm text-gray-500">
            <span>Entities</span>
            <span className="mx-2">/</span>
            <span>addEntities</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
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

            {/* PAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pan"
                required
                value={formData.pan}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* GSTN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GSTN
              </label>
              <input
                type="text"
                name="gstn"
                value={formData.gstn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
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

            {/* CGST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CGST (%)
              </label>
              <input
                type="number"
                name="cgst"
                value={formData.cgst}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* SGST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SGST (%)
              </label>
              <input
                type="number"
                name="sgst"
                value={formData.sgst}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* IGST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IGST (%)
              </label>
              <input
                type="number"
                name="igst"
                value={formData.igst}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* TDS_ROI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TDS_ROI (%)
              </label>
              <div className="relative">
                <select
                  name="tdsRoi"
                  value={formData.tdsRoi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  disabled={isSubmitting}
                >
                  <option value="">Choose...</option>
                  <option value="1">1%</option>
                  <option value="2">2%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Address Line 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 3
              </label>
              <input
                type="text"
                name="addressLine3"
                value={formData.addressLine3}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border hover:border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
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

export default Add_Entities