import React, { Component } from 'react';
import Layout from '@/components/Layout';

import Post from '@/components/Post/Post';
import CreatePostForm from '@/components/CreatePostForm/CreatePostForm';

export default class Home extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            posts: this.props.posts || [],
        }
    }
    componentWillMount() {
        window.Echo.channel('posts').listen('PostCreated', (e) => {
            this.setState({
                posts: [e.post, ...this.state.posts]
            });
        });
    }
    componentWillUnmount() {
        window.Echo.leaveChannel('posts');
    }
    render() {
        return (
            <Layout>
                <CreatePostForm />
                <div>
                    {this.state.posts.map((post, i) => (
                        <Post key={i} user={post.user} post={post} />
                    ))}
                </div>
            </Layout>
        );
    }
}
