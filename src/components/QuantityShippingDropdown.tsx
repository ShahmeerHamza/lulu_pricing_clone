import React from 'react'

const QuantityShippingDropdown = ({price}: {price: string}) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input 
            type="number" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue"
            min="1"
            value="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue">
            <option>Standard Shipping</option>
            <option>Express Shipping</option>
          </select>
        </div>
      </div>
      <div className="bg-lulu-light-gray p-4 rounded-md">
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-600">Estimated Production Time:</div>
          <div className="text-lulu-blue font-medium">3-5 business days</div>
          
          <div className="text-gray-600">Estimated Shipping Time:</div>
          <div className="text-lulu-blue font-medium">5-7 business days</div>
          
          <div className="text-gray-600">Shipping Cost:</div>
          <div className="text-lulu-blue font-medium">$8.99</div>
          
          <div className="text-gray-600 font-medium">Total Cost:</div>
          <div className="text-lulu-blue font-bold">${(parseFloat(price) * 10 + 8.99).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default QuantityShippingDropdown