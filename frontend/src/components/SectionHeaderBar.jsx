import React from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import { RxArrowDown, RxDropdownMenu, RxPlus } from 'react-icons/rx'

const SectionHeaderBar = ({section, setActive, active}) => {
    const handleClick = () => { 
        setActive(!active);
    }
  return (
    <div className="w-[100%] flex relative mt-1 mr-2 ml-3 justify-between">
      <div className='flex items-center font-bold text-gray-500'
      onClick={handleClick}
      >
      {!active ? <AiOutlineRight className="mt-1 w-[30px] h-[30px] p-2" /> : <AiOutlineDown className="mt-1 w-[30px] h-[30px] p-2" />}
      {section}
      </div>
      <RxPlus className="mx-2 mt-1 w-[35px] h-[35px] p-2 m-1" />
  </div>
  )
}

export default SectionHeaderBar