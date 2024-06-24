import { Users } from 'lucide-react'
import React from 'react'

type Props = {
    onUserMenuClick: () => void;
}
const MenuBar = ({onUserMenuClick} : Props) => {
  return (
    <div className='p-3 flex items-center gap-3 '>
        <div className='flex gap-6'>
            <span title='show user'>
                <Users className='cursor-pointer' onClick={onUserMenuClick}/>
            </span>
        </div>
    </div>
  )
}

export default MenuBar