import { ProfileLayout } from "@/Components/profile/profileLayout";
import React, { useEffect } from "react";
import store, { setProfile } from "@/store/store";
import api from "@/api";

export default function Profile() {
    useEffect(() => {
        api.get("/user/profile")
            .then((res: any) => {
                if (res.status == 200) store.dispatch(setProfile(res.data));
            })
            .catch((err: any) => {
                // console.log(err);
            });
    }, []);

    return <ProfileLayout />;
}
