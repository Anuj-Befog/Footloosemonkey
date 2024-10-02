import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <section className="flex">
      <div className="py-24 px-4 mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-white-600 dark:text-white-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="mb-4 text-lg font-light text-white-500 dark:text-white-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
          <Link href="/" className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Back to home</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound

export const metadata = {
  title: "404 - Footloosemonkey"
}