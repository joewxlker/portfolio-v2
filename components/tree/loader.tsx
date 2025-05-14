import Image from "next/image";

export const CodeTreeLoader = () => {
    const items = [
      "src",
      "public",
      ".env.example",
      ".gitignore",
      "README.md",
      "next.config.js",
      "package-lock.json",
      "package.json",
      "postcss.config.js",
      "prettier.config.js",
      "tsconfig.json"
    ];

    return (
      <div role="status" className="flex flex-col items-end primary-border-b px-5 py-2 font-loader">
        <ul className="w-full lg:block hidden">
          {items.map(node => (
            <li key={node} className="list-none px-5 w-full">
              <div>
                  <p className="pl-2 font-thin text-slate-700 dark:text-slate-400 overflow-ellipsis text-lg">{node}</p>
              </div>
          </li>))}
        </ul>
        <div className="p-2 lg:hidden w-full flex flex-row justify-end">
            <Image src="/icons/spinner.svg" className="animate-spin dark:invert opacity-50" alt="" height={20} width={20} />
        </div>
      </div>
    );
}