import React, { Component } from 'react';

import Button from '@/components/Button';

export default class CreatePostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            content: '',
        }
    }
    handleTextareaChange(e) {
        this.setState({
            content: e.target.value,
            error: false,
        });
    }
    handleFormSubmit(e) {
        e.preventDefault();
        this.setState({ error: false });
        axios.post('/api/posts', { content: this.state.content }).then(data => {
            this.setState({ content: '' });
        }).catch(error => {
            this.setState({ error: 'Sorry, something isn\'t working as expected.'});
        });
    }
    render() {
        return (
            <div className="mb-12">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    {this.state.error && (
                        <div className="bg-red-600 text-white py-2 px-4 rounded mb-2 font-bold">
                            {JSON.stringify(this.state.error)}
                        </div>
                    )}
                    <div>
                        <textarea
                            className="bg-white border w-full p-4 rounded"
                            placeholder="Create a post..."
                            value={this.state.content}
                            onChange={this.handleTextareaChange.bind(this)}
                        />
                    </div>
                    <div className="text-right">
                        <Button>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}
