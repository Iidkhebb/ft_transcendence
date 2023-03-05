import { Box, Container, Stack, Text, createStyles } from "@mantine/core";
import { Logo } from "@/Components/home_page/Header";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.gray[9],
        width: "100%",
    },
    container: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
    },
    description: {
        textAlign: "center",
    },
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <Box className={classes.root}>
            <Container size="lg" className={classes.container}>
                <Stack dir="column" spacing="xl">
                    <Logo />
                    <Text size="sm" className={classes.description}>
                        © 2023 70sPong. All rights reserved.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}
