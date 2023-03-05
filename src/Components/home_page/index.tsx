import React from "react";
import { Box, Flex, Text, Button, createStyles, Title} from "@mantine/core";


const useStyles = createStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        // background: "url('/images/background.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
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
        color: theme.colors.grape[8],
        fontFamily: `valorax`,
        fontSize: 90,

        /* mobile */
        "@media (max-width: 768px)": {
            fontSize: 30,
        },
    },

    play_now_button: {
        marginTop: 20,
        padding: "0px 50px",
        border: "2px solid white",
        fontFamily: "GrandGalaxy",

        "@keyframes btn": {
            "0%": {
                boxShadow: "0px 0px 15px 0px " + theme.colors.grape[1],
            },
            "50%": {
                boxShadow: "0px 0px 15px 8px " + theme.colors.grape[1],
            },
            "100%": {
                boxShadow: "0px 0px 15px 0px " + theme.colors.grape[1],
            },
        },

        "&:hover": {
            animation: "btn 1s infinite",
        },

        /* mobile */
        "@media (max-width: 500px)": {
            width: "100%",
        },
    },
}));

export function HomePage() {
    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <Flex className={classes.animation_apperance} direction="column" align="center" justify="center" w="100vw" p={20}>
                <Box className={classes.title}>
                    <Title className={classes.text}>
                        70
                        <Text inherit component="span" className={classes.span}>
                            s
                        </Text>
                        Pong
                    </Title>
                </Box>

                <Button size="lg" className={classes.play_now_button} variant="outline" color="gray.0" uppercase radius={10}>
                    Play Now
                </Button>
            </Flex>
        </Box>
    );
}
