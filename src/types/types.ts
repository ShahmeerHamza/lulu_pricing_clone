export interface BookSize {
  id: string;
  name: string;
  dimensions: string;
}

export interface BookOption {
  id: string;
  title: string;
  imageSrc: string;
  subtitle?: string;
}

export interface PriceFactors {
  sizeFactors: Record<string, number>;
  bindingFactors: Record<string, number>;
  colorFactors: Record<string, number>;
  paperFactors: Record<string, number>;
  coverFactors: Record<string, number>;
  basePrice: number;
  perPagePrices: Record<string, number>;
}

export interface OptionSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface OptionCardProps {
  title: string;
  imageSrc: string;
  isSelected?: boolean;
  onClick: () => void;
  subtitle?: string;
  showSelectedIndicator?: boolean;
}