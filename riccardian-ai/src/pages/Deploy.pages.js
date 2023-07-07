import React, { useState, useRef, useEffect } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';

const Deploy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null)

  const items = [
    {
        label: 'Contracts',
        command: (event) => {
          toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
          ContractsStep();
          setActiveIndex(1); // Set activeIndex to 1 (index of the "Deploying" step)
          setRenderState("Contracts");
        },
    },
    {
      label: 'Deploying',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
        DeployingStep();
        setActiveIndex(2);
        setRenderState("Deploying")
      },
    },
    {
      label: 'Done',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
        setShowConfetti(true); // Start rendering confetti
        setRenderState("Done")
      },
    },
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false); // Stop rendering confetti after 4 seconds
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  function ContractsStep(){
    //the elemts that are rendered below are meant to show the human readable contract as well as the smartcontract
    return(
        <div>
            <Button label="Contract step" icon="pi pi-plus" className="mr-2" onClick={() => {setActiveIndex(1);}}  text raised/>
        </div>
    )
  }

  function DeployingStep(){
    return(
        <div>
            <Button label="Deploy step" icon="pi pi-minus" className="mr-2" onClick={() => {setActiveIndex(2);}}  text raised/>
        </div>
    )
  }

  return (
    <div className=''>
        <div className='spacer' style={{height:"20px"}}></div>
      <div className="card">
        
        <Toast ref={toast}></Toast>
        <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className='flex align-items-center justify-content-center font-bold border-round m-2'>
            {activeIndex === 0 && renderState === "Contracts" ? (
            <ContractsStep />
            ) : activeIndex === 1 && renderState === "Deploying" ? (
            <DeployingStep />
            ) : activeIndex === 2 && renderState === "Done" ? (
            <Button label="Done" icon="pi pi-plus" className="mr-2" text raised />
            ) : (
            <ContractsStep />
            )}
        </div>
      </div>
    </div>
  );
};

export default Deploy;
