import React from 'react'
import { Button } from 'primereact/button';

const Interact = () => {
    const contract = localStorage.getItem("Contract")
  return (
    <div className='card'>
        <div className="card flex align-items-center justify-content-center font-bold border-round m-2">
            <div className="border-round border-1 surface-border p-4 surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className='text-center mb-5'>
                <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">These are the functions in the smartcontract that can be called</div>
                <div style={{height:"50px"}}></div>

                <div className='card flex flex-column'>
                <div className="">
                    
                    <div classNAme="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                        
                        <div className="w-full col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-4">Function 0</span>
                                        <div className="text-900 font-medium text-xl">$2.100</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-link text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">Successfully deployed</span>
                            </div>
                        </div>
                        <Button
                            icon = "pi pi-arrow-right-arrow-left"
                            label="Interact with this function"
                            className="w-full flex align-items-center justify-content-center mr-2"
                            raised/>
                    </div>
                    <hr/>
                    <div>
                        
                        <div className="w-full col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-4">Function 1</span>
                                        <div className="text-900 font-medium text-xl"></div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-link text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">Successfully deployed</span>
                            </div>
                        </div>
                        <Button
                            icon = "pi pi-arrow-right-arrow-left"
                            label="Interact with this function"
                            className="w-full flex align-items-center justify-content-center mr-2"
                            raised/>
                    </div>
                </div>

                </div>
                {/* <div className="text-300 text-1.5xl font-medium mb-3">{contract}</div> */}

                </div>
            </div>
        </div>
    </div>
  )
}

export default Interact