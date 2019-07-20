import Inertia from 'inertia-react';
import React from 'react';
import { render } from 'react-dom';

import SharedContext from '@/contexts/SharedContext';

const app = document.getElementById('app');
const data = JSON.parse(app.dataset.page);

render(
    <SharedContext.Provider value={data.props}>
        <Inertia
            initialPage={data}
            resolveComponent={name => import(`@/pages/${name}`).then(module => module.default)}
        />
    </SharedContext.Provider>,
    app
);
