
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { ProgressSpinner } from 'primereact/progressspinner';

const Deploy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  let [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null);
  const [contractName, setContractName] = useState("")
  const contract = localStorage.getItem("Contract");
  const [value, setValue] = useState('');
  const navigate = useNavigate()

  const [visible, setVisible] = useState(true);

  const [deploying, setDeploying] = useState(false);
  const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-code" aria-label="code"></button>
        </span>
    );
};

const header = renderHeader();

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
        <div style={{height:335}}></div>
        
        <div className="">

            <div className="flex flex-column justify-content-center gap-300">
                <div class="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                <div className=" surface-card p-4 shadow-2 border-round w-full lg:w-5">
                    <div className="align-self-start p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Your input contract</div>

                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Editor headerTemplate={header} value={contract} readOnly style={{ height: '320px' }} />
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />                            
                            
                        </div>
                    </div>
                </div>

                <div className=" surface-card p-4 shadow-2 border-round w-full lg:w-5">
                    <div className="align-self-end p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">AI Generated Riccardian contract</div>
                            
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Editor headerTemplate={header} value={contract} style={{ height: '320px' }} />
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
        <div style={{height:"40px"}}></div>
        <Button
        style={{position:"relative", top:"40vh"}}
            label="Next Step"
            icon="pi pi-plus"
            className="w-full "
            onClick={() => (setActiveIndex(1), setRenderState("Deploying"))}/>
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
                    <ProgressSpinner style={{ width: '150px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />
                    
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
                    setShowConfetti(true)&&
                showConfetti && (
                    <Confetti width={window.innerWidth} height={window.innerHeight} />)
                    && setShowConfetti(false)}
                <Button
                    label="View the functions of the contract"
                    className="mr-2"
                    onClick={() => {
                    setActiveIndex(0);
                    navigate("/interact-with-contract")
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
      <div className="spacer" style={{ height: '20px' }}></div>
      <div className="card">
        <Toast ref={toast}></Toast>
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}/>

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
