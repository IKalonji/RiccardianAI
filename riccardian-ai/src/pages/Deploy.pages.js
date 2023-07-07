import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

const Deploy = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);

    const items = [
        {
            label: 'Contracts',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
                return(
                    <>
                        <h1> Contracts </h1>
                    </>
                )
            }
        },
        {
            label: 'Deploying',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
            }
        },
        {
            label: 'Done',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        }
    ];

    return (
        <div>
            <div className="card">
                <Toast ref={toast}></Toast>
                <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
            </div>
        </div>
    )
}

export default Deploy