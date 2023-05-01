import React from "react";
import { Box, Header, MediaQuery, Burger, Text, useMantineTheme } from "@mantine/core";


export default function HeaderDashboard() {
    const [opened, setOpened] = React.useState(false);
    const theme = useMantineTheme();

    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Text>Dashboard header</Text>
            </div>
        </Header>
    );
}
