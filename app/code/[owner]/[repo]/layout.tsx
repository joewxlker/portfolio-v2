import CodeError from '@/components/code/error';
import Error from '@/components/layout/error';
import { CodeTreeLoader } from '@/components/tree/loader';
import { TreeView } from '@/components/tree/tree';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { ReactNode, Suspense } from 'react';

interface CodeLayoutProps {
  viewer: ReactNode;
  params: Promise<{ owner: string; repo: string }>;
}

export default async function CodeLayout({ viewer, params }: CodeLayoutProps) {
  const { owner, repo } = await params;

  return (
    <div className="max-w-[2000px] border-x-container m-auto flex xl:flex-row lg:flex-row flex-col container flex-1n min-h-screen">
      <ErrorBoundary errorComponent={Error}>
        <aside className="lg:w-1/4 w-full border-r-container">
          <Suspense fallback={<CodeTreeLoader/>}>
            <TreeView owner={owner} repo={repo} />
          </Suspense>
        </aside>
        <main id="main-content" className="lg:w-3/4 flex-1 w-full flex flex-col items-center justify-start xl:px-3 lg:px-3 py-1 bg-stone-900/50">
          <ErrorBoundary errorComponent={CodeError}>
              {viewer}
          </ErrorBoundary>
        </main>
      </ErrorBoundary>
    </div>
  );
}