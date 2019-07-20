import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import Gravatar from '@/components/Gravatar';

export default class Post extends Component {
    render() {
        return (
            <div className="mb-6 pb-6 border-b">
                <div className="flex mb-4 items-center">
                    <Gravatar hash={this.props.user.email_hash} size="44" />
                    <div className="ml-2 leading-tight">
                        <div>
                            <span className="font-bold text-gray-900 text-xl">{this.props.user.name}</span>
                            <span className="text-gray-500 ml-2">@{this.props.user.username}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                            <TimeAgo date={this.props.post.created_at} />
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
            </div>
        );
    }
}