<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Inertia::share(function () {
            return [
                'app' => [
                    'name' => config('app.name'),
                ],
                'auth' => [
                    'user' => auth()->check() ? auth()->user()->only('id', 'name', 'email_hash') : null
                ]
            ];
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
