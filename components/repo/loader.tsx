import { getArcStyle } from "@/lib/arc"

export const RepoLoader = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center py-5 font-loader">
            {[0,0,0].map((_, idx) => (<div key={idx} style={getArcStyle(3, idx)}>
                <div className={`block lg:w-60 w-44 p-4 bg-gradient-to-b from-background/50 to-container/50 dark:from-background-d/50 dark:to-container-d/50 border border-container rounded-2xl shadow-lg shadow-black/10 glow backdrop-blur-lg aspect-[3/4]`}>
                    <div className="flex flex-col h-full w-full">
                        <h3 className="mb-2 lg:text-2xl text-xl font-semibold dark:text-white text-zinc-600 truncate">repo name</h3>
                        <div className="flex-1">
                            <p className="mb-3 line-clamp-4">
                                {"This repository does not have a discription"}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <span>⭐ 0</span>
                            <span>🍴 0</span>
                        </div>
                    </div>
                </div>
            </div>))}
        </div>
    )
}