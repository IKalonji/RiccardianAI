import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";

const CreateNew = () => {
    const [visible, setVisible] = useState(true);
    const [selectedContent, setSelectedContent] = useState(null);

    const [editorText, setEditorText] = useState('')

    const footerContent = (
        <div>
            <Button label="Paste" icon="pi pi-file-import" onClick={() => { setSelectedContent("paste"); setVisible(false); }} autoFocus />
            <Button label="Manually enter content" icon="pi pi-file-edit" onClick={() => { setSelectedContent("manually"); setVisible(false); }} autoFocus />
        </div>
    );

    function PasteContractContent() {
        console.log("paste content rendering");
      
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
      
        return (
          
        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Paste the Human readable Contract here</div>
                </div>

                <div>
                    <div className="spacer" style={{height:"20px"}}></div>
                    <Editor value={editorText} onTextChange={(e) => { setEditorText(e.textValue) }} headerTemplate={header} style={{ height: '320px' }} />
                    <div className="spacer" style={{height:"20px"}}></div>
                    <Button label="Save and review" icon="pi pi-cloud-upload" className="w-full" />
                 </div>
            </div>
        </div>
    
        );
      }
      
      function ManuallyEnterContractContent() {
        return (
            <div>   
                <div className="spacer" style={{height:"20px"}}></div>      
                <div className="flex align-items-center justify-content-center">
                    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div className="text-center mb-5">
                            <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Manually create the contract</div>
                        </div>
                        <div>

                            <label htmlFor="heading" className="block text-900 font-medium mb-2">Heading</label>
                            <InputText id="heading" placeholder="Heading of the contract" className="w-full mb-3"/>
                            <div className="spacer" style={{height:"20px"}}></div>

                            {/* clause */}
                            <label htmlFor="clause" className="block text-900 font-medium mb-2">Clause</label>
                            <InputText id="clause" placeholder="Enter the clause" className="w-full mb-3"/>
                            <div className="spacer" style={{height:"20px"}}></div>
                        </div>
                    </div>
                </div>
            </div>
    
        );
      }
      
    return (
        <div>
          <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </Dialog>
          
          {selectedContent === "paste" ? (<PasteContractContent />) : selectedContent === "manually" ? (
              <ManuallyEnterContractContent />) :(<PasteContractContent />)}
        </div>
      );
      
}

export default CreateNew