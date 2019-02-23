import React from 'react'

export default function InventoryInfoBox({ title, amount, color }) {

    const style = {
        backgroundColor: color,
        color: 'white',
        textAlign: 'center',
        padding: '17px',
        height: '120px',
        borderRadius: '15px'
    }

    return (
        <div style={style}>

            <h6>
                {title}
            </h6>

            <h4 style={{ fontSize: '40px', fontWeight: 'bold' }}>
                {amount}
            </h4>

            <h6>
                <small>
                    pcs
                </small>
            </h6>
        </div>
    )
}
