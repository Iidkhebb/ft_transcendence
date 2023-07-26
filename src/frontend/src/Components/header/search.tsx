import React from "react";
import { ActionIcon, Box, Flex, Paper, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { spotlight } from "@mantine/spotlight";

export function Search() {
    return (
        <Paper bg="none" radius={130} shadow="md" withBorder sx={{ overflow: "hidden", cursor: "pointer" }} onClick={() => spotlight.open()}>
            <Flex align="center">
                <ActionIcon variant="transparent" p={8} color="dark" radius={100} size="45">
                    <IconSearch size={23} />
                </ActionIcon>
                <Box top="50%" left="50%" p="sx" w={"300px"}>
                    <Text size="sm" weight={"bold"}>
                        Search
                    </Text>
                </Box>
            </Flex>
        </Paper>
    );
}
