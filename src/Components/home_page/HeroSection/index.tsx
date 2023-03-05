import { createStyles, Overlay, Container, Title, Button, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    hero: {
        position: "relative",
        backgroundImage: "url('https://image.api.playstation.com/vulcan/ap/rnd/202206/3010/zgM0xJ9yIdtxDAujCFBKBnCh.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    container: {
        height: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: theme.spacing.xl * 6,
        zIndex: 1,
        position: "relative",

        [theme.fn.smallerThan("sm")]: {
            height: 500,
            paddingBottom: theme.spacing.xl * 3,
        },
    },

    title: {
        textAlign: 'center',
        color: theme.white,
        fontSize: 50,
        fontWeight: 400,
        lineHeight: 1.1,
        fontFamily: `LuckiestGuy-Regular`,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan("xs")]: {
            fontSize: 28,
            lineHeight: 1.3,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,
        textAlign: "center",

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
            fontSize: theme.fontSizes.sm,
        },
    },

    control: {
        marginTop: theme.spacing.xl * 1.5,

        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
    },
}));

export function HeroSection() {
    const { classes } = useStyles();

    return (
        <div className={classes.hero}>
            <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)" opacity={1} zIndex={0} />
            <Container className={classes.container}>
                <Title className={classes.title}>Get Your Paddle Ready: Play Pong Online with Friends in Real-Time!</Title>
                <Text className={classes.description} size="xl" mt="xl">
                    Experience the classic game of Pong from the 70s and relive the nostalgia of arcade gaming. Play against your friends in multiplayer mode and enjoy
                     </Text>

                <Button
                    variant="gradient"
                    gradient={{
                        from: "red",
                        to: "pink",
                        deg: 60,
                    }}
                    size="xl"
                    radius="lg"
                    className={classes.control}
                    rightIcon={<IconArrowNarrowRight />}
                    uppercase
                >
                    Play now
                </Button>
            </Container>
        </div>
    );
}