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
    casual_intro: "-----",
    content_collab_intro: "------",
    email: "-----",
    icebreaker: "-------",
    intro: "------",
    linkedin_message: "----",
    linkedin_url: "------",
    match: "-----",
    name: "------",
    profile: "-----",
    profile_agent: "------",
    twitter_dm: "-------",
    twitter_public_message: "------"
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
      setSimulatedUserProfilePicture(data?.response.picture ?? "");
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

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

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

      <Simulation simulatedUser={dashboard} picture={simulatedUserProfilePicture} />

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