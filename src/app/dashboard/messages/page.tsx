"use client";

import { Menu, Phone, Search, Send, Video, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  role: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface SharedFile {
  name: string;
  type: string;
  size: string;
  date: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Kierra McAdams",
    avatar: "/images/user/user-01.png",
    status: "online",
    role: "Co-founder @ Coffee Country",
    lastMessage: "Hey! How's it going?",
  },
  {
    id: 2,
    name: "Zaire Siphron",
    avatar: "/images/user/user-02.png",
    status: "offline",
    role: "Member",
    lastMessage: "I can help 👍",
  },
  {
    id: 3,
    name: "Giana Press",
    avatar: "/images/user/user-03.png",
    status: "away",
    role: "Member",
    lastMessage: "I have a new project 😊",
  },
  {
    id: 1,
    name: "Kierra McAdams",
    avatar: "/images/user/user-01.png",
    status: "online",
    role: "Co-founder @ Coffee Country",
    lastMessage: "Hey! How's it going?",
  },
  {
    id: 2,
    name: "Zaire Siphron",
    avatar: "/images/user/user-02.png",
    status: "offline",
    role: "Member",
    lastMessage: "I can help 👍",
  },
  {
    id: 3,
    name: "Giana Press",
    avatar: "/images/user/user-03.png",
    status: "away",
    role: "Member",
    lastMessage: "I have a new project 😊",
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Kierra McAdams",
    content: "Hey! How's it going?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Kierra! I'm doing well, thanks. How about you?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "Kierra McAdams",
    content: "I'm great! Just finished a meeting about our new coffee blend.",
    timestamp: "10:34 AM",
  },
  {
    id: 4,
    sender: "You",
    content: "That sounds exciting! How's it coming along?",
    timestamp: "10:35 AM",
  },
  {
    id: 5,
    sender: "Kierra McAdams",
    content:
      "It's going really well. We're aiming for a smooth, balanced flavor with hints of chocolate and caramel.",
    timestamp: "10:38 AM",
  },
];

const sharedFiles: SharedFile[] = [
  {
    name: "Workschedule.pdf",
    type: "pdf",
    size: "2.45 MB",
    date: "14 Aug 2023",
  },
  {
    name: "Final handoff.fig",
    type: "fig",
    size: "4.21 MB",
    date: "24 July 2023",
  },
  {
    name: "Members list.docs",
    type: "docs",
    size: "988 KB",
    date: "12 Jun 2020",
  },
];

const Messages: React.FC = () => {
  const [activeUser, setActiveUser] = useState<User>(users[0]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>(initialMessages);
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setShowLeftSidebar(true);
        setShowRightSidebar(true);
      } else {
        setShowRightSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: chatMessages.length + 1,
        sender: "You",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Left Sidebar - User List */}
      {(showLeftSidebar || !isMobile) && (
        <div className="absolute z-10 w-full overflow-y-auto border-r border-slate-200 bg-white md:relative md:w-100">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <h1 className="text-2xl font-semibold text-slate-800">Messages</h1>
            {isMobile && (
              <button
                onClick={() => setShowLeftSidebar(false)}
                className="md:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="relative mt-4 px-4">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full rounded-full border border-slate-300 py-2 pl-10 pr-4"
            />
            <Search className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>

          <nav className="mt-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="group relative px-4 py-3 hover:bg-slate-50"
              >
                <button
                  onClick={() => {
                    setActiveUser(user);
                    if (isMobile) setShowLeftSidebar(false);
                  }}
                  className={`w-full text-left ${activeUser.id === user.id ? "bg-slate-100" : ""}`}
                >
                  <div className="grid grid-cols-[1fr_9fr_3fr] gap-3">
                    <div className="relative">
                      <div className="h-10 w-10">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          user.status === "online"
                            ? "bg-green-400"
                            : user.status === "away"
                              ? "bg-yellow-400"
                              : "bg-slate-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-500">{user.role}</p>
                      <p className="truncate text-sm font-medium text-slate-600">
                        {user.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1">
        {activeUser ? (
          <div className="flex h-full flex-col">
            {/* Chat Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
              <div className="flex items-center">
                {isMobile && (
                  <button
                    onClick={() => setShowLeftSidebar(true)}
                    className="mr-4 md:hidden"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                )}
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="mr-4 h-10 w-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {activeUser.name}
                  </h2>
                  <p className="text-sm text-slate-500">{activeUser.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-slate-500 hover:text-slate-600">
                  <Phone className="h-6 w-6" />
                </button>
                <button className="text-slate-500 hover:text-slate-600">
                  <Video className="h-6 w-6" />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-4 shadow-sm lg:max-w-md ${
                      message.sender === "You"
                        ? "bg-blue-50 text-slate-800"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="mt-1 block text-xs text-slate-400">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={sendMessage}
              className="flex flex-col space-y-3 border-t border-slate-200 bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full bg-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500">Select a user to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
