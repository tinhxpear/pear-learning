import React from 'react'
import { Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'

const ChatChannel = () => {
  return (
    <div className="h-[600px] w-full overflow-scroll">
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