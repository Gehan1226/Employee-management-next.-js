import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full bg-gradient-to-r from-sky-800 via-sky-500 to-blue-500 flex flex-row">
            {children}
        </div>
    )
}
