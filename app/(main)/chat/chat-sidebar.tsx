import React, { useState } from 'react'
import MenuBar from './menu-bar'
import { ChannelList } from 'stream-chat-react'
import {UserResource} from "@clerk/types"
import UserMenu from './user-menu'
type Props = {
    user: UserResource
}
const ChatSidebar = ({user} : Props) => {

    // const [usersMenuOpen, setUsersMenuOpen] = useState(false);

    // const onUserMenuClick = () => {
    //     setUsersMenuOpen(!usersMenuOpen);
    // }
  return (
    <div className="relative w-full max-w-[360px] ">
        
        {/* <MenuBar onUserMenuClick={onUserMenuClick}/> */}
        {/* {usersMenuOpen && 
        <UserMenu loggedInUser={user}/>} */}
        <ChannelList 
            filters={{
                type: "messaging",
                members: {$in: [user.id]}
            }}
            sort={{last_message_at: -1}}
            options={{state: true, presence: true}}
            showChannelSearch
            additionalChannelSearchProps={
                {
                    searchForChannels: true,
                    searchQueryParams: {
                        channelFilters: {
                            filters: {
                                members: {$in: [user.id]},
                                // name: {$in: [user.username]}
                            }
                        },
                        
                    }

                }
            }
        />
    </div>
  )
}

export default ChatSidebar