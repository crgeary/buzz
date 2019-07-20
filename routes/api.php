<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Posts
Route::middleware('auth:api')->get('/posts', 'Api\PostController@index');
Route::middleware('auth:api')->get('/posts/{post}', 'Api\PostController@show');
Route::middleware('auth:api')->post('/posts', 'Api\PostController@store');
Route::middleware('auth:api')->delete('/posts/{post}', 'Api\PostController@destroy');
