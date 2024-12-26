import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full bg-gradient-to-r from-sky-900 via-sky-400 to-sky-900 flex flex-row">
            {children}
        </div>
    )
}
