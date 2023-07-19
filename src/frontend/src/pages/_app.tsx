import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, MantineTheme, ColorSchemeProvider, ColorScheme, Avatar } from "@mantine/core";
import { Provider } from "react-redux";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import store from "@/store/store";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { useEffect, useState } from "react";
import socket from "@/socket";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import SocketComponent from "@/socket/SocketComponent";

export default function App({ Component, pageProps }: AppProps) {
    // const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    //     key: "mantine-color-scheme",
    //     defaultValue: "light",
    //     getInitialValueInEffect: true,
    // });

    // const toggleColorScheme = (value?: ColorScheme) => {
    //     setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    // };

    // useHotkeys([["mod+J", () => toggleColorScheme()]]);
    const [query, setQuery] = useState("");
    const [actions, setActions] = useState<SpotlightAction[]>([]);
    const router = useRouter();

    useEffect(() => {
        socket.on("search", (data) => {
            let users: [] = [];
            if (data && data[0])
                users = data[0].map((action: any) => ({
                    icon: <Avatar size="lg" src={action.avatarUrl} />,
                    title: action.name,
                    description: action.username,
                    onTrigger: () => {
                        console.log("/profile/" + action.id);
                        router.push("/profile/" + action.id);
                    },
                }));
            setActions(users);
        });
    }, []);

    useEffect(() => {
        if (query == "") setActions([]);
        else socket.emit("search", { query: query });
    }, [query]);

    return (
        <Provider store={store}>
            {/* <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}> */}
            <MantineProvider
                theme={{
                    colorScheme: "dark",
                    primaryColor: "gray",
                }}
                withGlobalStyles
                withNormalizeCSS
                inherit
            >
                <SocketComponent />
                <SpotlightProvider
                    actions={actions}
                    query={query}
                    onQueryChange={setQuery}
                    searchIcon={<IconSearch size="1.2rem" />}
                    searchPlaceholder="Search..."
                    shortcut="mod + s"
                    nothingFoundMessage="Nothing found..."
                    closeOnEscape
                    closeOnClickOutside
                >
                    <Component {...pageProps} />
                    {/* </ColorSchemeProvider> */}
                </SpotlightProvider>
            </MantineProvider>
        </Provider>
    );
}
