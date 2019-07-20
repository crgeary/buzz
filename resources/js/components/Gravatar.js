
import React from 'react';

export default function Gravatar({ hash, size = 64, ...other }) {
    return (
        <img
            alt=""
            className="rounded-full"
            {...other}
            src={`https://www.gravatar.com/avatar/${hash}?s=${size}`}
        />
    );
}
