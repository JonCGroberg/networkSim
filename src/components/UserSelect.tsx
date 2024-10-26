import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { navigate } from "astro:transitions/client";
import type { UserProfile } from "@/types/User";


function UserSelect({ users }: { users: UserProfile[] }) {
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
    const handleChange = (full_nume: string) => {
        const user = users.find(user => user.response.full_name === full_nume);
        setSelectedUserId(user ? user.response.linkedin : undefined);
        if (user != undefined) navigate('/chat-page/' + user.response.full_name);
    };


    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger >
                <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {users.map((user) => <SelectItem key={user.response.full_name} value={user.response.full_name}>{user.response.full_name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default UserSelect;
