import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function BottomFooter() {
    return (
        <footer className="bg-gray-700 text-white">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    
                    <div className="flex items-center space-x-4">
                        <Link to="/emotion" className="px-3 py-2 rounded-md text-xs font-medium flex items-center hover:bg-gray-800">
                            Voice
                        </Link>
                        
                        <Link to="/login" className="px-3 py-2 rounded-md text-xs font-medium flex items-center hover:bg-gray-800">Login</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </div>
                </div>
                <div className="text-center text-xs font-medium py-4">
                    © {new Date().getFullYear()} The voice system. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default BottomFooter;