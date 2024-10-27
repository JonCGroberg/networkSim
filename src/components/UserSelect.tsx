import { useState } from 'react';
import {
    Button,
} from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { navigate } from "astro:transitions/client";
import type { UserProfile } from "@/types/User";
import { mainUser, saveMainUser } from '@/store/User';
import { sessionId } from '@/store/Session'
import { generateSessionId } from '@/utils/session';

function UserSelect() {
    const [linkedInUrl, setLinkedInUrl] = useState<string>("");
    // const [, setUser] = useAtom(userStore);
    const payload = {
        linkedin_id: linkedInUrl
    };
    const url = "https://kayecho-364607428894.us-central1.run.app/userProfile";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
            if (user != undefined) {
                saveMainUser(user);
                sessionId.set(generateSessionId());
                navigate('/chat-page/' + user.response.full_name);
            }

            console.log(user)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-4 w-full">
            <Input
                id="linkedinProfile"
                type="text"
                placeholder="Enter LinkedIn profile ID"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
            />

            <Button type="submit" className="mt-4">
                Submit
            </Button>
        </form>
    );
};

export default UserSelect;
