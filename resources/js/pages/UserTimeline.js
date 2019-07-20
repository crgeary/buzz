import React, { Component } from 'react';
import Layout from '@/components/Layout';

import Post from '@/components/Post/Post';

export default class UserTimeline extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            posts: this.props.posts || [],
        }
    }
    componentWillMount() {
        window.Echo.channel(`posts--user-${this.props.user.id}`).listen('PostCreated', (e) => {
            this.setState({
                posts: [e.post, ...this.state.posts]
            });
        });
    }
    render() {
        return (
            <Layout>
                <div>
                    {this.state.posts.map((post, i) => (
                        <Post key={i} user={post.user} post={post} />
                    ))}
                </div>
            </Layout>
        );
    }
}
