import React from 'react';

interface ProductTabProps {
  title: string;
  imageSrc: string;
  isSelected?: boolean;
  onClick: () => void;
}

const ProductTab: React.FC<ProductTabProps> = ({ title, imageSrc, isSelected = false, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center p-3 cursor-pointer transition-colors ${
        isSelected ? 'border-b-2 border-lulu-light-blue' : 'border-b-2 border-transparent'
      }`}
      onClick={onClick}
    >
      <img src={imageSrc} alt={title} className="w-16 h-16 object-cover mb-2" />
      <span className={`text-sm font-medium ${isSelected ? 'text-lulu-light-blue' : 'text-lulu-blue'}`}>
        {title}
      </span>
    </div>
  );
};

const ProductTabs: React.FC<{ selectedTab: string; setSelectedTab: (tab: string) => void }> = ({
  selectedTab,
  setSelectedTab
}) => {
  const productTypes = [
    {
      id: 'print-book',
      title: 'Print Book',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-print-book-1x.jpg'
    },
    {
      id: 'photo-book',
      title: 'Photo Book',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-photo-book-1x.jpg'
    },
    {
      id: 'comic-book',
      title: 'Comic Book',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-comic-book-1x.jpg'
    },
    {
      id: 'magazine',
      title: 'Magazine',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-magazine-1x.jpg'
    },
    {
      id: 'yearbook',
      title: 'Yearbook',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-yearbook-1x.jpg'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-calendar-1x.jpg'
    },
    {
      id: 'ebook',
      title: 'Ebook',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductType/lulu-product-ebook-1x.jpg'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-center overflow-x-auto py-2">
          {productTypes.map((product) => (
            <ProductTab
              key={product.id}
              title={product.title}
              imageSrc={product.imageSrc}
              isSelected={selectedTab === product.id}
              onClick={() => setSelectedTab(product.id)}
            />
          ))}
        </div>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
    </div>
  );
};

export default ProductTabs;
