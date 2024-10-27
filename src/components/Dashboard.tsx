import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Linkedin, Mail, MessageCircle, Twitter } from "lucide-react"
import { useEffect, useState } from "react"
import { type DashboardData, dashboardData } from "@/store/Dashboard"
import { useStore } from "@nanostores/react"
import Simulation from "./Simulation"
import type { UserProfile } from "@/types/User"

const data = {
  dashboardData: {
    casual_intro: "Hey Ryan! Your blend of AI with creative tech is super cool. I'm a machine learning geek myself and would love to chat about where our fields intersect. Wanna connect and explore ideas?",
    content_collab_intro: "Hi Ryan, your recent posts about combining AI with traditional practices got me thinking. How about co-authoring an article exploring the convergence of AI in creative design? Could be a great way to catalyze new ideas.",
    email: "Subject: Exploring Intersection of AI and Creative Technology\n\nHi Ryan,\n\nI hope this message finds you well. My name is Jessica Malow, and I am deeply immersed in the realms of machine learning and computer vision. I recently came across your impressive work on integrating AI into creative technologies and was fascinated by your insights shared on LinkedIn.\n\nI believe our backgrounds in AI and transformative technologies provide a fascinating intersection, particularly in ethical AI applications in the artistic space. I'd love to explore potential collaboration opportunities and share ideas.\n\nLooking forward to the possibility of connecting.\n\nBest regards,\n\nJessica Malow",
    icebreaker: "What do you think are the most exciting upcoming trends in using AI to enhance creative platforms and experiences?",
    intro: "Given both profiles' interest in AI and transformative technologies, a discussion could start on the ethical implications and future applications of AI in creative fields, touching on both technical and creative innovation.",
    linkedin_message: "Hi Ryan, \n\nI've been following your pioneering work in creative technologies and immersive experiences. As someone passionate about AI and machine learning, I'm inspired by your innovative approaches in the tech-art space. Would love to connect and share insights! \n\nBest, Jessica",
    linkedin_url: "https://linkedin.com/in/jessicamalow",
    match: "Both profiles exhibit strong innovative and technical capabilities, with Profile 1 focusing on machine learning, AI, and engineering, while Profile 2 focuses on creative technologies and immersive experiences. Their common ground lies in artificial intelligence and leveraging cutting-edge technology to create impactful solutions, making for an intriguing potential collaboration.",
    name: "Jessica Malow",
    profile: "Jessica Malow is a results-driven and highly skilled engineer with a comprehensive background in Bioengineering and Electrical Engineering & Computer Science from UC Berkeley. Specialized in machine learning, computer vision, robotics, and medical devices, she has a proven ability to develop innovative solutions to complex problems. She is proficient in Python, C++, Java, and Swift, and has extensive experience with frameworks like TensorFlow and PyTorch. Her research experience includes working with the Berkeley Sensor & Actuator Center on computer vision techniques using OpenCV and Dlib, and developing AI features for portable ultrasound devices at iSono Health.",
    profile_agent: "Jessica Malow is a dynamic machine learning researcher with a robust background in Bioengineering and Electrical Engineering & Computer Science. Her expertise lies in developing impactful AI solutions, particularly in the realms of medical devices and computer vision. With strong programming skills and experience in CAD, Jessica is known for her innovative approaches and effective teamwork abilities. She thrives in research and development environments, constantly aiming to push the boundaries of technology and collaboration.",
    twitter_dm: "Hi Ryan! Just read about your fascinating work in blending AI with 3D user-generated content. As an AI researcher, I'd love to discuss how these creative tech paradigms intertwine. Up for a chat sometime? \n\n- Jessica",
    twitter_public_message: "@RyanXponent Love your initiative on enabling creators with immersive experiences. As someone deeply into AI and machine learning, I'd love to see how we're pushing tech boundaries together. Let's connect! #Innovation #AIandTech"
  }
}

export default function NetworkingDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>(data.dashboardData);
  const storedData = useStore(dashboardData);
  const [simulatedUserProfilePicture, setSimulatedUserProfilePicture] = useState<string>("");

  useEffect(() => {
    console.log(storedData)
    if (storedData) setDashboard(storedData.response);
  })

  useEffect(() => {
    const fetchData = async () => {
      // Your async logic here
      const data = await getImage();
      setSimulatedUserProfilePicture(data?.response.picture??"");
    };

    fetchData();
  }, [dashboard])


  async function getImage() {
    const payload = {
      linkedin_id: dashboard.linkedin_url
    }

    const url = "https://kayecho-364607428894.us-central1.run.app/userProfile";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const user: UserProfile = data.response;
      return user;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={simulatedUserProfilePicture} alt={dashboard.name} />
                <AvatarFallback>{dashboard.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{dashboard.name}</CardTitle>
                <CardDescription>
                  <a href={dashboard.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    LinkedIn Profile
                  </a>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-500 mb-4">{dashboard.profile_agent}</p>
          <h3 className="font-semibold mb-2">Match Analysis</h3>
          <p className="text-sm">{dashboard.match}</p>
        </CardContent>
      </Card>
      <Simulation simulatedUser={data.dashboardData} picture ={simulatedUserProfilePicture} />

      <Tabs defaultValue="icebreakers" className="w-full mt-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="icebreakers">Icebreakers</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center"><Linkedin className="mr-2" /> LinkedIn Message</h3>
                <p className="text-sm mt-1">{dashboard.linkedin_message}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center"><Twitter className="mr-2" /> Twitter DM</h3>
                <p className="text-sm mt-1">{dashboard.twitter_dm}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center"><Twitter className="mr-2" /> Twitter Public</h3>
                <p className="text-sm mt-1">{dashboard.twitter_public_message}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm">{dashboard.email}</pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="icebreakers">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Starters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Casual Intro</h3>
                <p className="text-sm mt-1">{dashboard.casual_intro}</p>
              </div>
              <div>
                <h3 className="font-semibold">Content Collaboration Intro</h3>
                <p className="text-sm mt-1">{dashboard.content_collab_intro}</p>
              </div>
              <div>
                <h3 className="font-semibold">Icebreaker Question</h3>
                <p className="text-sm mt-1">{dashboard.icebreaker}</p>
              </div>
              <div>
                <h3 className="font-semibold">Discussion Starter</h3>
                <p className="text-sm mt-1">{dashboard.intro}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-4 flex justify-center space-x-4">
        <Button className="flex items-center">
          <Mail className="mr-2 h-4 w-4" /> Send Email
        </Button>
        <Button className="flex items-center">
          <MessageCircle className="mr-2 h-4 w-4" /> Start Chat
        </Button>
      </div>
    </div>
  )
}