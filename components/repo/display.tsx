import { getArcStyle } from "@/lib/arc";
import { GithubRepo } from "@/lib/github"
import Link from "next/link";
import { FC } from "react"

export const RepositoryDisplay = async ({ repos }: { repos: GithubRepo[] }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center py-5">
            {repos.slice(0, 5).map((repo, idx) => (<div 
                key={repo.id} 
                style={getArcStyle(Math.min(repos.length, 5), idx)}>
                    <RepositoryItem repo={repo} />
            </div>))}
        </div>
    )
}

interface RepositoryItemProps {
    repo: GithubRepo;
}
const RepositoryItem: FC<RepositoryItemProps> = ({ repo }) => (
    <Link
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block lg:w-60 w-44 p-4 bg-gradient-to-b from-background/50 to-container/50 dark:from-background-d/50 dark:to-container-d/50 border border-container rounded-2xl shadow-lg shadow-black/10 glow backdrop-blur-lg aspect-[3/4]`}>
            <div className="flex flex-col h-full w-full">
                <h3 className="mb-2 lg:text-2xl text-xl font-semibold dark:text-white text-zinc-600 truncate">{repo.name}</h3>
                <div className="flex-1">
                    <p className="mb-3 line-clamp-4">
                        {repo.description || "This repository does not have a discription"}
                    </p>
                </div>
                <div className="flex space-x-4">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                </div>
            </div>
    </Link>
);