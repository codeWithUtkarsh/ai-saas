"use client"

import { Montserrat } from "next/font/google"
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, UserCheck } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrate = Montserrat({weight: "600", subsets:["latin"]})

const routes = [
    {
        label: "Dashboard",
        icons: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icons: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icons: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icons: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icons: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icons: Code,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "MockMaster",
        icons: UserCheck,
        href: "/mockmaster",
        color: "text-purple-700"
    },
    {
        label: "Settings",
        icons: Settings,
        href: "/settings",
    },
]

const Sidebar = () => {

    const pathname =   usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="Logo" src="/logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrate.className)}>
                        Utkarsh
                    </h1>
                </Link>
                <div className="space-y-1 ">
                    {routes.map((routes) => (
                        <Link 
                            href={routes.href} 
                            key={routes.href} 
                            className={cn ("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === routes.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <routes.icons className={cn("h-5 w-5 mr-3", routes.color)}/>
                                {routes.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar