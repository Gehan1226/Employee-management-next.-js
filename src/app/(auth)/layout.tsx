import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 flex flex-col md:flex-row gap-5">
            {children}
        </div>
    )
}
