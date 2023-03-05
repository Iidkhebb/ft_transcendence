import { useState } from "react";
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Title, Box, Image, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    root: {
        position: "relative",
        zIndex: 999,
        background: "transparent",
    },
    dropdown: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
    },

    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        height: 40,
    },
    iconText: {
        color: theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[9],
        fontSize: "25px",
        fontWeight: 500,
        fontFamily: "LuckiestGuy-Regular",
        paddingTop: "6px",
        paddingRight: "2px",
    },
    span: {
        fontSize: "15px",
        fontFamily: "LuckiestGuy-Regular",
        paddingRight: "1px",
    },
}));

interface HeaderResponsiveProps {
    links: { link: string; label: string }[];
    h: number;
}

export function HeaderBar({ links, h }: HeaderResponsiveProps) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link && 0,
            })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                close();
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={h} className={classes.root}>
            <Container className={classes.header} size={1300}>
                <Logo />
                <Group spacing={5} className={classes.links}>
                    {items}
                    <Box>
                        <Button color="red" variant="gradient" size="sm" gradient={{ from: "red", to: "pink" }}>
                            Sign Up
                        </Button>
                    </Box>
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="slide-down" duration={300} mounted={opened} timingFunction="ease">
                    {(styles) => (
                        <Paper
                            className={classes.dropdown}
                            withBorder
                            style={styles}
                            sx={{
                                top: h,
                            }}
                        >
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}

export function Logo() {
    const { classes, cx } = useStyles();

    return (
        <Box className={classes.icon}>
            <Image src="/favicon.svg" width={70} height={70} />
            <Title order={1} size="lg" className={classes.iconText}>
                70
                <Text className={classes.span} component="span">
                    s
                </Text>
                Pong
            </Title>
        </Box>
    );
}
