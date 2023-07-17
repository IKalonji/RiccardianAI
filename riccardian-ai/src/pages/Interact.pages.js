import React, {useState, useRef} from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

const Interact = () => {
    const generatedContract = localStorage.getItem("GeneratedContract");
    const [visible, setVisible] = useState(true);
    const [transactioPopUp, setTransactionPopUp] = useState(false);
    const [contractName, setContractName] = useState('');
    const [deployerName, setDeployerNAme] = useState('');
    const [transactionDetails, setTransactionDetails] = useState('');
    const [completeTransaction, setCompleteTransaction] = useState('Currently there is no transtaction to execute');
    const [disabled, setDisabled] = useState(true);
    let toast = useRef(null);

    const createTransactionAsDescribed = async () => {

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role:"user", content:`Can you create the cadence transaction based on the smartcontract and description provided , dont provide an answer just code with comments within the code: ${transactionDetails}. Here is the smart contract ${generatedContract}` })
        };

         fetch('https://jointlabs.xyz/v1/ricardian', requestOptions)
            .then((response)=> response.json()).then((data) => {
                console.log("response: ", data.response);
                setCompleteTransaction(data.response)
                localStorage.setItem("GeneratedTransaction", `${data.response}`)
            })
    }

    const footerContent = (
        <div>
            <Button className='w-full' label="Interact" icon="pi pi-spin pi-arrow-right-arrow-left" onClick={() => setVisible(false)} raised />
        </div>
    );
    const transactionFooter = (
        <div>
            <Button className='w-full' label="Create Transaction" icon="pi pi-thumbs-up" onClick={() => {CheckTransactionDetails()}} raised />
        </div>
    )

    function CheckTransactionDetails(){
        if (!transactionDetails){
            alert("complete the input field")
        }
        else{
            createTransactionAsDescribed()
            setTransactionPopUp(false);
            setDisabled(false)
            toast.current.show({ severity: 'info', summary: 'Transaction processing...', detail: "Please wait a few seconds while the transaction is being created" , life:5000});
        }
    }

  return (
    <div className='card'>
        <Toast ref={toast} />

        <Dialog draggable={false} header="Your contract address is needed to interact with the contract" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <InputText className='w-full' placeholder='Contract name' onChange={(e) => {setContractName(e.target.value)}}/>
            <hr/>
            <InputText className='w-full' placeholder='Deployer Address' onChange={(e) => {setDeployerNAme(e.target.value)}}/>
        </Dialog>

        <Dialog draggable={false} header="Create your transaction" visible={transactioPopUp} style={{ width: '50vw' }} onHide={() => setTransactionPopUp(false)} footer={transactionFooter}>
            <div className="w-full col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-4">Enter the details of you transactions functionality</span>
                            <div className="text-900 font-medium text-xl">
                            </div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-spin pi-link text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <InputTextarea className='w-full' placeholder='Transaction Details...' onChange={(e) => {setTransactionDetails(e.target.value)}}/>
                </div>
            </div>
        </Dialog>

        <div className="card flex align-items-center justify-content-center font-bold border-round m-2">
            <div className="border-round border-1 surface-border p-4 surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className='text-center mb-5'>
                <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">{contractName}, Contract Deployed By: {deployerName}</div>
                <div style={{height:"50px"}}></div>

                <div className='card flex flex-column'>
                <div className="">
                    <div className="">
                        <Button
                            icon = "pi pi-arrow-right-arrow-left"
                            label="Create Transaction"
                            className="w-full flex align-items-center justify-content-center mr-2"
                            onClick={()=>{setTransactionPopUp(true)}}
                            raised/>
                    </div>
                    <hr/>
                    <div>
                        <div className="w-full col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-4">Transaction:</span>
                                   
                                    </div>
                                </div>
                                    <hr/>
                                    <pre className='text-left'>
                                        <span className="block  font-medium mb-6">{completeTransaction}</span>
                                    </pre>
                                    <hr/>
                                    <Button
                                    severity="success"
                                    icon = "pi pi-arrow-right"
                                    label="Execute Transaction"
                                    className="w-full flex align-items-center justify-content-center mr-2"
                                    disabled={disabled}
                                    raised/>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
              
                </div>
            </div>
        </div>
    </div>
  )
}
export default Interact