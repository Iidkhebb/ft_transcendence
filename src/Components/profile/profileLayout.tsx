import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Image as MantineImage,
    MantineTheme,
    Space,
    Title,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useMantineTheme, Flex } from "@mantine/core";
// import Header from "./header";

import { AppShell, Text } from "@mantine/core";
import HeaderDashboard from "../dashboard/header";
import store from "@/store/store";

interface props {}
export function ProfileLayout({}: props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        setProfile(store.getState().profile.user);
        store.subscribe(() => {
            setProfile(store.getState().profile.user);
        });
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
            header={<HeaderDashboard />}
        >
            <Container size="xl">
                <Grid gutter="md">
                    <Grid.Col xs={12}>
                        <Space h={100} />
                        <Box p={20} bg={"gray.8"}>
                            <UserSection profile={profile} />
                        </Box>
                    </Grid.Col>
                    {/* <Grid.Col
                        xs={12}
                        md={6}
                        sx={(Theme: MantineTheme) => {
                            return {
                                // transform: "translateY(-40%)",
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
                    </Grid.Col> */}
                    {/* <Grid.Col
                        xs={12}
                        md={6}
                        sx={(Theme: MantineTheme) => {
                            return {
                                // transform: "translateY(-40%)",
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
                    </Grid.Col> */}
                </Grid>
            </Container>
        </AppShell>
    );
}

function UserSection({ profile }: { profile: any }) {
    return (
        <Flex
            sx={(Theme: MantineTheme) => {
                return {
                    background: "transparent",
                };
            }}
            px={20}
            direction={"column"}
        >
            <Box
                sx={(theme: MantineTheme) => ({
                    height: "auto",
                    width: "fit-content",
                    borderRadius: "100%",
                    display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    flexDirection: "column",
                })}
            >
                <UserInfo profile={profile} />
            </Box>
        </Flex>
    );
}

function UserInfo({ profile }: { profile: any }) {
    return (
        <Box>
            <Avatar
                src={profile?.avatarUrl}
                size="150px"
                radius="xl"
                sx={(theme: MantineTheme) => ({
                    transform: "translateY(10px)",
                    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                        width: "100px !important",
                    },
                    [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                        width: "100px !important",
                    },
                })}
            />

            <Space h={25} />
            <Title
                color="gray.0"
                order={2}
                sx={(theme: MantineTheme) => ({
                    fontSize: "1.5rem",
                    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                        fontSize: "1.2rem",
                    },
                    [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                        fontSize: "1rem",
                    },
                })}
            >
                {profile?.name}
            </Title>
            <Text
                color="gray.4"
                fz={{
                    
                    span: "0.7rem",
                    xs: "0.8rem",
                    sm: "0.9rem",
                    md: "1rem",
                }}
                // sx={(theme: MantineTheme) => ({
                //     fontSize: "1rem",
                //     [theme.fn.smallerThan(theme.breakpoints.sm)]: {
                //         fontSize: "0.8rem",
                //     },
                //     [theme.fn.smallerThan(theme.breakpoints.xs)]: {
                //         fontSize: "0.7rem",
                //     },
                // })}
            >
                @{profile?.username}
            </Text>
        </Box>
    );
}
