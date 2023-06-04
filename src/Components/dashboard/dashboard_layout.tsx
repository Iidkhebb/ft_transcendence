import { Avatar, Box, Button, Divider, Grid, Group, Input, MantineTheme, Space } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
// import Header from "./header";

import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger } from "@mantine/core";
import HeaderDashboard from "./header";
import Chats from "./chat/chats";
import PublicGroups from "./public_groups";
import store from "@/store/store";
import { motion } from "framer-motion";
import { IconArrowNarrowLeft, IconSend } from "@tabler/icons-react";
import { PrivateChatMenu } from "./chat/components/privateChatMenu";
import AsideChatInfo from "./aside";
import { useMediaQuery } from "@mantine/hooks";

export function DashboardLayout() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [chat, setChat] = useState<any>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const AsideWidth = "300px";

    useEffect(() => {
        setChat(store.getState().chats.currentChat);
        store.subscribe(() => {
            setChat(store.getState().chats.currentChat);
            console.log("chat", store.getState().chats.currentChat);
        });
    }, []);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, md: 300, lg: 400 }}>
                    <Chats setChat={setChat} />
                </Navbar>
            }
            header={<HeaderDashboard />}
            aside={
                chat ? (
                    <Aside
                        w={AsideWidth}
                        hiddenBreakpoint="sm"
                        hidden={!opened}
                        sx={{
                            zIndex: 0,
                        }}
                    >
                        <AsideChatInfo user={chat} />
                    </Aside>
                ) : undefined
            }
        >
            <Box w={chat && !isMobile ? `calc(100% - ${AsideWidth})` : "100%"}>
                {chat ? (
                    <motion.div
                        initial={{ opacity: 0, transform: "translateY(-100%)" }}
                        animate={{ opacity: 1, transform: "translateY(0%)" }}
                        exit={{ opacity: 0 }}
                    >
                        <Box p="md">
                            <ChatContainer user={chat} setSelected={setChat} />
                        </Box>
                    </motion.div>
                ) : (
                    <Box p="md">
                        <PublicGroups />
                    </Box>
                )}
            </Box>
        </AppShell>
    );
}

function ChatContainer({ user, setSelected }: { user: any; setSelected: any }) {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery("(max-width: 768px)");
    // const [user, setUser] = useState(user);

    const [messages, setMessages] = useState([
        {
            id: 0,
            message: "Hello",
            time: "12:00",
            from: "me",
        },
        {
            id: 1,
            message: "Hello",
            time: "12:00",
            from: "other",
        },
        {
            id: 2,
            message: "fin awlad l9ahba? 💁👌🎍😍",
            time: "12:00",
            from: "me",
        },
    ]);

    const [message, setMessage] = useState("");
    const scrollRef = useRef<any>();

    const sendMessage = (message: any) => {
        if (!message || message.message === "") return;
        setMessages([...messages, message]);
        setMessage("");
    };

    useEffect(() => {
        //get the last message
        const lastMessage = scrollRef.current.lastElementChild;
        // scroll to the last message
        lastMessage.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box>
            <Flex>
                <motion.div
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                    }}
                    initial={{
                        opacity: 0,
                        scale: 1,
                        background: "transparent",
                        borderRadius: theme.radius.md,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    whileHover={{
                        scale: 1.2,
                        background: theme.colors.gray[9],
                        borderRadius: theme.radius.md,
                    }}
                    onClick={() => setSelected(null)}
                >
                    <IconArrowNarrowLeft size={25} />
                </motion.div>
                <Space w={10} />
                <Flex justify="space-between" w="100%">
                    <Group w={"100%"}>
                        <Avatar src={user.avatar} size="md" radius="xl" />
                        <Box ml={-6}>
                            <Text fw="bold" fz="md">
                                {user.name}
                            </Text>
                        </Box>
                    </Group>
                    {isMobile ? <PrivateChatMenu user={user} /> : null}
                </Flex>
            </Flex>
            <Divider mt="md" size="xs" color="gray.7" />
            <Box
                px={10}
                pt={0}
                sx={{
                    overflowY: "scroll",
                    height: "calc(100vh - 237px)",

                    /* ===== Scrollbar CSS ===== */
                    /* Firefox */
                    scrollbarColor: `${theme.colors.gray[8]} transparent`,
                    scrollbarWidth: "thin",
                    /* Chrome, Edge, and Safari */
                    "&::-webkit-scrollbar": {
                        width: "5px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: theme.colors.gray[8],
                        borderRadius: theme.radius.md,
                    },
                }}
                ref={scrollRef}
            >
                {messages.map((message, index) => (
                    <Box key={index} mb={10}>
                        <Message message={message} username={user.name} />
                    </Box>
                ))}
            </Box>
            <Divider mb="xs" size="xs" color="gray.7" />
            <Box>
                <Flex justify="space-between" gap={10} align="center">
                    <Input
                        sx={(theme: MantineTheme) => ({
                            // change outline color on focus
                            "&:focus": {
                                outline: `1px solid ${theme.colors.orange[6]} !important`,
                                outlineOffset: 2,
                            },
                        })}
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage({
                                    id: 1,
                                    message: message,
                                    time: "12:00",
                                    from: "me",
                                });
                            }
                        }}
                        w="100%"
                    />
                    <Button
                        variant="outline"
                        color="gray"
                        size="xs"
                        onClick={() => {
                            sendMessage({
                                id: 1,
                                message: message,
                                time: "12:00",
                                from: "me",
                            });
                        }}
                    >
                        <IconSend size={20} />
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

function Message({ message, username }: { message: any; username: string }) {
    const theme = useMantineTheme();
    return (
        <Box>
            <Flex justify={message.from === "me" ? "flex-end" : "flex-start"}>
                <Box
                    p={10}
                    bg={message.from === "me" ? "gray.9" : "gray.8"}
                    sx={{
                        borderRadius: theme.radius.md,
                        maxWidth: "500px",
                        wordWrap: "break-word",
                    }}
                >
                    {/* name and message */}
                    <Flex justify="space-between">
                        <Text fz="xs" color="gray.5">
                            {message.from === "me" ? "Me" : username}
                        </Text>
                        <Space w={20} />
                        <Text fz="xs" color="gray.5">
                            {message.time}
                        </Text>
                    </Flex>
                    <Text fz="sm">{message.message}</Text>
                </Box>
            </Flex>
        </Box>
    );
}
