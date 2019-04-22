import React from 'react';

export default function GoogleSigninBtn({ action }) {

    return (
        <button
            onClick={action}
            className="btn btn-light d-flex mx-auto justify-content-center rounded-right rounded-left mt-2 col-md-6"
            style={{ border: '1px solid #e65540' }}
        >
            <i className="fab fa-google mr-3 mt-1 mb-1 font-pink" />
            <span className="d-flex my-auto">
                Sign in with Google
            </span>
        </button>
    )

}
