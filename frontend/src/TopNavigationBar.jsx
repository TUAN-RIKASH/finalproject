import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faSignInAlt, faMicrophone, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TopNavigationBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                   
                    <div>
                        <Link to="/" className="text-xl font-bold">The Voice Detector</Link>
                    </div>

                    {/* Desktop Menu - Updated with new items */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        <Link to="/voice" className="px-3 py-2 rounded-md text-xs font-medium flex items-center hover:bg-gray-700">
                            <FontAwesomeIcon icon={faMicrophone} className="mr-2" /> Voice
                        </Link>
                        <Link to="/login" className="px-3 py-2 rounded-md text-xs font-medium flex items-center hover:bg-gray-700">
                            <FontAwesomeIcon icon={faLock} className="mr-2" /> Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Updated with new items */}
            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <Link to="/voice" className="block px-3 py-2 text-xs font-medium hover:bg-gray-700">
                    <FontAwesomeIcon icon={faMicrophone} className="mr-2" /> Voice
                </Link>
                <Link to="/login" className="block px-3 py-2 text-xs font-medium hover:bg-gray-700">
                    <FontAwesomeIcon icon={faLock} className="mr-2" /> Login
                </Link>
            </div>
        </nav>
    );
}

export default TopNavigationBar;