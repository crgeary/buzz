<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <style>

        /* @todo, move this somewhere else */
        
        .sr {
            border: 0;
            clip: rect(0 0 0 0);
            -webkit-clip-path: inset(50%);
            clip-path: inset(50%);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
            white-space: nowrap;
        }

    </style>

</head>
<body class="text-gray-800 bg-gray-100">
    
    @inertia

    <script src="{{ asset('js/app.js') }}" defer></script>

</body>
</html>