import { Box, Container, Grid, MantineTheme, Space, Title } from "@mantine/core";
import { useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
// import Header from "./header";

import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger } from "@mantine/core";
import HeaderDashboard from "../dashboard/header";

interface props {
    profile: any;
}

export function ProfileLayout({ profile }: props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    margin: 0,
                    padding: 0,
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
                                sx={(theme: MantineTheme) => ({
                                    height: 200,
                                    width: 200,
                                    borderRadius: "100%",
                                    background: `url(${profile?.avatarUrl}) no-repeat center center / cover`,
                                    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                                        height: 140,
                                        width: 140,
                                    },
                                    [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                                        height: 120,
                                        width: 120,
                                    },
                                })}
                            />
                            <Space h={10} />
                            <Title color="gray.0" order={2} style={{ marginLeft: 20 }}>
                                {profile?.name}
                            </Title>
                            <Text color="gray.4" fz='sm' style={{ marginLeft: 20 }}>
                                @{profile?.username}
                            </Text>
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
