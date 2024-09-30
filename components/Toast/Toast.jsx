'use client';

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

export default function Toast({ message, type, setShowToast }) {
    return (
        <div
            className={`fixed top-5 right-5 flex items-center max-w-xs p-4 mt-4 text-gray-500 bg-white rounded-lg shadow-xl  z-50
            ${type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
            role="alert"
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
                {type === 'success' ? (
                    <AiOutlineCheckCircle size={24} />
                ) : (
                    <AiOutlineCloseCircle size={24} />
                )}
            </div>

            <div className="ml-3 text-sm font-600 font-normal">{message}</div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                onClick={() => setShowToast(false)}
            >
                <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    );
}
