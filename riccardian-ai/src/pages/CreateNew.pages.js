import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";

const CreateNew = () => {
    const [visible, setVisible] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

    const [editorText, setEditorText] = useState('')

    const footerContent = (
        <div>
            <Button label="Paste" icon="pi pi-file-import" onClick={() => { setSelectedContent("paste"); setVisible(false); }} autoFocus />
            <Button label="Manually enter content" icon="pi pi-file-edit" onClick={() => { setSelectedContent("manually"); setVisible(false); }} autoFocus />
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
      
    return (
        <div>
          <Dialog header="Here is your Contract you may save and review it" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
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
                    <Button label="Save and review" icon="pi pi-cloud-upload" className="w-full"  onClick={() => setVisible(true)}/>
                 </div>
            </div>
        </div>
        </div>
      );
      
}

export default CreateNew