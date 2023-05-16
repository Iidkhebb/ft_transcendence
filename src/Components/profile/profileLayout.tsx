import { Box, Container, Grid, MantineTheme, Space, Title } from "@mantine/core";
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
                    <Grid.Col xs={12}>
                        <Box
                            style={{
                                height: 300,
                                background:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[7]
                                        : theme.colors.gray[0],
                            }}
                        />
                        <Flex
                            sx={(Theme: MantineTheme) => {
                                return {
                                    transform: "translateY(-45%)",
                                };
                            }}
                            align={"center"}
                            justify={"center"}
                            direction={"column"}
                        >
                            <Box
                                sx={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: "100%",

                                    background: "gray.0",
                                }}
                            />
                            <Space h={10} />
                            <Title order={2} style={{ marginLeft: 20 }}>
                                {"Rachid Oudouch"}
                            </Title>

                        </Flex>
                    </Grid.Col>
                    <Grid.Col
                        xs={12}
                        md={6}
                        sx={(Theme: MantineTheme) => {
                            return {
                                transform: "translateY(-40%)",
                            };
                        }}
                    >
                        <Box
                            style={{
                                height: 200,
                                background:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[7]
                                        : theme.colors.gray[0],
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col
                        xs={12}
                        md={6}
                        sx={(Theme: MantineTheme) => {
                            return {
                                transform: "translateY(-40%)",
                            };
                        }}
                    >
                        <Box
                            style={{
                                height: 200,
                                background:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[7]
                                        : theme.colors.gray[0],
                            }}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </AppShell>
    );
}
