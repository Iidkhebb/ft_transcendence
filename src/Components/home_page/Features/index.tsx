import { ThemeIcon, Text, Title, Container, SimpleGrid, useMantineTheme, createStyles, Box } from "@mantine/core";
import { IconBrandSocketIo, IconMessageCircle2, IconUser, IconAdjustmentsHorizontal, IconLock, type Icon } from "@tabler/icons-react";

export const DATA = [
    {
        icon: IconBrandSocketIo,
        title: "Real-time multiplayer gameplay",
        description: "Players can challenge each other to live games and play in real-time.",
    },
    {
        icon: IconUser,
        title: "Matchmaking system",
        description: "The website could have a matchmaking system that pairs players based on their skill levels or preferences.",
    },
    {
        icon: IconMessageCircle2,
        title: "Chat functionality",
        description: "Players could chat with each other during gameplay, either in a general chat or in private messages.",
    },
    {
        icon: IconLock,
        title: "Customization options",
        description: "Players could have the option to customize their avatars, game settings, and other features.",
    },
    {
        icon: IconAdjustmentsHorizontal,
        title: "Two-factor authentication",
        description: "For added security, players could have the option to enable two-factor authentication when logging in.",
    },
];

interface FeatureProps {
    icon: Icon;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
    const theme = useMantineTheme();
    return (
        <Box sx={{
            textAlign: "center",
            borderRadius: 10,
            padding: 20,
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            boxShadow: theme.colorScheme === "dark" ? "0 0 0 1px rgba(255, 255, 255, 0.1)" : "0 0 0 1px rgba(0, 0, 0, 0.1)",
        }}
        >
            <ThemeIcon variant="filled" size={40} radius={40}>
                <Icon size={20} stroke={1.5} color={theme.colors.gray[3]} />
            </ThemeIcon>
            <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
            <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </Box>
    );
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    title: {
        color: theme.colors.gray[0],
        fontFamily: `LuckiestGuy-Regular`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: "center",

        [theme.fn.smallerThan("sm")]: {
            fontSize: 28,
            textAlign: "left",
        },
    },

    description: {
        textAlign: "center",

        [theme.fn.smallerThan("sm")]: {
            textAlign: "left",
        },
    },
}));

interface FeaturesGridProps {
    title: React.ReactNode;
    description: React.ReactNode;
    data?: FeatureProps[];
}

export function Features({ title, description, data = DATA }: FeaturesGridProps) {
    const { classes, theme } = useStyles();
    const features = data.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <Title className={classes.title}>{title}</Title>

            <Container size={560} p={0}>
                <Text size="sm" className={classes.description}>
                    {description}
                </Text>
            </Container>

            <SimpleGrid
                mt={60}
                cols={3}
                spacing={theme.spacing.xl * 2}
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: "xl" },
                    { maxWidth: 755, cols: 1, spacing: "xl" },
                ]}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}
