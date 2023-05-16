import { useRouter } from "next/router";
import React from "react";

export default function callback() {
    const router = useRouter();
    const { code } = router.query;

    return <div>
        {/* code  */}
        {code}
    </div>;
}
