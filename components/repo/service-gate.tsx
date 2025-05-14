import { GithubRepo, loadPublicRepos, USERNAME } from "@/lib/github";
import { ReactNode } from "react";

export const RepoServiceGate = async ({ children }: { children: (repos: GithubRepo[]) => ReactNode }) => {
    const repos = await loadPublicRepos(USERNAME)
        .catch(console.error);

    if(repos){
        return children(repos);
    }

    return (
        <div className="flex flex-col items-center gap-3 border-container rounded-2xl py-30 w-full">
            <h3 className="text-xl text-white">Unable to show github repositories</h3>
            <p>🚧 Github data unavailable.</p>
        </div>
    )
}