import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const Interact = () => {
    const contract = localStorage.getItem("Contract")
  return (
    <div className='card'>
        <div className="card flex align-items-center justify-content-center font-bold border-round m-2">
            <div className="border-round border-1 surface-border p-4 surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className='text-center mb-5'>
                <div className="text-900 text-3xl font-medium mb-3">These are the functions in the smartcontract that can be called</div>
                <div style={{height:"20px"}}></div>
                <div className="text-900 text-3xl font-medium mb-3">{contract}</div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Interact