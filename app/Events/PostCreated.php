<?php

namespace App\Events;

use App\Post;
use Illuminate\Support\Str;
use App\Http\Resources\PostResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PostCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * A single post object
     *
     * @var App\Post
     */
    protected $post;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'post' => (new PostResource($this->post))->resolve()
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channels = [
            new Channel('posts'),
            new Channel(sprintf('posts--user-%d', $this->post->user_id)),
        ];

        if (preg_match_all("/\#([A-Za-z0-9]{1,50})/", $this->post->content, $matches)) {
            foreach ($matches[1] as $topic) {
                $channels[] = new Channel(sprintf('posts--topic-%s', Str::lower($topic)));
            }
        }

        return $channels;
    }
}
