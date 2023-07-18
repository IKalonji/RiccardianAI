import React, { useState, useRef, useEffect, useCallback } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { ProgressSpinner } from 'primereact/progressspinner';
import { AppStateService } from '../AppstateService/AppState.service';

const Deploy = () => {
  const toast = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null);
  const [contractName, setContractName] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState('');

  const contract = localStorage.getItem("Contract");
  const generatedContract = localStorage.getItem("GeneratedContract");

  const navigate = useNavigate()
  const service = new AppStateService();

  const [visible, setVisible] = useState(true);

  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
        
    if (deploying) {
      setTimeout(()=> {
        FetchingBeforeDeployment();

      }, 9000)
        return
    }
    }, [deploying]);

    async function FetchingBeforeDeployment(){

      const createUser = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: service.walletAddress})
      };
  
      const createWorkspace = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: service.walletAddress, workspace: "ricardian" })
      };
  
      const createFile = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: service.walletAddress, workspace: "ricardian", folder: "contracts", file: "test_contract.cdc" })
      };
  
      const addToFile = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: service.walletAddress, workspace: "ricardian", folder: "contracts", file: "test_contract.cdc", contents: `${generatedContract}` })
      };
  
      const deployContract = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: service.walletAddress, workspace: "ricardian", account_name: 'emulator', network: "emulator", file: "test_contract.cdc"
        })
      };

      try {
        let userCreation = await fetch("https://jointlabs.xyz/v1/flowde/create_user", createUser)
        .then((response) => response.json())
        .then((data) => {
          console.log("creating the user")
          console.log("response: ", data);
          
          if (data.result === "OK"){
            setStatus("Creating the user...");
          } else{
            setStatus("Creating the user...");
            toast.current.show({ severity: 'error', summary: 'Error', detail: "An error occured while creating the workspace" , life:5000});
          }
        })
  
        let wrokspaceCreation = await fetch("https://jointlabs.xyz/v1/flowde/create_workspace", createWorkspace)
        .then((response) => response.json())
        .then((data) => {
          console.log("creating the workspace")
          console.log("response: ", data);          
          if (data.result === "OK"){
            setStatus("Creating workspace...");
          } else{
            setStatus("Creating workspace...");
            toast.current.show({ severity: 'error', summary: 'Error', detail: "An error occured while creating the workspace" , life:5000});
          }
        })
  
        let fileCreation = await fetch("https://jointlabs.xyz/v1/flowde/create_file", createFile)
        .then((response) => response.json())
          .then((data) => {
            console.log("creating the file")
            console.log("response: ", data);
            if (data.result === "OK"){
              setStatus("Creating files...");
            } else{
              setStatus("Creating files...");
              toast.current.show({ severity: 'error', summary: 'Error', detail: "An error occured whilst adding the contents to the file" , life:5000});
            }
          })
        
        let addingToFile = await fetch("https://jointlabs.xyz/v1/flowde/add_to_file", addToFile)
        .then((response) => response.json())
        .then((data) => {
          console.log("adding to file")
          console.log("response: ", data);
          if (data.result === "OK"){
            setStatus("Adding to file...");
          } else{
            setStatus("Adding to file...");
            toast.current.show({ severity: 'error', summary: 'Error', detail: "An error occured whilst adding the contents to the file" , life:5000});
          }
          
        })
  
        let contractDeployment = await fetch("https://jointlabs.xyz/v1/flowde/deploy_contracts", deployContract)
        .then((response) => response.json())
        .then((data) => {
          console.log("deploying the contract")
          console.log("response: ", data);
          if (data.result === "OK"){
            setStatus("Deploying contract!!!");

            setRenderState("Done");
            setActiveIndex(2);
            setDeploying(false);

            toast.current.show({ severity: 'success', summary: 'Success', detail: "Your Ricardian contract has been successfully deployed" , life:5000});
          } else{
            setStatus("Deploying contract!!!");
            toast.current.show({ severity: 'error', summary: 'Error', detail: "An error occured during the deployement of the contract" , life:5000});
          }
        })
        
      } catch (error) {
        console.log(error);
      }
  }

  const renderRiccardianContractHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-code" aria-label="code"></button>
      </span>
    );
  };

  const renderHumanReadableContractHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const RiccardianHeader = renderRiccardianContractHeader();
  const HumanReadableHeader = renderHumanReadableContractHeader();

  

  const ContractsStep = () => {
    return (
      <div className='grid'>
        <div style={{ height: 335 }}></div>

        <div className="">
          <div className="flex flex-column justify-content-center gap-300">
            <div className="col-12 flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
              <div className="col-12 surface-card p-7  border-round w-full lg:w-5">
                <div className="align-self-start p-3 h-full">
                  <div className=" shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                    <div className="text-center text-900 font-medium text-xl mb-2">Your input contract</div>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    <pre>
                      <Editor headerTemplate={HumanReadableHeader} value={contract} readOnly style={{ height: '320px' }} />
                    </pre>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                  </div>
                </div>
              </div>

              <div className="col-12 surface-card p-4 border-round bg-primary w-full lg:w-5">
                <div className="align-self-end p-3 h-full">
                  <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                    <div className="text-center text-900 font-medium text-xl mb-2">AI Generated Riccardian contract</div>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                    <pre>
                      <code>
                        <Editor headerTemplate={RiccardianHeader} value={generatedContract} style={{ height: '320px' }} />
                      </code>
                    </pre>
                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div style={{ height: "40px" }}></div>
        <Button
          style={{ position: "relative", top: "40vh" }}
          label="Next Step"
          icon="pi pi-plus"
          className="w-full "
          onClick={() => {
            setActiveIndex(1);
            setRenderState("Deploying");
          }} />
      </div>
    );
  };

  const DeployingStep = () => {
    console.log("second step");

    const handleButtonClick = () => {
      setDeploying(true);
    };

    return (
      <div className='card'>
        <div style={{ height: "170px" }}></div>

        {deploying ? (
          <>
            <div className='flex flex-column'>
            <div className='flex align-items-center justify-content-center h-4rem font-bold border-round m-2'>
              <div className="text-900 text-3xl font-medium mb-3">Contract being deployed on FlowDE version 1.</div>
              </div>
              <div className='flex align-items-center justify-content-center h-4rem font-bold border-round m-2'>
                <ProgressSpinner style={{ width: '150px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />

              </div>
            </div>

            <br />
            <div className="">
              <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">{status}</div>
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
    setShowConfetti(true);
    return (
      <div>
        <div className="flex flex-column">
          <div className="flex align-items-center justify-content-center h-4rem  font-bold border-round m-2">
            <div className="text-900 font-medium text-xl mb-2">Well done! You have Successfully deployed a riccardian contract</div>
          </div>

          <div className="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
            <Button
              label="Interact with your smart-contract"
              icon="pi pi-arrow-right-arrow-left"
              className="mr-2"
              onClick={() => {
                navigate("/interact-with-contract");
              }}
              raised />
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
        return ContractsStep();
      },
    },
    {
      label: 'Deploying',
      command: () => {
        setRenderState('Deploying');
        return DeployingStep();
      },
    },
    {
      label: 'Done',
      command: () => {
        setShowConfetti(true);
        setRenderState('Done');
        return DoneStep();
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
          onSelect={(e) => setActiveIndex(e.index)} />

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

