import React from 'react'

export default function Spinner() {
  return (
    <span role='status' aria-label='loading' className=' animate-spin inline-block size-6 border-[3px] border-t-transparent text-blue-600 dark:text-blue-600 rounded-full'></span>
  )
}
