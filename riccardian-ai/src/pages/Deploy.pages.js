
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';

const Deploy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  let [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null);
  const [contractName, setContractName] = useState("")
  const contract = localStorage.getItem(contractName);
  const [value, setValue] = useState('');
  const navigate = useNavigate()

  const [visible, setVisible] = useState(true);

  const footerContent = (
      <div>
          <Button label="Continue"  onClick={() => {setVisible(false); setContractName(value)}} className="w-full" raised/>
          
      </div>
  );

  const [deploying, setDeploying] = useState(false);

  useEffect(() => {

    if (deploying) {
        // setDeploying(true)
      const timer = setTimeout(() => {
        // Perform the action after 15 seconds
        setRenderState("Done");
        setActiveIndex(2);
        setShowConfetti(false);
        setDeploying(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
    showConfetti = true
  }, [deploying]);
  

  const ContractsStep = () => {
    
    console.log("First step");
    return (
      <div className=''>
        <div style={{height:"35px"}}></div>
        
        <div className="">

            <div className="grid">
                <div className=" surface-card p-4 shadow-2 border-round w-full lg:w-5">
                    <div className="align-self-start p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Below is the human readable contract</div>

                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Editor value={contract} readOnly style={{ height: '320px' }} />
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />                            
                            
                        </div>
                    </div>
                </div>

                <div className=" surface-card p-4 shadow-2 border-round w-full lg:w-5">
                    <div className="align-self-end p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Below is the machine readable smartcontract</div>
                            
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Editor value={contract} readOnly style={{ height: '320px' }} />
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    

        <div className='flex flex-column'>
            
            <Button
            label="Next Step"
            icon="pi pi-plus"
            className="flex align-items-center justify-content-center mr-2"
            onClick={() => (setActiveIndex(1), setRenderState("Deploying"))}/>
        </div>
        
        
      </div>
    );
  };

  const DeployingStep = () => {
    console.log("seccond step");

    const handleButtonClick = () => {
        setDeploying(true);
    };
    
      return (
        <div className='card'>
          <div style={{height:"170px"}}></div>

          {deploying ? (
            
            <>
                <div className='flex flex-column'>
                    <div className='flex align-items-center justify-content-center h-4rem font-bold border-round m-2'>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration=".5s" />
                    
                    </div>
                </div>
              
              <br/>
              <div className="">
                <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">{" "}Deploying, please wait a few seconds...</div>
            </div>
            </>
          ) : (
            <>
            <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                    {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                    <Button
                        label="Start deploying"
                        className="mr-2"
                        onClick={handleButtonClick}
                        text
                        raised
                    />
                </div>
            </div>
                </>
            )}
        </div>
      );
    
  };

    const DoneStep = () => {
    return (
      <div>
        <div className="flex flex-column">
            <div className="flex align-items-center justify-content-center h-4rem  font-bold border-round m-2">
            <div className="text-900 font-medium text-xl mb-2">Well done! You have Successfully deployed a riccardian contract</div>
            </div>

            <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                {
                showConfetti && (
                    <Confetti width={window.innerWidth} height={window.innerHeight} />
                    && setShowConfetti(false))}
                <Button
                    label="View the functions of the contract"
                    className="mr-2"
                    onClick={() => {
                    setActiveIndex(0);
                    navigate("/view interactable functions")
                    }}
                    text
                    raised/>
            </div>
        </div>
         
       
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
        <Dialog header="Enter the contract Address below" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <InputText placeholder='Enter ContractAddress Here' className='w-full' value={value} onChange={(e) => { setValue(e.target.value); setContractName(e.target.value) }} />
        </Dialog>
      <div className="spacer" style={{ height: '20px' }}></div>
      <div className="card">
        <Toast ref={toast}></Toast>
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          
        />

        { showConfetti && (
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
