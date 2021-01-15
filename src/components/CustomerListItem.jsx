import React from 'react'

export default function CustomerListItem({customerData}) {
    return (
        <div>
            <h2>{customerData.name}</h2>
        </div>
    )
}
