import { Box } from "@mantine/core";

export function Dashboard() {
    // const classes = useStyles();
    return (
        <Box>
            <DashboardLayout />
        </Box>
    );
}

import { useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
import Header from "./header";

function DashboardLayout() {
    const theme = useMantineTheme();
    return (
        <Box bg='yellow'>
            <Header />
            <Flex style={{ height: "calc(100vh - 60px)" }}>
                <Box
                    sx={{ backgroundColor: "red", height: "100%" }}
                    w={{
                        span: "0%",
                        sm: "40%",
                        lg: "30%",
                    }}
                ></Box>
                <Box sx={{ backgroundColor: "blue", height: "100%" }} w={"100%"}></Box>
            </Flex>
        </Box>
    );
}
