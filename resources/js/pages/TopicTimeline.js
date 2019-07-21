import React, { Component } from 'react';
import Layout from '@/components/Layout';

import Post from '@/components/Post/Post';

export default class TopicTimeline extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            posts: this.props.posts || [],
        }
    }
    componentWillMount() {
        window.Echo.channel(`posts--topic-${this.props.topic}`).listen('PostCreated', (e) => {
            this.setState({
                posts: [e.post, ...this.state.posts]
            });
        });
    }
    componentWillUnmount() {
        window.Echo.leaveChannel(`posts--topic-${this.props.topic}`);
    }
    render() {
        return (
            <Layout>
                <h1 class="font-bold text-gray-900 text-3xl mb-8">#{this.props.topic}</h1>
                <div>
                    {this.state.posts.map((post, i) => (
                        <Post key={i} user={post.user} post={post} />
                    ))}
                </div>
            </Layout>
        );
    }
}
