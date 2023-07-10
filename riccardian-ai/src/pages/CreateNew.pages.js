import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from "primereact/editor";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';

const CreateNew = () => {
    const [visible, setVisible] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const toast = useRef(null);
    const [editorText, setEditorText] = useState('');
    const navigate = useNavigate()

    const footerContent = (
        <div>
            <Button label="Continue" icon="pi pi-arrow-circle-right" onClick={() => { setSelectedContent("manually"); setVisible(false); navigate("/start-deployement") }} text raised autoFocus />
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

      const CheckEditorcontent = (event) => {
        if (!editorText){
            console.log("editor is not filled");
            toast.current.show({ severity: 'warn', summary: 'Field not filled in', detail: "please fill in the prompt, and paste the contract" });
        }else {
            setVisible(true)
            localStorage.setItem("Contract", `${editorText}`);            
        }
      }
      
    return (
        <div>
            <div style={{height:"25px"}}> </div>
        <Toast ref={toast}></Toast>
          <Dialog header="Click continue to interact with your contract" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
              <h5 className="m-0">
                {editorText}
              </h5>
          </Dialog>
          
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