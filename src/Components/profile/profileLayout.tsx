import { Box, Container, Grid, Image, MantineTheme, Space, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
// import Header from "./header";

import { AppShell, Text } from "@mantine/core";
import HeaderDashboard from "../dashboard/header";
import { extractColors } from "extract-colors";
interface props {
    profile: any;
}

export function ProfileLayout({ profile }: props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        // extractColors(profile?.avatarUrl).then(console.log).catch(console.error);
    }, []);

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
                                    height: "auto",
                                    borderRadius: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                })}
                            >
                                <Image
                                    src="/levels/level1.png"
                                    sx={(theme: MantineTheme) => ({
                                        width: "150px !important",
                                        transform: "translateY(10px)",
                                        [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                                            width: "100px !important",
                                        },
                                        [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                                            width: "100px !important",
                                        },
                                    })}
                                />
                                <Box
                                    sx={(theme: MantineTheme) => ({
                                        borderRadius: "100%",
                                        border: `4px solid ${theme.colors.gray[0]}`,
                                        height: 200,
                                        width: 200,
                                        padding: "4px",
                                        [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                                            height: 140,
                                            width: 140,
                                        },
                                        [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                                            height: 120,
                                            width: 120,
                                        },
                                    })}
                                >
                                    <Box
                                        sx={(theme: MantineTheme) => ({
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "100%",
                                            // border: `6px solid ${theme.colors.gray[0]}`,
                                            // padding: '10px',
                                            background: `url(${profile?.avatarUrl}) no-repeat center center / cover`,
                                        })}
                                    />
                                </Box>
                                {/* <Image src='/artch/wings.svg' sx={(theme: MantineTheme) => ({
                                    width: '300px !important',
                                    position: 'relative',
                                    top: '-230px',
                                    left: '-50px',
                                })}  /> */}
                            </Box>

                            {/* Avatar */}
                            {/* <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: '300px !important',
                                }}
                            >
                                <Image
                                    src={profile?.avatarUrl}
                                    alt="demo-clip-path"
                                    width="130"
                                    height="130"
                                    sx={{
                                        WebkitClipPath: 'url("#hex")',
                                        clipPath: 'url("#hex")',
                                        transform: 'scale(1.3)',
                                    }}
                                />
                                <svg height="0" width="0">
                                    <clipPath id="hex">
                                        <path d="M59 2.8867513459481a10 10 0 0 1 10 0l45.425625842204 26.226497308104a10 10 0 0 1 5 8.6602540378444l0 52.452994616207a10 10 0 0 1 -5 8.6602540378444l-45.425625842204 26.226497308104a10 10 0 0 1 -10 0l-45.425625842204 -26.226497308104a10 10 0 0 1 -5 -8.6602540378444l0 -52.452994616207a10 10 0 0 1 5 -8.6602540378444"></path>
                                    </clipPath>
                                </svg>
                            </Box> */}

                            <Space h={10} />
                            <Title color="gray.0" order={2} style={{ marginLeft: 20 }}>
                                {profile?.name}
                            </Title>
                            <Text color="gray.4" fz="sm" style={{ marginLeft: 20 }}>
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
