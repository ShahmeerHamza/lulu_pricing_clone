import React, { useState } from 'react';

const OptionSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-lulu-blue mb-4">{title}</h3>
      {children}
    </div>
  );
};

const OptionCard: React.FC<{
  title: string;
  imageSrc: string;
  isSelected?: boolean;
  onClick: () => void;
  subtitle?: string;
  showSelectedIndicator?: boolean;
}> = ({ title, imageSrc, isSelected = false, onClick, subtitle, showSelectedIndicator = true }) => {
  return (
    <div
      className={`border rounded-md overflow-hidden cursor-pointer transition-colors ${
        isSelected ? 'border-lulu-light-blue ring-1 ring-lulu-light-blue' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-32 object-cover" />
        {isSelected && showSelectedIndicator && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center justify-center w-5 h-5 bg-lulu-light-blue rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center p-3">
        <div className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full">
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-lulu-light-blue rounded-full"></div>
            </div>
          )}
        </div>
        <span className="ml-2 text-sm font-medium text-lulu-blue">{title}</span>
      </div>
      {subtitle && (
        <div className="px-3 pb-2 -mt-2 text-xs text-gray-500">{subtitle}</div>
      )}
    </div>
  );
};

const PrintBookOptions: React.FC = () => {
  // Main state for book options
  const [bookSize, setBookSize] = useState('a5');
  const [pageCount, setPageCount] = useState('10');
  const [bindingType, setBindingType] = useState('linen-wrap');
  const [interiorColor, setInteriorColor] = useState('standard-color');
  const [paperType, setPaperType] = useState('60-white-uncoated');
  const [coverFinish, setCoverFinish] = useState('glossy');

  // State for book size dropdown
  const [isBookSizeOpen, setIsBookSizeOpen] = useState(false);

  // Book size options
  const bookSizes = [
    { id: 'us-letter', name: 'US Letter (8.5 x 11 in)', dimensions: '8.5 x 11 in' },
    { id: 'us-trade', name: 'US Trade (6 x 9 in)', dimensions: '6 x 9 in' },
    { id: 'pocket', name: 'Pocket (4.25 x 6.875 in)', dimensions: '4.25 x 6.875 in' },
    { id: 'a4', name: 'A4 (8.27 x 11.69 in)', dimensions: '8.27 x 11.69 in' },
    { id: 'a5', name: 'A5 (5.83 x 8.27 in)', dimensions: '5.83 x 8.27 in' },
    { id: 'crown-quarto', name: 'Crown Quarto (7.44 x 9.68 in)', dimensions: '7.44 x 9.68 in' },
    { id: 'royal', name: 'Royal (6.14 x 9.21 in)', dimensions: '6.14 x 9.21 in' },
    { id: 'square', name: 'Square (8.5 x 8.5 in)', dimensions: '8.5 x 8.5 in' },
    { id: 'landscape', name: 'Landscape (11 x 8.5 in)', dimensions: '11 x 8.5 in' },
    { id: 'executive', name: 'Executive (7 x 10 in)', dimensions: '7 x 10 in' },
  ];

  // Find selected book size display name
  const getSelectedBookSizeName = (): string => {
    const selected = bookSizes.find(size => size.id === bookSize);
    return selected ? selected.name : 'Select size';
  };

  // Get display values for the summary panel
  const getDisplayValue = (key: string): string => {
    switch (key) {
      case 'bookSize':
        if (bookSize === 'us-letter') return 'US-Letter';
        if (bookSize === 'us-trade') return 'US-Trade';
        if (bookSize === 'a4') return 'A4';
        if (bookSize === 'a5') return 'A5';
        return bookSize || '—';
      case 'pageCount':
        return pageCount || '—';
      case 'bindingType':
        if (bindingType === 'perfect-bound') return 'Perfect Bound';
        if (bindingType === 'coil-bound') return 'Coil Bound';
        if (bindingType === 'saddle-stitch') return 'Saddle Stitch';
        if (bindingType === 'case-wrap') return 'Case Wrap';
        if (bindingType === 'linen-wrap') return 'Linen Wrap';
        return bindingType || '—';
      case 'interiorColor':
        if (interiorColor === 'standard-bw') return 'Standard Black & White';
        if (interiorColor === 'premium-bw') return 'Premium Black & White';
        if (interiorColor === 'standard-color') return 'Standard-color';
        if (interiorColor === 'premium-color') return 'Premium Color';
        return interiorColor || '—';
      case 'paperType':
        if (paperType === '60-cream-uncoated') return '60# Cream — Uncoated';
        if (paperType === '60-white-uncoated') return '60# White — Uncoated';
        if (paperType === '80-white-coated') return '80# White — Coated';
        return paperType || '—';
      case 'coverFinish':
        if (coverFinish === 'glossy') return 'Glossy';
        if (coverFinish === 'matte') return 'Matte';
        return coverFinish || '—';
      default:
        return '—';
    }
  };

  // Calculate price - fixed for this demo
  const calculatePrice = (): string => {
    return "16.17";
  };

  // Calculate valid page range
  const getPageCountRange = (): string => {
    // Different bindings have different page limits
    if (bindingType === 'saddle-stitch') {
      return '4-80';
    } else if (bindingType === 'coil-bound') {
      return '2-470';
    } else if (bindingType === 'perfect-bound') {
      return '40-800';
    } else if (bindingType === 'case-wrap' || bindingType === 'linen-wrap') {
      return '24-800';
    }
    return '2-800';
  };

  // Handle page count change with validation
  const handlePageCountChange = (value: string) => {
    const numValue = parseInt(value, 10);

    // Only update if it's a valid number
    if (!isNaN(numValue) && numValue > 0) {
      const range = getPageCountRange();
      const [min, max] = range.split('-').map(n => parseInt(n, 10));

      // Clamp between min and max
      if (numValue < min) {
        setPageCount(min.toString());
      } else if (numValue > max) {
        setPageCount(max.toString());
      } else {
        setPageCount(value);
      }
    } else if (value === '') {
      setPageCount('');
    }
  };

  // Close book size dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#book-size-dropdown') && !target.closest('#book-size-button')) {
        setIsBookSizeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto pb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-lulu-blue">Print Book</h2>
        <div className="ml-4 flex items-center">
          <img
            src="https://ext.same-assets.com/929328558/3199920818.svg"
            alt="Distribution icon"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm text-gray-600">Indicates the option is available for Global Distribution</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <OptionSection title="Book Size & Page Count">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bookSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Book Size
                </label>
                <div className="relative">
                  <button
                    id="book-size-button"
                    type="button"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-left focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue"
                    onClick={() => setIsBookSizeOpen(!isBookSizeOpen)}
                  >
                    <span>{getSelectedBookSizeName()}</span>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>

                  {isBookSizeOpen && (
                    <div
                      id="book-size-dropdown"
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto"
                    >
                      <ul className="py-1">
                        {bookSizes.map((size) => (
                          <li
                            key={size.id}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                              bookSize === size.id ? 'bg-blue-50 text-lulu-blue' : ''
                            }`}
                            onClick={() => {
                              setBookSize(size.id);
                              setIsBookSizeOpen(false);
                            }}
                          >
                            <div className="flex items-center">
                              {bookSize === size.id && (
                                <svg className="w-4 h-4 mr-2 text-lulu-light-blue" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                              <span className={bookSize === size.id ? 'ml-2 font-medium' : 'ml-6'}>
                                {size.name}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Page Count
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="pageCount"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue"
                    placeholder="Page count"
                    value={pageCount}
                    onChange={(e) => handlePageCountChange(e.target.value)}
                    min={getPageCountRange().split('-')[0]}
                    max={getPageCountRange().split('-')[1]}
                  />
                  <div className="absolute right-0 top-0 text-xs text-gray-500 border-l border-gray-200 px-2 h-full flex items-center">
                    MIN-MAX: {getPageCountRange()}
                  </div>
                </div>
              </div>
            </div>
          </OptionSection>

          <OptionSection title="Binding Type">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Paperback Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <OptionCard
                  title="Perfect Bound"
                  imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-PB-1x.jpg"
                  isSelected={bindingType === 'perfect-bound'}
                  onClick={() => setBindingType('perfect-bound')}
                />
                <OptionCard
                  title="Coil Bound"
                  imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-CO-1x.jpg"
                  isSelected={bindingType === 'coil-bound'}
                  onClick={() => setBindingType('coil-bound')}
                />
                <OptionCard
                  title="Saddle Stitch"
                  imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-SS-1x.jpg"
                  isSelected={bindingType === 'saddle-stitch'}
                  onClick={() => setBindingType('saddle-stitch')}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Hardcover Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <OptionCard
                  title="Case Wrap"
                  imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-CW-1x.jpg"
                  isSelected={bindingType === 'case-wrap'}
                  onClick={() => setBindingType('case-wrap')}
                />
                <OptionCard
                  title="Linen Wrap"
                  imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-LW-1x.jpg"
                  isSelected={bindingType === 'linen-wrap'}
                  onClick={() => setBindingType('linen-wrap')}
                  subtitle="with Dust Jacket"
                />
              </div>
            </div>
          </OptionSection>

          <OptionSection title="Interior Color">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <OptionCard
                title="Standard Black & White"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-BWSTD-1x.jpg"
                isSelected={interiorColor === 'standard-bw'}
                onClick={() => setInteriorColor('standard-bw')}
              />
              <OptionCard
                title="Premium Black & White"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-BWPRE-1x.jpg"
                isSelected={interiorColor === 'premium-bw'}
                onClick={() => setInteriorColor('premium-bw')}
              />
              <OptionCard
                title="Standard Color"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-FCSTD-1x.jpg"
                isSelected={interiorColor === 'standard-color'}
                onClick={() => setInteriorColor('standard-color')}
                showSelectedIndicator={true}
              />
              <OptionCard
                title="Premium Color"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-FCPRE-1x.jpg"
                isSelected={interiorColor === 'premium-color'}
                onClick={() => setInteriorColor('premium-color')}
              />
            </div>
          </OptionSection>

          <OptionSection title="Paper Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <OptionCard
                title="60# Cream — Uncoated"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-060UC-1x.jpg"
                isSelected={paperType === '60-cream-uncoated'}
                onClick={() => setPaperType('60-cream-uncoated')}
              />
              <OptionCard
                title="60# White — Uncoated"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-060UW-1x.jpg"
                isSelected={paperType === '60-white-uncoated'}
                onClick={() => setPaperType('60-white-uncoated')}
                showSelectedIndicator={true}
              />
              <OptionCard
                title="80# White — Coated"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-080CW-1x.jpg"
                isSelected={paperType === '80-white-coated'}
                onClick={() => setPaperType('80-white-coated')}
              />
            </div>
          </OptionSection>

          <OptionSection title="Cover Finish">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <OptionCard
                title="Glossy"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-cover-finish-G-1x.jpg"
                isSelected={coverFinish === 'glossy'}
                onClick={() => setCoverFinish('glossy')}
                showSelectedIndicator={true}
              />
              <OptionCard
                title="Matte"
                imageSrc="https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-cover-finish-M-1x.jpg"
                isSelected={coverFinish === 'matte'}
                onClick={() => setCoverFinish('matte')}
              />
            </div>
          </OptionSection>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <span className="font-medium text-lulu-blue">Quantity & Shipping Estimates</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lulu-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div>
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <span className="font-medium text-lulu-blue">Revenue Estimates</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lulu-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-lulu-light-gray p-6 rounded-lg">
            <img
              src="https://assets.lulu.com/media/pricing-calculator/ProductPreview/Book/lulu-book-0850X1100PB-1x.jpg"
              alt="Book preview"
              className="w-full h-auto mb-4"
            />
            <div className="text-center mb-4">
              <span className="font-medium text-lulu-blue">Select all product options</span>
            </div>

            <div className="bg-white rounded p-4 mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium uppercase text-gray-600">DISTRIBUTION ELIGIBLE</div>
                <img
                  src="https://ext.same-assets.com/929328558/3199920818.svg"
                  alt="Distribution icon"
                  className="w-4 h-4"
                />
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-gray-600">Book Size</div>
                <div className="text-lulu-blue font-medium">A5</div>

                <div className="text-gray-600">Page Count</div>
                <div className="text-lulu-blue font-medium">10</div>

                <div className="text-gray-600">Binding Type</div>
                <div className="text-lulu-blue font-medium">Linen Wrap</div>

                <div className="text-gray-600">Interior Color</div>
                <div className="text-lulu-blue font-medium">Standard-color</div>

                <div className="text-gray-600">Paper Type</div>
                <div className="text-lulu-blue font-medium">60# White — Uncoated</div>

                <div className="text-gray-600">Cover Finish</div>
                <div className="text-lulu-blue font-medium">Glossy</div>
              </div>
            </div>

            <div className="text-center text-xl font-bold text-lulu-blue mb-4">
              16.17 USD <span className="text-sm font-normal">per Print Book</span>
            </div>

            <button
              className="w-full bg-lulu-light-blue text-white font-medium py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Your Print Book
            </button>

            <div className="mt-4">
              <button className="w-full border border-lulu-light-blue text-lulu-light-blue font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Book Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintBookOptions;
