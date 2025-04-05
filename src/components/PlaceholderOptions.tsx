import React from 'react';

interface PlaceholderOptionsProps {
  productType: string;
}

const PlaceholderOptions: React.FC<PlaceholderOptionsProps> = ({ productType }) => {
  const getImagePath = (type: string): string => {
    const formattedType = type.toLowerCase().replace(' ', '-');
    return `https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-${formattedType}-1x.jpg`;
  };

  return (
    <div className="container mx-auto py-12">
      <div className="bg-lulu-light-gray p-10 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-lulu-blue mb-4">{productType}</h2>
        <p className="text-gray-600 mb-6">
          This calculator feature is coming soon. Please check back later or explore our Print Book options.
        </p>
        <img
          src={getImagePath(productType)}
          alt={productType}
          className="w-32 h-32 object-cover mx-auto mb-6"
          onError={(e) => {
            // Fallback to print book image if the specific product image fails to load
            (e.target as HTMLImageElement).src = 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-print-book-1x.jpg';
          }}
        />
        <button className="bg-lulu-light-blue text-white font-medium py-3 px-6 rounded-md hover:bg-blue-600 transition-colors">
          Learn More About {productType}s
        </button>
      </div>
    </div>
  );
};

export default PlaceholderOptions;
