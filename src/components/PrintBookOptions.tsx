import React, { useState, useEffect } from 'react';
import { BookOption, BookSize, OptionCardProps, OptionSectionProps, PriceFactors } from '../types/types';
import OptionCard from './OptionCard';
import OptionSection from './OptionSection';

const BOOK_SIZES: BookSize[] = [
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

const BINDING_OPTIONS: Record<string, BookOption[]> = {
  paperback: [
    {
      id: 'perfect-bound',
      title: 'Perfect Bound',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-PB-1x.jpg',
    },
    {
      id: 'coil-bound',
      title: 'Coil Bound',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-CO-1x.jpg',
    },
    {
      id: 'saddle-stitch',
      title: 'Saddle Stitch',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-SS-1x.jpg',
    },
  ],
  hardcover: [
    {
      id: 'case-wrap',
      title: 'Case Wrap',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-CW-1x.jpg',
    },
    {
      id: 'linen-wrap',
      title: 'Linen Wrap',
      imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-binding-type-LW-1x.jpg',
      subtitle: 'with Dust Jacket',
    },
  ],
};

const INTERIOR_COLOR_OPTIONS: BookOption[] = [
  {
    id: 'standard-bw',
    title: 'Standard Black & White',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-BWSTD-1x.jpg',
  },
  {
    id: 'premium-bw',
    title: 'Premium Black & White',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-BWPRE-1x.jpg',
  },
  {
    id: 'standard-color',
    title: 'Standard Color',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-FCSTD-1x.jpg',
  },
  {
    id: 'premium-color',
    title: 'Premium Color',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-interior-color-FCPRE-1x.jpg',
  },
];

const PAPER_TYPE_OPTIONS: BookOption[] = [
  {
    id: '60-cream-uncoated',
    title: '60# Cream — Uncoated',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-060UC-1x.jpg',
  },
  {
    id: '60-white-uncoated',
    title: '60# White — Uncoated',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-060UW-1x.jpg',
  },
  {
    id: '80-white-coated',
    title: '80# White — Coated',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-paper-type-080CW-1x.jpg',
  },
];

const COVER_FINISH_OPTIONS: BookOption[] = [
  {
    id: 'glossy',
    title: 'Glossy',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-cover-finish-G-1x.jpg',
  },
  {
    id: 'matte',
    title: 'Matte',
    imageSrc: 'https://assets.lulu.com/media/pricing-calculator/ProductOption/Book/lulu-book-cover-finish-M-1x.jpg',
  },
];

// Page count range by binding type
const PAGE_COUNT_RANGES: Record<string, string> = {
  'saddle-stitch': '4-80',
  'coil-bound': '2-470',
  'perfect-bound': '40-800',
  'case-wrap': '24-800',
  'linen-wrap': '24-800',
  'default': '2-800',
};

// Price calculation factors
const PRICING_FACTORS: PriceFactors = {
  basePrice: 5.00,
  sizeFactors: {
    'us-letter': 1.2,
    'us-trade': 1.0,
    'pocket': 0.8,
    'a4': 1.2,
    'a5': 1.0,
    'crown-quarto': 1.1,
    'royal': 1.0,
    'square': 1.1,
    'landscape': 1.2,
    'executive': 1.1
  },
  bindingFactors: {
    'perfect-bound': 1.0,
    'coil-bound': 1.2,
    'saddle-stitch': 0.8,
    'case-wrap': 2.0,
    'linen-wrap': 2.2
  },
  colorFactors: {
    'standard-bw': 0.7,
    'premium-bw': 0.8,
    'standard-color': 1.5,
    'premium-color': 2.0
  },
  paperFactors: {
    '60-cream-uncoated': 0.9,
    '60-white-uncoated': 1.0,
    '80-white-coated': 1.2
  },
  coverFactors: {
    'glossy': 1.0,
    'matte': 1.1
  },
  perPagePrices: {
    'standard-bw': 0.02,
    'premium-bw': 0.025,
    'standard-color': 0.05,
    'premium-color': 0.07
  }
};

const PrintBookOptions: React.FC = () => {
  // Main state for book options
  const [bookSize, setBookSize] = useState<string>('a5');
  const [pageCount, setPageCount] = useState<string>('10');
  const [bindingType, setBindingType] = useState<string>('linen-wrap');
  const [interiorColor, setInteriorColor] = useState<string>('standard-color');
  const [paperType, setPaperType] = useState<string>('60-white-uncoated');
  const [coverFinish, setCoverFinish] = useState<string>('glossy');
  const [price, setPrice] = useState<string>('16.17');

  // UI state
  const [isBookSizeOpen, setIsBookSizeOpen] = useState<boolean>(false);

  // Utility functions
  const getSelectedBookSizeName = (): string => {
    const selected = BOOK_SIZES.find(size => size.id === bookSize);
    return selected ? selected.name : 'Select size';
  };

  const getPageCountRange = (): string => {
    return PAGE_COUNT_RANGES[bindingType] || PAGE_COUNT_RANGES.default;
  };

  const getDisplayValue = (key: string): string => {
    const displayMappings: Record<string, Record<string, string>> = {
      bookSize: {
        'us-letter': 'US-Letter',
        'us-trade': 'US-Trade',
        'a4': 'A4',
        'a5': 'A5',
      },
      bindingType: {
        'perfect-bound': 'Perfect Bound',
        'coil-bound': 'Coil Bound',
        'saddle-stitch': 'Saddle Stitch',
        'case-wrap': 'Case Wrap',
        'linen-wrap': 'Linen Wrap',
      },
      interiorColor: {
        'standard-bw': 'Standard Black & White',
        'premium-bw': 'Premium Black & White',
        'standard-color': 'Standard-color',
        'premium-color': 'Premium Color',
      },
      paperType: {
        '60-cream-uncoated': '60# Cream — Uncoated',
        '60-white-uncoated': '60# White — Uncoated',
        '80-white-coated': '80# White — Coated',
      },
      coverFinish: {
        'glossy': 'Glossy',
        'matte': 'Matte',
      },
    };

    const value = (() => {
      switch (key) {
        case 'bookSize': return bookSize;
        case 'pageCount': return pageCount;
        case 'bindingType': return bindingType;
        case 'interiorColor': return interiorColor;
        case 'paperType': return paperType;
        case 'coverFinish': return coverFinish;
        default: return '';
      }
    })();

    return (displayMappings[key] && displayMappings[key][value]) || value || '—';
  };

  const handlePageCountChange = (value: string) => {
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue) && value !== '') {
      return; // Invalid input, don't update
    }

    if (value === '') {
      setPageCount('');
      return;
    }

    // Clamp between min and max if it's a valid number
    const range = getPageCountRange();
    const [min, max] = range.split('-').map(n => parseInt(n, 10));

    if (numValue < min) {
      setPageCount(min.toString());
    } else if (numValue > max) {
      setPageCount(max.toString());
    } else {
      setPageCount(value);
    }
  };

  const calculatePrice = (): string => {
    // Parse page count
    const pages = parseInt(pageCount, 10);
    if (isNaN(pages) || pages <= 0) {
      return "0.00";
    }

    // Calculate base price with all factors
    const { basePrice, sizeFactors, bindingFactors, colorFactors, paperFactors, coverFactors, perPagePrices } = PRICING_FACTORS;
    
    let totalPrice = basePrice;
    // Apply size factor
    totalPrice *= sizeFactors[bookSize] || 1;
    // Apply binding factor
    totalPrice *= bindingFactors[bindingType] || 1;
    // Apply cover finish factor
    totalPrice *= coverFactors[coverFinish] || 1;
    // Apply paper type factor
    totalPrice *= paperFactors[paperType] || 1;
    
    // Add per-page costs based on interior color and page count
    const perPageCost = perPagePrices[interiorColor] || 0.02;
    totalPrice += perPageCost * pages;
    
    // Apply color factor to the overall price
    totalPrice *= colorFactors[interiorColor] || 1;

    // Round to 2 decimal places and return as string
    return totalPrice.toFixed(2);
  };

  // Update price when options change
  useEffect(() => {
    const newPrice = calculatePrice();
    setPrice(newPrice);
  }, [bookSize, pageCount, bindingType, interiorColor, paperType, coverFinish]);

  // Close book size dropdown when clicking outside
  useEffect(() => {
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
                        {BOOK_SIZES.map((size) => (
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
                {BINDING_OPTIONS.paperback.map(option => (
                  <OptionCard
                    key={option.id}
                    title={option.title}
                    imageSrc={option.imageSrc}
                    isSelected={bindingType === option.id}
                    onClick={() => setBindingType(option.id)}
                    subtitle={option.subtitle}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Hardcover Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {BINDING_OPTIONS.hardcover.map(option => (
                  <OptionCard
                    key={option.id}
                    title={option.title}
                    imageSrc={option.imageSrc}
                    isSelected={bindingType === option.id}
                    onClick={() => setBindingType(option.id)}
                    subtitle={option.subtitle}
                  />
                ))}
              </div>
            </div>
          </OptionSection>

          <OptionSection title="Interior Color">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INTERIOR_COLOR_OPTIONS.map(option => (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  imageSrc={option.imageSrc}
                  isSelected={interiorColor === option.id}
                  onClick={() => setInteriorColor(option.id)}
                  showSelectedIndicator={true}
                />
              ))}
            </div>
          </OptionSection>

          <OptionSection title="Paper Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PAPER_TYPE_OPTIONS.map(option => (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  imageSrc={option.imageSrc}
                  isSelected={paperType === option.id}
                  onClick={() => setPaperType(option.id)}
                  showSelectedIndicator={true}
                />
              ))}
            </div>
          </OptionSection>

          <OptionSection title="Cover Finish">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COVER_FINISH_OPTIONS.map(option => (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  imageSrc={option.imageSrc}
                  isSelected={coverFinish === option.id}
                  onClick={() => setCoverFinish(option.id)}
                  showSelectedIndicator={true}
                />
              ))}
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
                <div className="text-lulu-blue font-medium">{getDisplayValue('bookSize')}</div>

                <div className="text-gray-600">Page Count</div>
                <div className="text-lulu-blue font-medium">{getDisplayValue('pageCount')}</div>

                <div className="text-gray-600">Binding Type</div>
                <div className="text-lulu-blue font-medium">{getDisplayValue('bindingType')}</div>

                <div className="text-gray-600">Interior Color</div>
                <div className="text-lulu-blue font-medium">{getDisplayValue('interiorColor')}</div>

                <div className="text-gray-600">Paper Type</div>
                <div className="text-lulu-blue font-medium">{getDisplayValue('paperType')}</div>

                <div className="text-gray-600">Cover Finish</div>
                <div className="text-lulu-blue font-medium">{getDisplayValue('coverFinish')}</div>
              </div>
            </div>

            <div className="text-center text-xl font-bold text-lulu-blue mb-4">
              {price} USD <span className="text-sm font-normal">per Print Book</span>
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