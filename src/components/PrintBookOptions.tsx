import React, { useState, useEffect } from 'react';
import { BookOption, BookSize, OptionCardProps, OptionSectionProps, PriceFactors } from '../types/types';
import OptionCard from './OptionCard';
import OptionSection from './OptionSection';
import QuantityShippingDropdown from './QuantityShippingDropdown';
import RevenueEstimatesContent from './RevenueEstimatesContent';

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

const COMPATIBILITY_RULES = {
  // Define which binding types are compatible with each book size
  bindingTypeBySize: {
    'us-letter': ['perfect-bound', 'coil-bound', 'saddle-stitch', 'case-wrap'],
    'us-trade': ['perfect-bound', 'coil-bound', 'saddle-stitch', 'case-wrap', 'linen-wrap'],
    'pocket': ['perfect-bound', 'saddle-stitch'],
    'a4': ['perfect-bound', 'coil-bound', 'saddle-stitch', 'case-wrap'],
    'a5': ['perfect-bound', 'saddle-stitch', 'case-wrap', 'linen-wrap'],
    'crown-quarto': ['perfect-bound', 'case-wrap', 'linen-wrap'],
    'royal': ['perfect-bound', 'case-wrap', 'linen-wrap'],
    'square': ['perfect-bound', 'coil-bound', 'case-wrap'],
    'landscape': ['perfect-bound', 'coil-bound'],
    'executive': ['perfect-bound', 'coil-bound', 'case-wrap']
  },
  
  // Define which interior color options are compatible with each binding type
  interiorColorByBinding: {
    'perfect-bound': ['standard-bw', 'premium-bw', 'standard-color', 'premium-color'],
    'coil-bound': ['standard-bw', 'premium-bw', 'standard-color'],
    'saddle-stitch': ['standard-bw', 'standard-color'],
    'case-wrap': ['standard-bw', 'premium-bw', 'standard-color', 'premium-color'],
    'linen-wrap': ['standard-bw', 'premium-bw', 'standard-color', 'premium-color']
  },
  
  // Define which paper types are compatible with each interior color
  paperTypeByInteriorColor: {
    'standard-bw': ['60-cream-uncoated', '60-white-uncoated'],
    'premium-bw': ['60-cream-uncoated', '60-white-uncoated'],
    'standard-color': ['60-white-uncoated', '80-white-coated'],
    'premium-color': ['80-white-coated']
  },
  
  // Define which cover finishes are compatible with each binding type
  coverFinishByBinding: {
    'perfect-bound': ['glossy', 'matte'],
    'coil-bound': ['glossy'],
    'saddle-stitch': ['glossy'],
    'case-wrap': ['glossy', 'matte'],
    'linen-wrap': ['matte']
  }
};

const PrintBookOptions: React.FC = () => {
  // Main state for book options
  const [bookSize, setBookSize] = useState<string>('a5');
  const [pageCount, setPageCount] = useState<string>('10');
  const [bindingType, setBindingType] = useState<string>('perfect-bound');
  const [interiorColor, setInteriorColor] = useState<string>('standard-color');
  const [paperType, setPaperType] = useState<string>('60-white-uncoated');
  const [coverFinish, setCoverFinish] = useState<string>('matte');
  const [price, setPrice] = useState<string>('0.00');

  // UI state
  const [isBookSizeOpen, setIsBookSizeOpen] = useState<boolean>(false);
  const [isQuantityShippingOpen, setIsQuantityShippingOpen] = useState<boolean>(false);
  const [isRevenueEstimatesOpen, setIsRevenueEstimatesOpen] = useState<boolean>(false);
  
  // Page count validation state
  const [pageCountError, setPageCountError] = useState<string>('');

  // Utility functions
  const getSelectedBookSizeName = (): string => {
    const selected = BOOK_SIZES.find(size => size.id === bookSize);
    return selected ? selected.name : 'Select size';
  };

  const getPageCountRange = (): string => {
    return PAGE_COUNT_RANGES[bindingType] || PAGE_COUNT_RANGES.default;
  };

  const getDisplayValue = (optionType: string): string => {
    switch (optionType) {
      case 'bookSize':
        return getSelectedBookSizeName();
      
      case 'pageCount':
        return pageCount;
      
      case 'bindingType':
        const bindingOption = [...BINDING_OPTIONS.paperback, ...BINDING_OPTIONS.hardcover]
          .find(option => option.id === bindingType);
        return bindingOption ? bindingOption.title : '';
      
      case 'interiorColor':
        const colorOption = INTERIOR_COLOR_OPTIONS.find(option => option.id === interiorColor);
        return colorOption ? colorOption.title : '';
      
      case 'paperType':
        const paperOption = PAPER_TYPE_OPTIONS.find(option => option.id === paperType);
        return paperOption ? paperOption.title : '';
      
      case 'coverFinish':
        const finishOption = COVER_FINISH_OPTIONS.find(option => option.id === coverFinish);
        return finishOption ? finishOption.title : '';
      
      default:
        return '';
    }
  };

  // Check if an option is compatible with current selections
  const isOptionCompatible = (
    optionType: 'bindingType' | 'interiorColor' | 'paperType' | 'coverFinish', 
    optionId: string
  ): boolean => {
    switch (optionType) {
      case 'bindingType':
        return COMPATIBILITY_RULES.bindingTypeBySize[bookSize]?.includes(optionId) || false;
      
      case 'interiorColor':
        return COMPATIBILITY_RULES.interiorColorByBinding[bindingType]?.includes(optionId) || false;
      
      case 'paperType':
        return COMPATIBILITY_RULES.paperTypeByInteriorColor[interiorColor]?.includes(optionId) || false;
      
      case 'coverFinish':
        return COMPATIBILITY_RULES.coverFinishByBinding[bindingType]?.includes(optionId) || false;
      
      default:
        return true;
    }
  };

  // Reset to valid options when dependencies change
  useEffect(() => {
    // If current binding type is not compatible with book size, choose first compatible one
    if (!isOptionCompatible('bindingType', bindingType)) {
      const compatibleBindings = COMPATIBILITY_RULES.bindingTypeBySize[bookSize] || [];
      if (compatibleBindings.length > 0) {
        setBindingType(compatibleBindings[0]);
      }
    }
  }, [bookSize]);

  useEffect(() => {
    // If current interior color is not compatible with binding type, choose first compatible one
    if (!isOptionCompatible('interiorColor', interiorColor)) {
      const compatibleColors = COMPATIBILITY_RULES.interiorColorByBinding[bindingType] || [];
      if (compatibleColors.length > 0) {
        setInteriorColor(compatibleColors[0]);
      }
    }
    
    // If current cover finish is not compatible with binding type, choose first compatible one
    if (!isOptionCompatible('coverFinish', coverFinish)) {
      const compatibleFinishes = COMPATIBILITY_RULES.coverFinishByBinding[bindingType] || [];
      if (compatibleFinishes.length > 0) {
        setCoverFinish(compatibleFinishes[0]);
      }
    }
    
    // Validate page count against new binding type
    validatePageCount(pageCount);
  }, [bindingType]);

  useEffect(() => {
    // If current paper type is not compatible with interior color, choose first compatible one
    if (!isOptionCompatible('paperType', paperType)) {
      const compatiblePapers = COMPATIBILITY_RULES.paperTypeByInteriorColor[interiorColor] || [];
      if (compatiblePapers.length > 0) {
        setPaperType(compatiblePapers[0]);
      }
    }
  }, [interiorColor]);

  // Validate page count against binding type constraints
  const validatePageCount = (value: string): boolean => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) && value !== '') {
      setPageCountError('Please enter a valid number');
      return false;
    }

    if (value === '') {
      setPageCountError('Page count is required');
      return false;
    }

    const range = getPageCountRange();
    const [min, max] = range.split('-').map(n => parseInt(n, 10));

    if (numValue < min) {
      setPageCountError(`Minimum page count is ${min}`);
      return false;
    } else if (numValue > max) {
      setPageCountError(`Maximum page count is ${max}`);
      return false;
    } else {
      setPageCountError('');
      return true;
    }
  };

  const handlePageCountChange = (value: string) => {
    // Always update the input value
    setPageCount(value);
    
    // Validate the new value
    validatePageCount(value);
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

  // Render option cards with disabled state
  const renderOptionCards = (
    options: BookOption[], 
    selectedValue: string, 
    setSelectedValue: (value: string) => void,
    optionType: 'bindingType' | 'interiorColor' | 'paperType' | 'coverFinish'
  ) => {
    return options.map(option => {
      const isCompatible = isOptionCompatible(optionType, option.id);
      
      return (
        <div key={option.id} className={`${!isCompatible ? 'opacity-50' : ''}`}>
          <OptionCard
            title={option.title}
            imageSrc={option.imageSrc}
            isSelected={selectedValue === option.id}
            onClick={() => isCompatible && setSelectedValue(option.id)}
            subtitle={option.subtitle}
            showSelectedIndicator={true}
          />
          {!isCompatible && (
            <div className="text-xs text-red-500 mt-1">Not compatible with current selections</div>
          )}
        </div>
      );
    });
  };

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
                    className={`w-full border ${pageCountError ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lulu-light-blue focus:border-lulu-light-blue`}
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
                {pageCountError && (
                  <p className="text-red-500 text-xs mt-1">{pageCountError}</p>
                )}
              </div>
            </div>
          </OptionSection>

          <OptionSection title="Binding Type">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Paperback Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {renderOptionCards(
                  BINDING_OPTIONS.paperback, 
                  bindingType, 
                  setBindingType,
                  'bindingType'
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Hardcover Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderOptionCards(
                  BINDING_OPTIONS.hardcover, 
                  bindingType, 
                  setBindingType,
                  'bindingType'
                )}
              </div>
            </div>
          </OptionSection>

          <OptionSection title="Interior Color">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderOptionCards(
                INTERIOR_COLOR_OPTIONS, 
                interiorColor, 
                setInteriorColor,
                'interiorColor'
              )}
            </div>
          </OptionSection>

          <OptionSection title="Paper Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {renderOptionCards(
                PAPER_TYPE_OPTIONS, 
                paperType, 
                setPaperType,
                'paperType'
              )}
            </div>
          </OptionSection>

          <OptionSection title="Cover Finish">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderOptionCards(
                COVER_FINISH_OPTIONS, 
                coverFinish, 
                setCoverFinish,
                'coverFinish'
              )}
            </div>
          </OptionSection>

          {/* Updated dropdown sections with toggle functionality */}
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <button 
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md"
                onClick={() => setIsQuantityShippingOpen(!isQuantityShippingOpen)}
              >
                <span className="font-medium text-lulu-blue">Quantity & Shipping Estimates</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-lulu-blue transform transition-transform ${isQuantityShippingOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isQuantityShippingOpen && (
                <QuantityShippingDropdown price={price} />
              )}
            </div>
            <div>
              <button 
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-md"
                onClick={() => setIsRevenueEstimatesOpen(!isRevenueEstimatesOpen)}
              >
                <span className="font-medium text-lulu-blue">Revenue Estimates</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-lulu-blue transform transition-transform ${isRevenueEstimatesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isRevenueEstimatesOpen && (
                <RevenueEstimatesContent price={price} />
              )}
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
              className={`w-full bg-lulu-light-blue text-white font-medium py-3 px-4 rounded-md hover:bg-blue-600 transition-colors ${pageCountError ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!!pageCountError}
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