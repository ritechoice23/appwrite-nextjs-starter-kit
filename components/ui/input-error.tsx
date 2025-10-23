import React from 'react';

function InputError({ message }: { message?: string }) {
    return (
        <>
            {message ? (
                <div className="text-red-600 text-sm mt-1">
                    {message}
                </div>
            ) : null}
        </>
    );
}

export default InputError;