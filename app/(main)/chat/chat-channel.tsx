import React from 'react'
import { Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'

const ChatChannel = () => {
  return (
    <div className="h-full w-full">
        <Channel>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
            </Window>
            <Thread />
        </Channel>
    </div>
  )
}

export default ChatChannel