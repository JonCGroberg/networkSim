import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState, type SVGProps, useRef } from "react"
import { findUserProfileByName, type UserProfile } from "@/types/User"

interface ChatItem {
  user: string;
  message: string
}

export default function Chat({ user_name }: { user_name: string }) {

  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProfile = findUserProfileByName(user_name);
    setUserProfile(foundProfile);

    // Scroll to the bottom of the chat content
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatHistory]); // Add chatHistory as a dependency

  function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents the default form submission behavior

    if (userInput == "") return;

    const userMsg: ChatItem = { user: "A", message: userInput };
    const botMsg: ChatItem = { user: "B", message: "AI response..." };

    setUserInput("");
    setChatHistory([...chatHistory, userMsg, botMsg]); // Update chat history
  }

  function handleSuggestion(userInput: string) {
    const userMsg: ChatItem = { user: "A", message: userInput };
    const botMsg: ChatItem = { user: "B", message: "AI response..." };

    setUserInput("");
    setChatHistory([...chatHistory, userMsg, botMsg]); // Update chat history
  }

  return (
    // <div className="grid md:grid-cols-[300px_1fr] gap-6">
    <ResizablePanelGroup direction="horizontal" className={chatHistory.length > 0 ? "rounded-lg border shadow-sm " : "rounded-lg border shadow-sm mx-auto max-w-[600px]"}>
      <ResizablePanel defaultSize={40} className={chatHistory.length > 0 ? "" : "hidden"}></ResizablePanel>
      <ResizableHandle withHandle className={chatHistory.length > 0 ? "" : "hidden"} />
      <ResizablePanel defaultSize={100}>
        <Card className="w-full mx-auto border-0 shadow-none">
          {chatHistory.length > 0 &&
            <>
              <CardHeader className="flex flex-row items-center border-b px-4 py-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="Business Logo" />
                    <AvatarFallback>{userProfile?.response.first_name[0] + "" + userProfile?.response.last_name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none"> {userProfile?.response.full_name} </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile?.response.job_title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent ref={chatContentRef} className="px-4 py-6 space-y-4 max-h-[400px] overflow-scroll">
                {chatHistory.map(chatItem => chatItem.user === "A" ?

                  <div className="chat-message flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-gray-50 dark:bg-primary dark:text-gray-50">
                    {chatItem.message}
                  </div>
                  : <div className="chat-message flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800">
                    {chatItem.message}
                  </div>

                )}

              </CardContent>
            </>}
          <CardFooter className={chatHistory.length > 0 ? "border-t" : "flex flex-wrap gap-4 justify-center"}>
            <form className="flex w-full items-center space-x-2 pt-6" onSubmit={(e) => handleUserSubmit(e)}>
              <Input id="message" placeholder="Type your message..." className="flex-1" autoComplete="off" value={userInput} onInput={(e) => setUserInput((e.target as HTMLInputElement).value)} />

              <Button type="submit" size="icon">
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>

            </form>

            {chatHistory.length == 0 && <div className="gap-2 flex w-full">
              <Button className="flex-grow" onClick={() => handleSuggestion("Example Prompt 1")}>Example Prompt 1</Button>
              <Button className="flex-grow" onClick={() => handleSuggestion("Example Prompt 2")}>Example Prompt 2</Button>
              <Button className="flex-grow" onClick={() => handleSuggestion("Example Prompt 3")}>Example Prompt 3</Button>
            </div>}
          </CardFooter>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
    // </div>
  )
}

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}
