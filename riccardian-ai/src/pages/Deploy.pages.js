
import React, { useState, useRef, useEffect } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';

const Deploy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null);
  const contract = localStorage.getItem("Contract")

  const ContractsStep = () => {
    
    console.log("First step");
    return (
      <div className=''>
                
        <div className="flex align-items-center justify-content-center" >
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Here is the humanly readable contract</div>
                    <span className="text-600 font-medium line-height-3">{contract}</span>
                    
                </div>

                <div>
                <span className="text-600 font-medium line-height-3">The Machine readable contract is below</span>

                </div>
            </div>
        </div>
        <div style={{height:"25px"}}></div>
        {/* Machine readable contract */}

      

        <div className=" flex align-items-center justify-content-center" >
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Here is the Machine readable contract</div>
                    <span className="text-600 font-medium line-height-3">{contract}</span>
                    
                </div>

                <div>
                    <h2>Contracts Step</h2>
                    <Button
                    label="Next Step"
                    icon="pi pi-plus"
                    className="mr-2"
                    onClick={() => setActiveIndex(1)}
                    text
                    raised/>
                </div>
            </div>
        </div>
        
        
      </div>
    );
  };

  const DeployingStep = () => {
    console.log("seccond step");

    return (
      <div>
        
        <h2>Deploying Step</h2>
        <Button
          label="Next Step"
          className="mr-2"
          onClick={() => setActiveIndex(2)}
          text
          raised
        />
      </div>
    );
  };

  const DoneStep = () => {

    return (
      <div>
        <h2>Done Step</h2>
        <Button
          label="Restart"
          className="mr-2"
          onClick={() => setActiveIndex(0)}
          text
          raised
        />
      </div>
    );
  };

  const items = [
    {
      label: 'Contracts',
      command: () => {
        setRenderState('Contracts');
        return ContractsStep()
      },
    },
    {
      label: 'Deploying',
      command: () => {
        setRenderState('Deploying');
       DeployingStep()
      },
    },
    {
      label: 'Done',
      command: () => {
        setShowConfetti(true);
        setRenderState('Done');
        return DoneStep()
      },
    },
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div>
      <div className="spacer" style={{ height: '20px' }}></div>
      <div className="card">
        <Toast ref={toast}></Toast>
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
        />
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className="">
          {activeIndex === 0 && renderState === 'Contracts' ? (
            <ContractsStep />
          ) : activeIndex === 1 && renderState === 'Deploying' ? (
            <DeployingStep />
          ) : activeIndex === 2 && renderState === 'Done' ? (
            <DoneStep />
          ) : (
            
            <ContractsStep />
          )}
        </div>
      </div>
    </div>
  );
};

export default Deploy;
