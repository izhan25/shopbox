import React from 'react'

export default function ImageViewerSmallBox({ img, onDelete }) {
    return (
        <div style={{ width: '100px', height: '100px' }}>
            <img src={img} className="img-fluid rounded-top" alt="..." />
            <button className="btn btn-outline-danger btn-sm btn-block rounded-bottom">
                <i className="fas fa-trash mr-1" onClick={onDelete} /> Delete
            </button>
        </div>
    )
}
