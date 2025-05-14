import { randomUUID, UUID } from "crypto";
import { Grammar, languages } from "prismjs";

export const USERNAME = "joewxlker";

interface GithubTree {
    type: string, 
    path: string, 
    url: string
}

export class CodeFile {
    public content: string;
    public path: string;
    public language: [Grammar, string];

    constructor(data: GithubTree, content: string) {
        this.content = content;
        this.path = data.path;
        this.language = this.languageFromPath(data.path);
    }

    private languageFromPath(filePath: string): [Grammar, string] {
        const ext = filePath.split('.').pop()?.toLowerCase() || '';

        switch (ext) {
            case 'rs':
                return [languages.rust, 'rust'];
            case 'md':
                return [languages.markdown, 'markdown'];
            case 'toml':
                return [languages.toml, 'toml'];
            case 'yaml':
            case 'yml':
                return [languages.yaml, 'yaml'];
            default:
                return [languages.plain, 'plain'];
        }
    }
}

export interface FileNode {
    id: UUID,
    lang: string,
    type: 'file';
    name: string;
    url: string;
}

export interface DirectoryNode {
    id: UUID,
    lang: string,
    type: 'directory';
    name: string;         
    children: (FileNode | DirectoryNode)[];
}

const languageFromPath = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase() || '';

    switch (ext) {
        case 'rs':
            return 'rust';
        case 'md':
            return 'markdown';
        case 'toml':
            return 'toml';
        case 'yaml':
        case 'yml':
            return 'yaml';
        case 'tsx':
            return 'tsx';
        case 'jsx':
            return 'jsx';
        case 'css':
            return 'css';
        case 'js':
            return 'js';
        case 'cjs':
            return 'cjs';
        case 'json':
            return 'json';
        default:
            return 'plain';
    }
}

export const buildFileTree = (files: GithubTree[]) => {
    const root: DirectoryNode = { type: 'directory', name: '', children: [], id: randomUUID(), lang: "plaintext" };

    for (const file of files) {
        let current = root;
        const parts = file.path.split("/");

        for (const dirName of parts.slice(0, parts.length - 1)) {
            let nextDir = current.children.find((node) => 
                node.type === 'directory' && node.name === dirName
            ) as DirectoryNode | undefined;

            if (!nextDir) {
                nextDir = { 
                    id: randomUUID(),
                    type: 'directory', 
                    name: dirName, 
                    lang: 'plaintext',
                    children: [] 
                };

                current.children.unshift(nextDir);
            }

            current = nextDir;
        }

        if(file.type === 'blob'){
            current.children.push({
                id: randomUUID(),
                type: 'file',
                lang: languageFromPath(file.path),
                name: parts[parts.length - 1],
                url: file.url,
            });
        }
    }

    return root;
}

export const sortFileTree = (tree: DirectoryNode): DirectoryNode => {
    tree.children.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    });

    for (const node of tree.children) {
        if (node.type === 'directory') {
            sortFileTree(node);
        }
    }
  
    return tree;
};

export async function loadRepoTree(owner: string, repo: string, branch: string = 'main') {
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
    }

    const { tree } = await res.json() as { tree: GithubTree[] };

    return tree;
}

export const loadCodeFile = async (url: string) => {
    const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
    });
    
    if (!res.ok) {
        throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
    }

    const { content: rawContent, encoding } = await res.json();
    const content = encoding === 'base64' ? atob(rawContent.replace(/\n/g, '')) : rawContent as string;

    return content;
}

export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    git_url: string;
    url: string;
    private: boolean;
    description?: string;
    stargazers_count: number;
    forks_count: number;
}

export async function loadPublicRepos(username: string): Promise<GithubRepo[]> {
    const url = 'https://api.github.com/graphql';
    const query = `
        query($login: String!) {
            user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                ... on Repository {
                    id
                    name
                    nameWithOwner
                    url
                    sshUrl
                    isPrivate
                    description
                    stargazerCount
                    forkCount
                }
                }
            }
            }
        }
    `;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { login: username } }),
    });

    if (!res.ok) {
        throw new Error(`GitHub GraphQL API: ${res.status} ${res.statusText}`);
    }

    const { data, errors } = await res.json();
    if (errors?.length) {
        throw new Error(`GitHub GraphQL errors: ${JSON.stringify(errors)}`);
    }

    // Map the GraphQL payload to your GithubRepo shape:
    return data.user.pinnedItems.nodes.map((repo: Record<string, string>) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.nameWithOwner,
        html_url: repo.url,
        git_url: repo.sshUrl,
        private: repo.isPrivate,
        // if your interface has these fields, too:
        description: repo.description,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount,
    }));
}
