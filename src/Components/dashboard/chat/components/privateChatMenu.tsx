import { Menu } from "@mantine/core";
import React from "react";
import {
    IconSettings,
} from "@tabler/icons-react"
import { Button, Text, Box } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";

export function PrivateChatMenu() {
    return (
        <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    cursor: 'pointer'
                }}>
                    <IconDots />
                </Box>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                {/* <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item> */}
                <Menu.Item
                    color="red"
                    icon={<IconBan size={14} />}
                >
                    Ban
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
