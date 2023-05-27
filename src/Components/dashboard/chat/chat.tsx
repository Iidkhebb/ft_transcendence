import { Box, Navbar, SegmentedControl } from "@mantine/core";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { ListChats } from "./components/ListChats";

export default function Chats({ setChat }: { setChat: (chat: ReactElement) => void }) {
    const [value, setValue] = useState("Messages");

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <Box w={"100%"} h="100%" p="md">
            <Navbar.Section>
                <SegmentedControl
                    fullWidth
                    value={value}
                    onChange={setValue}
                    data={[
                        { value: "Messages", label: "Messages" },
                        { value: "Groups", label: "Groups" },
                    ]}
                ></SegmentedControl>

                {value === "Messages" ? <ListChats /> : <ListGroups />}
            </Navbar.Section>
        </Box>
    );
}

// function ChatContainer({ id, setSelected }: { id: number; setSelected: any }) {
//     const theme = useMantineTheme();
//     const [user, setUser] = useState(chats[id]);

//     const [messages, setMessages] = useState([
//         {
//             id: 0,
//             message: "Hello",
//             time: "12:00",
//             from: "me",
//         },
//         {
//             id: 1,
//             message: "Hello",
//             time: "12:00",
//             from: "other",
//         },
//         {
//             id: 2,
//             message: "fin awlad l9ahba? 💁👌🎍😍",
//             time: "12:00",
//             from: "me",
//         },
//     ]);

//     const [message, setMessage] = useState("");
//     const [last_message, setLastMessage] = useState<any>(null);
//     const scrollRef = useRef<any>();

//     const sendMessage = (message: any) => {
//         if (!message || message.message === "") return;
//         setMessages([...messages, message]);
//         setMessage("");

//         // // scroll to bottom
//         // //get the last message
//         // const lastMessage = scrollRef.current.lastElementChild;

//         // // scroll to the last message
//         // lastMessage.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         //get the last message
//         const lastMessage = scrollRef.current.lastElementChild;

//         // scroll to the last message
//         lastMessage.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     return (
//         <Box>
//             <Flex p={10} pt={20}>
//                 <motion.div
//                     animate={{ opacity: 1 }}
//                     transition={{
//                         duration: 0.1,
//                     }}
//                     initial={{
//                         opacity: 0,
//                         scale: 1,
//                         background: "transparent",
//                         borderRadius: theme.radius.md,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }}
//                     whileHover={{
//                         scale: 1.2,
//                         background: theme.colors.gray[9],
//                         borderRadius: theme.radius.md,
//                     }}
//                     onClick={() => setSelected(null)}
//                 >
//                     <IconArrowNarrowLeft size={25} />
//                 </motion.div>
//                 <Flex justify="space-between" w="100%">
//                     <Group w={"100%"}>
//                         <Avatar src={user.avatar} size="sm" radius="xl" />
//                         <Box ml={-6}>
//                             <Text fz="md">{user.name}</Text>
//                         </Box>
//                     </Group>
//                     <PrivateChatMenu />
//                 </Flex>
//             </Flex>
//             <Divider my="xs" size="xs" color="gray.7" />
//             <Box
//                 p={10}
//                 pt={0}
//                 sx={{
//                     overflowY: "scroll",
//                     height: "calc(100vh - 300px)",
//                 }}
//                 ref={scrollRef}
//             >
//                 {messages.map((message, index) => (
//                     <Box key={index} mb={10}>
//                         <Message message={message} username={user.name} />
//                     </Box>
//                 ))}
//             </Box>
//             <Divider my="xs" size="xs" color="gray.7" />
//             <Box p={10}>
//                 <Flex justify="space-between" gap={10} align="center">
//                     <Input
//                         placeholder="Type a message..."
//                         value={message}
//                         onChange={(e) => setMessage(e.currentTarget.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 sendMessage({
//                                     id: 1,
//                                     message: message,
//                                     time: "12:00",
//                                     from: "me",
//                                 });
//                             }
//                         }}
//                         w="100%"
//                     />
//                     <Button
//                         variant="outline"
//                         color="gray"
//                         size="xs"
//                         onClick={() => {
//                             sendMessage({
//                                 id: 1,
//                                 message: message,
//                                 time: "12:00",
//                                 from: "me",
//                             });
//                         }}
//                     >
//                         <IconSend size={20} />
//                     </Button>
//                 </Flex>
//             </Box>
//         </Box>
//     );
// }

// function Message({ message, username }: { message: any; username: string }) {
//     const theme = useMantineTheme();
//     return (
//         <Box>
//             <Flex justify={message.from === "me" ? "flex-end" : "flex-start"}>
//                 <Box
//                     p={10}
//                     bg={message.from === "me" ? "gray.9" : "gray.8"}
//                     sx={{
//                         borderRadius: theme.radius.md,
//                         maxWidth: "60%",
//                         wordWrap: "break-word",
//                     }}
//                 >
//                     {/* name and message */}
//                     <Flex justify="space-between">
//                         <Text fz="xs" color="gray.5">
//                             {message.from === "me" ? "Me" : username}
//                         </Text>
//                         <Space w={20} />
//                         <Text fz="xs" color="gray.5">
//                             {message.time}
//                         </Text>
//                     </Flex>
//                     <Text fz="sm">{message.message}</Text>
//                 </Box>
//             </Flex>
//         </Box>
//     );
// }

function ListGroups() {
    return (
        <Box w={"100%"} h="100%" p="md">
            <Navbar.Section>Groups</Navbar.Section>
        </Box>
    );
}
