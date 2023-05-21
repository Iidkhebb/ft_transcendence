import { forwardRef } from "react";
import { IconChevronRight, IconExternalLink, IconLogout, IconPacman } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton, rem } from "@mantine/core";
import Link from "next/link";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.md,
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500} transform="capitalize">
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <IconChevronRight size="1rem" />}
            </Group>
        </UnstyledButton>
    )
);

function UserButtonMenu() {
    const user = {
        image: "https://cdn.intra.42.fr/users/15beaf14c3ddf394270275669e105d65/roudouch.jpg",
        name: "Rachid oudouch",
        email: "Rashidoudouch@gmail.com",
    };

    return (
        <Group position="center">
            <Menu withArrow>
                <Menu.Target>
                    <UserButton image={user.image} name={user.name} email={user.email} />
                </Menu.Target>
                <Menu.Dropdown>
                    <Link href="/profile" style={{
                        textDecoration: "none"
                    }}>
                        <Menu.Item icon={<IconPacman size={rem(14)} />}>My account</Menu.Item>
                    </Link>

                    <Menu.Item
                        component="a"
                        href="/logout"
                        target="_blank"
                        icon={<IconLogout size={rem(14)} />}
                        color="red"
                    >
                        Log out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default UserButtonMenu;
