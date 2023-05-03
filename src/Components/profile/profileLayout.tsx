import { Box, Container, Grid } from "@mantine/core";
import { useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
// import Header from "./header";

import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger } from "@mantine/core";
import HeaderDashboard from "../dashboard/header";

export function ProfileLayout() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            // navbar={
            //     <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, md: 300, lg: 400 }}>
            //         {/* <Chat /> */}
            //     </Navbar>
            // }
            //   aside={
            //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //         <Text>Application sidebar</Text>
            //       </Aside>
            //     </MediaQuery>
            //   }
            //   footer={
            //     <Footer height={60} p="md">
            //       Application footerÍ
            //     </Footer>
            //   }
            header={<HeaderDashboard />}
        >
            <Container size="xl">
                <Grid gutter="md">
                    <Grid.Col xs={12} md={6}>
                        <Box
                            style={{
                                height: 200,
                                background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} md={6}>
                        <Box
                            style={{
                                height: 200,
                                background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} md={6}>
                        <Box
                            style={{
                                height: 200,
                                background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
                            }}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </AppShell>
    );
}
