import Link from 'next/link'
import React from 'react'
import { PiSmileySadLight } from 'react-icons/pi'

const NotFound = ({title, description, noButton, link, linkText}: {title: string, description: string, noButton: boolean, link: string, linkText: string}) => {
  return (
    <>
      <div className="mb-5 flex min-h-[300px] flex-col items-center justify-center rounded-md border border-slate-100 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <PiSmileySadLight className="text-gray-500 m-auto size-15 text-center" />
              <h3 className="text-gray-900 dark:text-gray-100 mt-3 text-2xl font-semibold">
                {title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">
                {description}
              </p>
              {noButton ? null : (
                <div className="mt-6">
                  <Link
                    href={link || '#'}
                  className="hover:bg-primary-dark inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {linkText}
                  </Link>
                </div>
              )}
            </div>
          </div>
    </>
  )
}

export default NotFound
