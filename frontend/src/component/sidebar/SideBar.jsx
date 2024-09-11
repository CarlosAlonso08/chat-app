import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogOutButton from './LogOutButton.jsx'

const SideBar = () => {
  return (
    <div className='border-r border-slate-500 flex flex-col'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <LogOutButton/>
    </div>
  )
}

export default SideBar