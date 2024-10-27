import { mainUser } from "@/store/User";
import { generateSessionId } from "@/utils/session";
import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import { SendIcon } from "lucide-react";
import { dashboardData, type DashboardData } from "@/store/Dashboard";
import { navigate } from "astro:transitions/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ChatItem {
    speaker: string
    token: string;
    text: string
}

export default function Simulation({ simulatedUser, picture }: { simulatedUser: any, picture: string }) {
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

    const chatContentRef = useRef<HTMLDivElement>(null);
    const userProfile = useStore(mainUser);
    const storedData = useStore(dashboardData);

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }

        async function simulate() {
            const url = "https://kayecho-364607428894.us-central1.run.app/simulateConversation"

            const payload_simulate_conversation = {
                "linkedin_1": simulatedUser.linkedin_url,
                "linkedin_2": userProfile?.response.linkedin
            }
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload_simulate_conversation),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setChatHistory(data.response);
            } catch (error) {
                console.error("Error calling API:", error);
            }
        }

        simulate();
    },[simulatedUser]);

    return (
        <Card className="w-full h-[600px] mx-auto  flex flex-col py-2">
            <CardHeader className="flex flex-row items-center border-b px-4 py-3">
                <div className="flex items-center w-full space-x-3">
                    <span className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={picture} alt="Business Logo" />
                            <AvatarFallback>{simulatedUser.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none"> {simulatedUser.name} </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{simulatedUser.profile.substring(0, 60) + "..."}</p>
                        </div>
                    </span>
                    <div className="flex-grow"></div>
                    <span className="flex text-right gap-4 float-right">
                        <div>
                            <p className="text-sm font-medium leading-none"> {userProfile?.response.full_name} </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile?.response.job_title.substring(0, 60) + "..."}</p>
                        </div><Avatar>
                            <AvatarImage src={userProfile?.response.picture} alt="Business Logo" />
                            <AvatarFallback>{userProfile?.response.first_name[0] + "" + userProfile?.response.last_name[0]}</AvatarFallback>
                        </Avatar>
                    </span>
                </div>
            </CardHeader>
            <CardContent ref={chatContentRef} className="px-4 flex-grow py-6 space-y-4  overflow-scroll">
                {chatHistory.map((chatItem, index) => chatItem.speaker === "B" ?
                    <div key={index} className="chat-message flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-gray-50 dark:bg-primary dark:text-gray-50">
                        {chatItem.text}
                    </div>
                    : <div key={index} className={`  flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${chatItem.text === "AI is thinking..." ? "bg-gray-100 dark:bg-gray-800 animate-pulse" : "bg-gray-100 dark:bg-gray-800 chat-message"}`}>
                        {chatItem.text}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}