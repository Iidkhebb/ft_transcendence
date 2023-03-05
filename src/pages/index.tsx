import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import { Box, Button, createStyles, Title, Text, Flex } from "@mantine/core";
import { HeaderBar } from "@/Components/home_page/Header";
import HeadComponent from "@/Components/home_page/Head";
import { HeroSection } from "@/Components/home_page/HeroSection";
import { Features } from "@/Components/home_page/Features";
import { Footer } from "@/Components/home_page/Footer";
import { useRive } from "@rive-app/react-canvas";

// const inter = Inter({ subsets: ["latin"] });

// const nav_bar_links = [
//     {
//         link: "/",
//         label: "Home",
//     },
//     {
//         link: "/about",
//         label: "About",
//     },
//     {
//         link: "/team",
//         label: "Team",
//     },
// ];

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

    container_scene: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        // background: ''
    },

    dom_content: {
        position: "relative",
        zIndex: -1,
        width: "100%",
        height: "100%",
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
}));

import { Scene } from "@/Components/scene";

function LoadingIcon() {
    const { classes, cx } = useStyles();
    const { RiveComponent } = useRive({
        src: "/loading.riv",
        autoplay: true,
    });

    return (
        <Box className={classes.container}>
            <Box w="150px" h="150px">
                <RiveComponent />
            </Box>
        </Box>
    );
}

export default function Home() {
    const { classes, cx } = useStyles();

    // const header_height = 80;

    return (
        <Suspense fallback={<LoadingIcon />}>
            <Box className={cx(classes.container, classes.animation_apperance)}>
                <Box className={classes.container_scene}>
                    <Scene />
                </Box>
                <Box className={classes.dom_content}>
                    <HeadComponent
                        title="70sPong"
                        description="70sPong"
                        keywords="70sPong"
                        icon="/favicon.svg"
                    />
                    {/* <HeaderBar links={nav_bar_links} h={header_height} />
                        <HeroSection />
                        <Features 
                            title="Features"
                            description="Multiplayer, classic gameplay, real-time, customizable settings, leaderboard, user-friendly interface, responsive controls."
                        />
                    <Footer /> */}
                    {/* <HomePage /> */}
                </Box>
            </Box>
        </Suspense>
    );
}

// https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/bb4fe458410711.59fb24572561f.png
