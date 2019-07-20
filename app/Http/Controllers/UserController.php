<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\PostResource;

class UserController extends Controller
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
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('UserTimeline', [
            'user' => new UserResource($user),
            'posts' => PostResource::collection(Post::where('user_id', $user->id)->take(10)->get()),
        ]);
    }
}
