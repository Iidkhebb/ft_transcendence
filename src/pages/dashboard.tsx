import { Box, Grid } from "@mantine/core";
import { DashboardLayout } from "@/Components/dashboard/dashboard_layout";
import { Head } from "@/Components/head";

export default function Dashboard() {
    // const classes = useStyles();
    return (
        <>
        <Head title="70sPong - dashboard" description="70sPong" keywords="70sPong" icon="/favicon.svg" />
        <Box w="100%" h={'100vh'}>
            <DashboardLayout />
        </Box>
        </>
    );
}
