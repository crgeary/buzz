import React from 'react';

import Header from '@/components/Header/Header';

export default function Layout({ children }) {
    return (
        <>
        
            <Header />

            <div className="container mx-auto">
                <div className="flex">
                    <main role="main" className="flex-0 w-3/4">

                        {children}

                    </main>
                    <div className="flex-0 w-1/4">
                        <footer role="contentinfo">
                            <div className="container mx-auto">
                                &copy; {new Date().getFullYear()}
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

        </>
    )
}