import { DirectoryNode, FileNode } from "@/lib/github"
import Link from "next/link"
import { FC } from "react"
import { DirectoryItem } from "./directoryItem"

export const TreeNodeItem: FC<{ node: DirectoryNode | FileNode, owner: string, repo: string }> = ({ node, owner, repo }) => {
    if (node.type === "file") {
        return (
            <li className="list-none pl-4 w-full">
                <div className="pl-2 dark:hover:bg-container/10 hover:bg-container-d/10 rounded-md">
                    <Link scroll={false} href={`/code/${owner}/${repo}?url=${node.url}&lang=${node.lang}`}>
                        <p className="font-thin text-slate-700 dark:text-slate-400 overflow-ellipsis text-lg">{node.name}</p>
                    </Link>
                </div>
            </li>
        )
    }

    return (
        <DirectoryItem 
            node={node} 
            owner={owner} 
            repo={repo}/>
    )
}