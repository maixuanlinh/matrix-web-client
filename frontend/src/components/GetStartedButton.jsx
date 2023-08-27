import React from 'react'

const GetStartedButton = ({children, text}) => {
  return (
    <div className='flex flex-col w-[160px] h-[120px] font-bold bg-blue-600 text-white rounded-lg justify-center items-center text-center ml-3'>
        {children}
        {text}
    </div>
  )
}

export default GetStartedButton