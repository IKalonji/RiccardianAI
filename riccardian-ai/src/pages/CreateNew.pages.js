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
            <Button label="Paste" icon="pi pi-times" onClick={() => { setSelectedContent("paste"); setVisible(false); }} autoFocus />
            <Button label="Manually enter content" icon="pi pi-check" onClick={() => { setSelectedContent("manually"); setVisible(false); }} autoFocus />
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
          <div>
            <Editor value={editorText} onTextChange={(e) => setEditorText(e.textValue)} headerTemplate={header} style={{ height: '320px' }} />
          </div>
        );
      }
      
      function ManuallyEnterContractContent() {
        return (
          <div>
            <span className="p-float-label">
              <InputText id="heading" />
              <label htmlFor="heading">Heading</label>
            </span>
            {/* clause */}
            <span className="p-float-label">
              <InputText id="clause" />
              <label htmlFor="clause">Clause</label>
            </span>
          </div>
        );
      }
      

    return (
        <div>
          <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            {selectedContent === "paste" ? (
              <PasteContractContent />
            ) : selectedContent === "manually" ? (
              <ManuallyEnterContractContent />
            ) : (
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            )}
          </Dialog>
        </div>
      );
      
}

export default CreateNew