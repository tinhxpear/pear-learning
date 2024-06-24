"use client"
import { Chat, LoadingIndicator, MessageInput, MessageList, Thread, Window} from "stream-chat-react"
import useInitializeChatClient from "./useInitializeChatClient"
import { useUser } from "@clerk/nextjs"
import ChatSidebar from "./chat-sidebar"
import ChatChannel from "./chat-channel"
const ChatPage = () => {

    const chatClient = useInitializeChatClient();
    const {user} = useUser();

    if(!chatClient || !user){
        return (
            <div className="flex h-screen items-center justify-center">
                <LoadingIndicator size={40}/>
            </div>
        )
    }
  return (
    <div>
        <Chat client={chatClient}>
            <div className="flex h-full flex-row">
                <ChatSidebar user={user}/>
                <ChatChannel />
            </div>
        </Chat>
    </div>
  )
}

export default ChatPage