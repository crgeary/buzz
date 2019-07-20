import React from 'react';

import Header from '@/components/Header/Header';

export default function Layout({ children }) {
    return (
        <>
        
            <Header />

            <div className="container px-4 mx-auto">
                <div className="lg:flex -mx-4 py-8">
                    <main role="main" className="flex-0 px-4 lg:w-3/4">

                        {children}

                    </main>
                    <div className="flex-0 px-4 lg:w-1/4">
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