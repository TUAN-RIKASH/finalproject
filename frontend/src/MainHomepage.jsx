import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function MainHomepage() {
    const topic = {
        "src": "https://watermark.lovepik.com/photo/50076/9023.jpg_wh1200.jpg",
        "title": "Voice Emotion Recognition",
        "description": "Explore voice emotion recognition technology designed to analyze employees' voice tones, providing insights into their emotional states and enhancing emotional intelligence development."
    };

    return (
        <div className="relative ">
            <div className="max-w-screen-xl mx-auto">
                <div className="relative w-full bg-black ">
                    <img src={topic.src} alt="Voice Emotion Recognition Image" className="w-full h-96 object-cover"/>
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center flex-col text-white p-4">
                        <h1 className="text-4xl font-bold">{topic.title}</h1>
                        <p className="text-xl mt-2">{topic.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHomepage;