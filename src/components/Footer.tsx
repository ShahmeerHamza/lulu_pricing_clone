import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lulu-blue text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-medium mb-4">Our Team</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Newsroom</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Videos</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Podcast</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Order Lookup</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-lulu-light-blue transition-colors">Developers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Get exclusive Publishing & Marketing tips</h3>
            <p className="text-sm mb-4">
              Get exclusive Publishing & Marketing tips to help you create and sell your books more effectively!
              You can unsubscribe at any time.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full bg-white text-gray-800 rounded-l-md focus:outline-none"
              />
              <button className="bg-lulu-light-blue text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-4 mb-6 md:mb-0">
              <a href="#" className="text-white hover:text-lulu-light-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-lulu-light-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-lulu-light-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-lulu-light-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-lulu-light-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-0">
              <a href="#" className="hover:text-lulu-light-blue transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-lulu-light-blue transition-colors">Terms & Conditions</a>
              <span>Copyright © 2025 Lulu Press, Inc. All rights reserved.</span>
            </div>

            <div>
              <a href="#" className="block">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-.5 4C9.46 6 8 7.46 8 9.5v5c0 2.04 1.46 3.5 3.5 3.5h3c2.04 0 3.5-1.46 3.5-3.5v-5C18 7.46 16.54 6 14.5 6h-3zm3 2c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5v-5C10 8.67 10.67 8 11.5 8h3zm0 1h-3c-.28 0-.5.22-.5.5v5c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5v-5c0-.28-.22-.5-.5-.5zm-1.5 1.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
