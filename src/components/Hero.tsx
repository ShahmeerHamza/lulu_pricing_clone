import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-lulu-blue mb-4">Pricing Calculator</h1>
            <p className="text-gray-600 mb-6">
              Calculate your book's printing costs, see distribution options, estimate potential
              earnings, and download free templates with our book cost calculator.
            </p>
          </div>
          <div className="bg-lulu-light-gray rounded-lg p-6 flex items-center">
            <div>
              <img
                src="https://ext.same-assets.com/2427696256/175563483.svg"
                alt="Small book illustration"
                className="w-16 h-16 mr-4"
              />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                For product details, check out the{' '}
                <a href="#" className="text-lulu-light-blue font-medium">
                  Products
                </a>{' '}
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
