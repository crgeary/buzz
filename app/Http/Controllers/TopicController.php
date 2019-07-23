<?php

namespace App\Http\Controllers;

use App\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class TopicController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $topic
     * @return \Illuminate\Http\Response
     */
    public function show($topic)
    {
        if (1 !== preg_match("/^[A-Za-z0-9]{1,50}$/", $topic)) {
            return redirect()->route('home');
        }

        return Inertia::render('TopicTimeline', [
            'topic' => $topic,
            'posts' => PostResource::collection(Post::where('content', 'REGEXP', "\#{$topic}[[:>:]]")->take(50)->get()),
        ]);
    }
}
