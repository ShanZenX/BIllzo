import React from 'react';

const Label = ({ name }) => {
    return (
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {name}
        </label>
    );
};
export default Label;