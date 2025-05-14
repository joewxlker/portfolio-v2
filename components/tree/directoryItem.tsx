"use client";

import { DirectoryNode } from "@/lib/github";
import Image from "next/image";
import { FC, useState } from "react";
import { TreeNodeItem } from "./treeNodeItem";

export const DirectoryItem: FC<{ node: DirectoryNode, owner: string, repo: string }> = ({ node, owner, repo }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="list-none pl-4 w-full flex flex-col">
            <button className="font-semibold dark:hover:bg-container/10 hover:bg-container-d/10 rounded-md px-2 text-left flex flex-row gap-2 items-center overflow-ellipsis text-lg text-slate-700 dark:text-slate-400 cursor-pointer" onClick={() => setOpen(!open)}>
                <Image src="/icons/chevron_white.svg" className={!open ? "rotate-0 translate-y-[2px] invert dark:invert-0" : "rotate-90 translate-y-[2px] invert dark:invert-0"} alt="" height={6} width={6} />
                {node.name}
            </button>
            {open && <ul>
                {node.children.map(child => <TreeNodeItem
                    key={child.id} 
                    node={child} 
                    owner={owner} 
                    repo={repo} />)}
            </ul>}
        </li>
    )
}