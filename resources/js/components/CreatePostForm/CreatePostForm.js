import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import Button from '@/components/Button';

export default class CreatePostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: {}
        }
        this.mentionPlugin = createMentionPlugin({
            theme: {
                mention: `text-purple-600`,
                mentionSuggestions: `w-56 bg-white shadow absolute`,
                mentionSuggestionsEntry: `flex border-b items-center p-2 text-gray-700 text-sm`,
                mentionSuggestionsEntryFocused: `flex bg-gray-100 border-b items-center p-2 cursor-pointer text-gray-900 text-sm`,
                mentionSuggestionsEntryAvatar: `w-8 mr-2 rounded-full`,
                mentionSuggestionsEntryText: `font-bold`,
            }
        });
        this.updateEditorState = this.updateEditorState.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    handleFormSubmit(e) {
        e.preventDefault();
        this.setState({ error: false });
        axios.post('/api/posts', { content: this.editorStateAsText() }).then(data => {
            this.setState({ editorState: EditorState.createEmpty() });
        }).catch(error => {
            this.setState({ error: 'Sorry, something isn\'t working as expected.'});
        });
    }
    updateEditorState(editorState) {
        this.setState({ editorState });
    }
    editorStateAsText(text) {
        const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
        return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    }
    onSearchChange({ value }) {
        if (value.length <= 1) {
            return;
        }
        axios.get('/api/users?username=' + value).then(response => {
            this.setState({
                suggestions: response.data.data.map(user => ({
                    name: `@${user.username}`,
                    avatar: `https://www.gravatar.com/avatar/${user.email_hash}?s=88`,
                }))
            });
        });
    }
    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        return (
            <form onSubmit={this.handleFormSubmit.bind(this)} className="mb-12">
                {this.state.error && (
                    <div className="bg-red-600 text-white py-2 px-4 rounded mb-2 font-bold">{this.state.error}</div>
                )}
                <div className="bg-white border w-full p-4 mb-2 rounded">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.updateEditorState}
                        plugins={[this.mentionPlugin]}
                        ref={(element) => { this.editor = element; }}
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                    />
                </div>
                <div className="text-right">
                    <Button>Submit</Button>
                </div>
            </form>
        );
    }
}
