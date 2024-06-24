import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
import {UserResource} from "@clerk/types"
import { Channel, UserResponse } from 'stream-chat'
type Props = {
    loggedInUser: UserResource;
}
export default function UserMenu({loggedInUser} : Props){
    const {client, setActiveChannel} = useChatContext();
    const [users, setUsers] =  useState<(UserResponse & {image?: string})[]>();
    useEffect(() => {
        async function loadInitalUsers() {
            try {
                const response = await client.queryUsers(
                    {
                        id: {$ne: loggedInUser.id}
                    },
                    {
                        id: 1
                    }
                )
                setUsers(response.users)
            }catch(e) {
                console.log(e);
                alert("Error loading user")
            }

        }
        loadInitalUsers();
    }, [client, loggedInUser.id])

    function handleChannelSelected(channel: Channel) {
        setActiveChannel(channel);
      }
    async function startChatWithUser(userId: string) {
        try {
          const channel = client.channel("messaging", {
            members: [userId, loggedInUser.id],
          });
          await channel.create();
          handleChannelSelected(channel);
        } catch (error) {
          console.error(error);
          alert("Error creating channel");
        }
      }
  return (
    <div className='str-chat bg-slate-100 absolute z-10 h-full w-full'>
        {users?.map((user) => (
            <UserResult key={user.id} user={user} onUserClicked={startChatWithUser}/>
        ))}
    </div>
  )
}
interface UserResultProps {
    user: UserResponse & { image?: string };
    onUserClicked: (userId: string) => void;
    // selected?: boolean;
    // onChangeSelected: (selected: boolean) => void;
  }
function UserResult({
    user,
    onUserClicked,
  }: UserResultProps) {
    return (
        <button
      className="mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed] dark:hover:bg-[#1c1e22]"
      onClick={() => onUserClicked(user.id)}
    >

      <span>
        <Avatar image={user.image} name={user.name || user.username} size={40} />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.username || user.name}
      </span>
        {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
    )
}

