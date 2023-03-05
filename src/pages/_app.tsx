import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, MantineTheme, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useState } from "react";

import { useHotkeys, useLocalStorage } from "@mantine/hooks";

export default function App({ Component, pageProps }: AppProps) {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    };

    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    colorScheme: "dark",
                    // primaryColor: colorScheme === "dark" ? "orange" : "orange",
                    primaryColor: "red",
                    colors: {
                        // @ts-ignore
                        deepPurple: "#120428",
                        // dark: [
                        //     "#d5d7e0",
                        //     "#acaebf",
                        //     "#8c8fa3",
                        //     "#666980",
                        //     "#4d4f66",
                        //     "#34354a",
                        //     "#2b2c3d",
                        //     "#120428", // background
                        //     "#0c0d21",
                        //     "#01010a",
                        // ],
                    },
                }}
                withGlobalStyles
                withNormalizeCSS
                inherit
            >
                <Component {...pageProps} />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
