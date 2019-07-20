import React from 'react';
import { InertiaLink } from 'inertia-react';

import SharedContext from '@/contexts/SharedContext';

import Logo from './Logo';

export default function Header({ children }) {
    return (
        <SharedContext.Consumer>
            {data => (
                <header role="banner" className="sticky top-0 bg-white shadow py-2">
                    <div className="container mx-auto flex justify-between">
                        <div>
                            <InertiaLink href="/">
                                <Logo name={data.app.name} />
                            </InertiaLink>
                        </div>
                        <div>
                            <button>{data.auth.user.name}</button>
                        </div>
                    </div>
                </header>
            )}
        </SharedContext.Consumer>
    );
}
