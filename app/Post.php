<?php

namespace App;

use App\User;
use App\Events\PostCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['prev_post_id', 'user_id', 'content'];

    /**
     * The event map for the post.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => PostCreated::class,
    ];

    /**
     * Set default ordering to be "latest first"
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    /**
     * The user that owns this post.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Return a formatted version of the content
     *
     * @return string
     */
    public function getContentHtmlAttribute()
    {
        $content = $this->content;

        return preg_replace_callback("/\@([A-Za-z0-9]{1,15})/", function ($matches) {
            return sprintf(
                '<a href="%1$s" class="text-purple-700">%2$s</a>',
                route('user.show', ['user' => $matches[1]]),
                $matches[0]
            );
        }, $content);
    }
}
