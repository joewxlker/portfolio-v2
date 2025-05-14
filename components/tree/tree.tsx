import { buildFileTree, loadRepoTree } from "@/lib/github";
import { FC } from "react";
import { TreeNodeItem } from "./treeNodeItem";
import Image from "next/image";

export const TreeView: FC<{ owner: string, repo: string }> = async ({ owner, repo }) => {
    const files = await loadRepoTree(owner, repo, "main");
    const tree = buildFileTree(files);

    return (
        <nav className="flex flex-col items-end primary-border-b px-5 py-2">
            <input id="menu-toggle" type="checkbox" defaultChecked={true} className="peer hidden z-30"/>
            <label htmlFor="menu-toggle" className="z-30 cursor-pointer p-2 lg:hidden w-full flex flex-row justify-end">
                <Image src="/icons/bars.svg" className="dark:invert" alt="" height={20} width={20} />
            </label>
            <ul className="w-full lg:block hidden">
                {tree.children.map(node => (
                    <TreeNodeItem key={node.id} node={node} owner={owner} repo={repo}/>
                ))}
            </ul>
            <div className="peer-checked:opacity-0 peer-checked:pointer-events-none absolute top-0 inset-0 lg:hidden z-20 bg-container dark:bg-container-d py-12 backdrop-blur-lg transition-opacity duration-300">
                <ul className="lg:hidden block">
                    {tree.children.map(node => (
                        <TreeNodeItem key={node.id} node={node} owner={owner} repo={repo}/>
                    ))}
                </ul>
            </div>
        </nav>
    )
}