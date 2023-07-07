import React, { useRef,useEffect, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from 'react-router-dom';
import { AppStateService } from '../AppstateService/AppState.service';

//Main Navbar here
function Navbar() {

  let [toolbarOptions, settoolbarOptions] = useState(
    (
      <>
        <Button label="Connect Flow Wallet" className="mr-2" onClick={() => {NavigateToPage("/")}} />
      </>
    )
  )
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  const service = new AppStateService();
  
  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted, and may now proceed to staking', life: 4000 });
    NavigateToPage("/joinDao")
  }

  const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  let items = [
    {
      label: 'Pending Projects',
      icon: 'pi pi-external-link',
      command: () => {
        if (service.isUserMemeber === true){
          console.log("the user is a member")
          NavigateToPage("/member/view-projects")
        }
        else{
          console.log("It is false the user is not a member");
          setVisible(true)
          
        }
        
      }
    },
    {
      label: 'Join DAO',
      icon: 'pi pi-refresh',
      command: () => {
        NavigateToPage("/joinDao");
      }
    },
  ];

  let startContent = (
    <a className="p-button-text" style={{ cursor: "pointer" }} onClick={() => {navigate("/")}}>
      <Button severity="secondary" text>
      <i className='pi pi-building' style={{ fontSize: '2rem' }}></i>
      <label>
        Riccardin AI
      </label>
      </Button>

    </a>
  );

  const eventRaised = () => {
    console.log("EVENT RAISED");
    settoolbarOptions(
      (
        <>
          <Button label="Create new" icon="pi pi-plus" className="mr-2" onClick={() => {NavigateToPage("/crete-new-contract")}} text/>
          <Button label="Go to contract" icon="pi pi-file" className="mr-2" onClick={() => {NavigateToPage("/user/view-projects")}} text />
          <Button label="Interact with contract" icon="pi pi-arrow-right-arrow-left" className="mr-2" onClick={() => {NavigateToPage("/dex-page")}} text />
          {/* <SplitButton label="DAO Members" icon="pi pi-view" model={items} className="mr-2" text severity='success'></SplitButton> */}
        </>
      )
    )
  }

  useEffect(() => {
    window.addEventListener('loggedIn', eventRaised);
    return () => {
      window.removeEventListener('loggedIn', eventRaised);
    };
  }, []);

  function NavigateToPage(path) {
    if (service.connected) {
      navigate(path)
    } else {
      service.connectToFlowWallet()
        .then(() => {
          navigate(path);
          toast.current.show({ severity: 'success', summary: 'Connected', detail: `'Successfully connected to wallet'`, life: 3000 });
        })
        .catch((error) => {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Cannot display the page until user is connected to metamask and is using Hedera testnet as well as the Arkhia rpc', life: 3000 });
        });
    }
  }

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="In order to view the projects pending approval you need to be a DAO member. Click the yes button to stake and become a member" 
        header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        <Toolbar start={startContent} end={toolbarOptions} />
    </div>
  );
}

export default Navbar;