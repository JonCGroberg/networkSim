// import { useStore } from "@nanostores/react";
// import { useRef, useState } from "react";

// export default function Simulation(){
//     const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
//   const [userInput, setUserInput] = useState<string>("");
//   const [sessionId, setSessionId] = useState(generateSessionId());

//   const [idealProfile, setIdealProfile] = useState<string>("");

//   const chatContentRef = useRef<HTMLDivElement>(null);
//   const userProfile = useStore(mainUser);


//   useEffect(() => {
//     if (chatContentRef.current) {
//       chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
//     }

//     generateSessionId()
//   });

//   async function sendUserMessage(message: string) {
//     const url = "https://kayecho-364607428894.us-central1.run.app/langChainHandler"
//     const payload = { token: sessionId, text: String(message) }

//     console.log(payload)
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.error('Error:', error); // Log any errors
//     }
//   };

//   async function sendIdealProfile() {
//     const payload = { token: sessionId, text: String(idealProfile), linkedin_id: "https://www.linkedin.com/in/jonathan-groberg/" }
//     const url = 'https://kayecho-364607428894.us-central1.run.app/langChainHandlerSearch'

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log(data);

//       dashboardData.set(data);
//       navigate("/dashboard")
//       // return data;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   async function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault(); // Prevents the default form submission behavior

//     if (userInput == "") return;

//     const userMsg: ChatItem = { token: sessionId, speaker: "B", text: userInput };
//     const tempInput = userInput
//     setUserInput("");
//     setChatHistory([...chatHistory, userMsg, { speaker: "A", text: "AI is thinking...", token: sessionId }])

//     const { response: botMsg, profile_user } = await sendUserMessage(tempInput);
//     setChatHistory([...chatHistory, userMsg, botMsg]); // Update chat history
//     setIdealProfile(profile_user)

//     console.log(botMsg, profile_user)
//   }

//   async function handleSuggestion(userInput: string) {
//     const userMsg: ChatItem = { token: sessionId, speaker: "B", text: userInput };
//     const tempInput = userInput
//     setUserInput("");
//     setChatHistory([...chatHistory, userMsg, { speaker: "A", text: "AI is thinking...", token: sessionId }])

//     const { response: botMsg, profile_user }: { response: ChatItem, profile_user: string } = await sendUserMessage(tempInput);
//     setChatHistory([...chatHistory, userMsg, botMsg]); // Update chat history
//     setIdealProfile(profile_user)

//     console.log(botMsg, profile_user)
//   }

//   return (
//     // <div className="grid md:grid-cols-[300px_1fr] gap-6">
//     <ResizablePanelGroup direction="horizontal" className={chatHistory.length > 0 ? "rounded-lg border shadow-sm min-h-[500px] max-w-[900px] mx-auto" : "rounded-lg border shadow-sm mx-auto max-w-[700px] "}>
//       <ResizablePanel defaultSize={40} className={chatHistory.length > 0 ? "" : "hidden"}>
//         <div className="flex flex-col h-full">
//           <Textarea className=" rounded-none border-none p-5 flex-grow " value={idealProfile} onChange={(e) => setIdealProfile(e.target.value)} />
//           <div className="w-full p-5 border-t">
//             <Button disabled={chatHistory.length < 1} className="bg-red-500 hover:bg-red-700 w-full" onClick={sendIdealProfile}>Find Matches</Button>
//           </div>
//         </div>
//       </ResizablePanel>
//       <ResizableHandle withHandle className={chatHistory.length > 0 ? "" : "hidden"} />
//       <ResizablePanel defaultSize={100} className="">
//         <Card className="w-full h-full mx-auto border-0 shadow-none flex flex-col py-2">
//           {chatHistory.length > 0 &&
//             <>
//               <CardHeader className="flex flex-row items-center border-b px-4 py-3">
//                 <div className="flex items-center space-x-3">
//                   <Avatar>
//                     <AvatarImage src="/placeholder-user.jpg" alt="Business Logo" />
//                     <AvatarFallback>{userProfile?.response.first_name[0] + "" + userProfile?.response.last_name[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-medium leading-none"> {userProfile?.response.full_name} </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile?.response.job_title}</p>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent ref={chatContentRef} className="px-4 flex-grow py-6 space-y-4 max-h-[400px] overflow-scroll">
//                 {chatHistory.map((chatItem, index) => chatItem.speaker === "B" ?
//                   <div key={index} className="chat-message flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-gray-50 dark:bg-primary dark:text-gray-50">
//                     {chatItem.text}
//                   </div>
//                   : <div key={index} className={`  flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${chatItem.text === "AI is thinking..." ? "bg-gray-100 dark:bg-gray-800 animate-pulse" : "bg-gray-100 dark:bg-gray-800 chat-message"}`}>
//                     {chatItem.text}
//                   </div>
//                 )}

//               </CardContent>
//             </>}
//           <CardFooter className={chatHistory.length > 0 ? "border-t flex" : "flex flex-wrap gap-4 justify-center"}>
//             <form className="flex w-full items-center space-x-2 pt-4 -mb-2" onSubmit={(e) => handleUserSubmit(e)}>
//               <Input id="message" placeholder="Type your message.." className="flex-1" autoComplete="off" value={userInput} onInput={(e) => setUserInput((e.target as HTMLInputElement).value)} />
//               <Button type="submit" size="icon">
//                 <SendIcon className="h-4 w-4" />
//                 <span className="sr-only">Send</span>
//               </Button>
//             </form>
//             {chatHistory.length == 0 &&
//               <div className="gap-2 flex w-full overflow-x-scroll  py-2 -mb-4">
//                 <Button className="flex-grow" onClick={() => handleSuggestion("I'm looking for a front-end developer")}>Find a front-end developer</Button>
//                 <Button className="flex-grow" onClick={() => handleSuggestion("I'm looking for a marketing specialist for B2C solutions")}>Find a marketing specialist for B2C solutions</Button>
//                 <Button className="flex-grow" onClick={() => handleSuggestion("I'm looking for a designer to design my logo")}>Find a designer to design my logo</Button>
//               </div>}
//           </CardFooter>
//         </Card>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//     // </div>
//   )
// }