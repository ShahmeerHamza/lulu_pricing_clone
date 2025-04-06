import React from 'react'

const RevenueEstimatesContent = ({price}: {price: string}) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Retail Price (USD)</label>
        <input 
          type="number" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue"
          min={(parseFloat(price) * 1.2).toFixed(2)}
          value={(parseFloat(price) * 2.5).toFixed(2)}
        />
        <p className="text-xs text-gray-500 mt-1">Minimum retail price: ${(parseFloat(price) * 1.2).toFixed(2)}</p>
      </div>
      <div className="bg-lulu-light-gray p-4 rounded-md">
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
          <div className="text-gray-600">Print Cost:</div>
          <div className="text-lulu-blue font-medium">${price}</div>
          
          <div className="text-gray-600">Lulu Fee:</div>
          <div className="text-lulu-blue font-medium">${(parseFloat(price) * 0.2).toFixed(2)}</div>
          
          <div className="text-gray-600">Your Revenue:</div>
          <div className="text-lulu-blue font-bold">${(parseFloat(price) * 1.3).toFixed(2)}</div>
        </div>
        <div className="bg-white p-3 rounded-md">
          <h4 className="font-medium text-lulu-blue mb-2">Global Distribution Revenue</h4>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-600">Distribution Fee:</div>
            <div className="text-lulu-blue font-medium">55%</div>
            
            <div className="text-gray-600">Your Revenue:</div>
            <div className="text-lulu-blue font-bold">${(parseFloat(price) * 0.585).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueEstimatesContent