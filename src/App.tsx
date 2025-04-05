import { useState } from 'react';
import Hero from './components/Hero';
import ProductTabs from './components/ProductTabs';
import PrintBookOptions from './components/PrintBookOptions';
import PlaceholderOptions from './components/PlaceholderOptions';

function App() {
  const [selectedTab, setSelectedTab] = useState('print-book');

  const getProductTitle = (tabId: string): string => {
    switch (tabId) {
      case 'print-book':
        return 'Print Book';
      case 'photo-book':
        return 'Photo Book';
      case 'comic-book':
        return 'Comic Book';
      case 'magazine':
        return 'Magazine';
      case 'yearbook':
        return 'Yearbook';
      case 'calendar':
        return 'Calendar';
      case 'ebook':
        return 'Ebook';
      default:
        return 'Product';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <ProductTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 'print-book' ? (
          <PrintBookOptions />
        ) : (
          <PlaceholderOptions productType={getProductTitle(selectedTab)} />
        )}
      </main>
    </div>
  );
}

export default App;
