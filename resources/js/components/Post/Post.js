import React, { Component } from 'react';

import Gravatar from '@/components/Gravatar';

export default class Post extends Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return (
            <div className="mb-6 pb-6 border-b">
                <div className="flex mb-4 items-center">
                    <Gravatar hash={this.props.user.email_hash} size="44" />
                    <div className="ml-2 leading-tight">
                        <div>
                            <span className="font-bold text-gray-900 text-xl">{this.props.user.name}</span>
                            <span className="text-gray-500 ml-2">@user</span>
                        </div>
                        <time className="text-sm text-gray-700">49 mins</time>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}