import React, { useState, useEffect } from 'react';

export const Alert = ({ children, type, onClose }) => {
  const [color, setColor] = useState('gray');

  useEffect(() => {
    switch (type) {
      case 'error':
        setColor('red')
        break;
      case 'success':
        setColor('green')
        break;
      case 'alert':
        setColor('yellow')
        break;
      default:
        break;
    }
  }, [type])

  useEffect(() => {
    const timer = () => setTimeout(() => {
      onClose();      
    }, 3000);

    const timerId = timer()

    return () => clearTimeout(timerId)
  }, [])

  return (
    <div className={`rounded-md bg-${color}-100 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className={`h-5 w-5 text-${color}-400`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRle="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm leading-5 font-medium text-${color}-800`}>
            {children}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button onClick={onClose} className={`inline-flex rounded-md p-1.5 text-${color}-500 hover:bg-${color}-100 focus:outline-none focus:bg-${color}-100 transition ease-in-out duration-150`} aria-label="Dismiss">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}