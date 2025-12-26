"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterWrapper() {
    const pathname = usePathname();
    const isResume = pathname === "/resume";

    if (isResume) return null;

    return <Footer />;
}
