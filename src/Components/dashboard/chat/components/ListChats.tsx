import { Box, Divider, MantineTheme, Navbar } from "@mantine/core";
import React, { useEffect, useState } from "react";
import store from "@/store/store";
import { ButtonMenu } from "./ButtonMenu";
import { Chat } from "./Chat";

export function ListChats({}: {}) {
    const [chats, setChats] = useState<any>([]);

    useEffect(() => {
        setChats(store.getState().chats.PrivateChats);
        store.subscribe(() => {
            const chatsFromStore = store.getState().chats.PrivateChats;
            setChats(chatsFromStore);
        });
    }, []);

    return (
        <>
            <Box w={"100%"} h="100%" p="md">
                <Navbar.Section>
                    {chats.map((chat: any, index: number) => (
                        <Box key={index}>
                            <Chat chat={chat} />
                            <Divider />
                        </Box>
                    ))}
                </Navbar.Section>
            </Box>
            {/* floating add button in the buttom */}
            <Box
                sx={(theme: MantineTheme) => ({
                    position: "absolute",
                    bottom: theme.spacing.md,
                    right: theme.spacing.md,
                })}
            >
                <ButtonMenu />
            </Box>
        </>
    );
}
