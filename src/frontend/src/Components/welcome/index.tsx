import React, { useState } from "react";
import { Box, Flex, Text, Button, createStyles, Title, MantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Login from "./login";

const useStyles = createStyles((theme: MantineTheme) => ({
    container: {
        height: "100vh",
        width: "100vw",
    },

    animation_apperance: {
        animation: "appear 0.5s ease-in-out",
        animationFillMode: "forwards",

        "@keyframes appear": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
    },

    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    text: {
        fontFamily: `valorax`,
        fontSize: 150,
        color: "white",

        /* mobile */
        "@media (max-width: 768px)": {
            fontSize: 50,
        },
    },

    span: {
        fontFamily: `valorax`,
        fontSize: 130,
        color: "#5951BA",

        /* mobile */
        "@media (max-width: 768px)": {
            fontSize: 30,
        },
    },

    play_now_button: {
        // marginTop: 10,
        padding: "0px 50px",
        border: "2px solid white",
        fontFamily: "GrandGalaxy",

        "@keyframes btn": {
            "0%": {
                boxShadow: "0px 0px 15px 0px " + theme.colors.orange[1],
            },
            "50%": {
                boxShadow: "0px 0px 15px 8px " + theme.colors.orange[1],
            },
            "100%": {
                boxShadow: "0px 0px 15px 0px " + theme.colors.orange[1],
            },
        },

        "&:hover": {
            animation: "btn 1s infinite",
        },

        /* mobile */
        "@media (max-width: 500px)": {
            // marginTop: -5,
            padding: "0px 20px",

            border: "2px solid white",
        },
    },
}));

export function Welcome({}: {}) {
    const [loginShow, setLoginShow] = useState(false);

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
            }}
        >
            {loginShow ? (
                <Login setLoginShow={setLoginShow} />
            ) : (
                <Box>
                    <HeroSection setLoginShow={setLoginShow} />
                </Box>
            )}
        </Box>
    );
}

export default function HeroSection({ setLoginShow }: { setLoginShow: (value: boolean) => void }) {
    const { classes } = useStyles();
    const isMid = useMediaQuery("(max-width: 768px)");
    return (
        <Flex className={classes.animation_apperance} direction="column" align="center" justify="center" mih="100vh">
            <Box className={classes.title}>
                <Title className={classes.text}>
                    <Text inherit component="span" className={classes.span}>
                        x
                    </Text>
                    Pong
                </Title>
            </Box>
            <Button
                className={classes.play_now_button}
                variant="outline"
                color="gray.0"
                uppercase
                radius={10}
                size={isMid ? "sm" : "lg"}
                onClick={() => {
                    setLoginShow(true);
                }}
            >
                Play Now
            </Button>
        </Flex>
    );
}
