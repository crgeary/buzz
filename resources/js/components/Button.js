import React from 'react';

export default function Button (props) {
    return (
        <button type="submit" className="bg-purple-700 text-white font-medium py-1 px-5 rounded-full" {...props} />
    );
}
