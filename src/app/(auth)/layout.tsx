import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full bg-gradient-to-l from-sky-800 via-sky-500 to-sky-800 flex flex-row">
            {children}
        </div>
    )
}
