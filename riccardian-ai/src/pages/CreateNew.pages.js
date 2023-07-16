import React, { useState, useRef} from "react";
// import dotenv from "dotenv"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from "primereact/editor";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';

const CreateNew = () => {
    const [visible, setVisible] = useState(false);
    const [enabled, setEnabled] = useState(true);
    // const [selectedContent, setSelectedContent] = useState(null);
    const toast = useRef(null);
    const [editorText, setEditorText] = useState('');
    // const [ contractText, setContractText] = useState('//Cadence contract not respnding')
    const navigate = useNavigate()

    const ConvertToSmartContract = () => {
      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role:"user", content:`Using this legal contract, generat a cadence smart contract to be deployed on the flow blockchain: ${editorText}` })
        };

         fetch('https://jointlabs.xyz/v1/ricardian', requestOptions)
            .then((response)=> response.json()).then((data) => {
                console.log("response: ", data.response);
                localStorage.setItem("GeneratedContract", data.response);
                setEnabled(false)
            })
    }

    const footerContent = (
        <div>
            <Button label="Continue" icon="pi pi-arrow-circle-right" disabled={enabled} onClick={() => { setVisible(false); navigate("/start-deployement") }} text raised autoFocus />
        </div>
    );

    const renderHeader = () => {
        return (
          <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
          </span>
        );
      };
    
      const header = renderHeader();

      const CheckEditorcontent = async (event) => {
        if (!editorText){
            console.log("editor is not filled");
            toast.current.show({ severity: 'warn', summary: 'Field not filled in', detail: "please fill in the prompt." });
        }else {
            ConvertToSmartContract()
            setVisible(true)
            localStorage.setItem("Contract", `${editorText}`);       
            // localStorage.setItem("GeneratedContract", `${contractText}`)     
        }
      }
      
    return (
        <div>
            <div style={{height:"25px"}}> </div>
        <Toast ref={toast}></Toast>
        <pre>
            <Dialog header="Click continue to deploy your contract when the button is enabled" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <h6 className="m-0">
                    {editorText}
                    
                </h6>
            </Dialog>
        </pre>
          
          <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Paste the Human readable Contract here</div>
                </div>

                <div>
                    <div className="spacer" style={{height:"20px"}}></div>
                    <Editor value={editorText} onTextChange={(e) => { setEditorText(e.textValue) }} headerTemplate={header} style={{ height: '320px' }} />
                    <div className="spacer" style={{height:"20px"}}></div>
                    <Button label="Save and review" icon="pi pi-cloud-upload" className="w-full"  onClick={CheckEditorcontent}/>
                 </div>
            </div>
        </div>
        </div>
      );
      
}

export default CreateNew