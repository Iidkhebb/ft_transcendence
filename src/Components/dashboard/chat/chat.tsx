import { Box, Navbar, SegmentedControl, Tabs } from "@mantine/core";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Chat() {
    const [value, setValue] = useState("Messages");

    useEffect(() => {
        console.log(value);
    }, [value]);
    const list = { hidden: { opacity: 0 } }
    const item = { hidden: { x: -10, opacity: 0 } }
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
                
                    chats

            </Navbar.Section>
        </Box>
    );
}
