import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Social Icons */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/img/logo.jpg" alt="Hostel" className="w-44 h-44 mr-2" />
              <span className="font-bold text-xl">The Bodima</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-dribbble"></i>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Product</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Overview</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Solutions <span className="ml-1 px-2 py-1 bg-gray-200 text-sm font-medium rounded-md">New</span></a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Company</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">About us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">News</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Media kit</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Newsletter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Help centre</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6 text-center md:text-left">
          <p className="text-gray-600">Move faster with Untitled UI</p>
          <p className="text-gray-500 text-sm mt-1">
            Save countless hours of design and ship great looking designs faster.
          </p>
          <p className="text-gray-400 text-sm mt-6">&copy; 2077 Untitled UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
