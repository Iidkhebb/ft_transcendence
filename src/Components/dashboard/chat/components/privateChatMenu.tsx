import { Menu } from "@mantine/core";
import React from "react";
import {
    IconArrowsLeftRight,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons";
import { Button, Text, Box } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

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
                <Menu.Label>Application</Menu.Label>
                {/* <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item> */}
                <Menu.Item
                    // icon={<IconSearch size={14} />}
                    rightSection={
                        <Text size="xs" color="dimmed">
                            ⌘K
                        </Text>
                    }
                >
                    Search
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
