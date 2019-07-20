import React from 'react';
import { InertiaLink } from 'inertia-react';

import SharedContext from '@/contexts/SharedContext';

import Gravatar from '@/components/Gravatar';
import Logo from './Logo';

export default function Header({ children }) {
    return (
        <SharedContext.Consumer>
            {data => (
                <header role="banner" className="sticky top-0 bg-white shadow py-2">
                    <div className="container px-4 mx-auto flex justify-between items-center">
                        <div>
                            <a href="/home">
                                <Logo name={data.app.name} />
                            </a>
                        </div>
                        <div>
                            <button className="flex items-center">
                                <Gravatar hash={data.auth.user.email_hash} size="32" />
                                <span className="ml-2">{data.auth.user.name}</span>
                            </button>
                        </div>
                    </div>
                </header>
            )}
        </SharedContext.Consumer>
    );
}
