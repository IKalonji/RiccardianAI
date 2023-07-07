import React, {useState} from 'react';
import { Button } from 'primereact/button';
import Divider from '@mui/material/Divider';
import { Dialog } from 'primereact/dialog';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Landingpage = () => {
    const [visible, setVisible] = useState(false);

    const confirmConnect = () => {
      confirmDialog({
          message: 'You need to connect your Metamask to proceed',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept,
          reject
      });
  };

  const accept = () => {
    // service.connectToMetamask()
    console.log("connect")
}

const reject = () => {
    // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
}

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" severity="danger" onClick={() => setVisible(false)} className="p-button-text" />
        </div>
    );

  return (
    <div>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
          {/* <Toast ref={toast} /> */}
          <ConfirmDialog/>
            <span className="block text-6xl font-bold mb-1">Infrastructure Tokenization</span>
            <div className="text-6xl text-primary font-bold mb-3">For Decentralized Project Financing</div>
            <p className="mt-0 mb-4 text-700 line-height-3">With InfraDAO projects are tokenized to maximize funding opportunities in the DeFi ecosystem</p>

            <Button label="View Projects" type="button" className="mr-3 p-button-raised" />
            <Button label="Watch Demo" type="button" className="p-button-outlined" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog visible={visible} style={{ width: '50vw', textAlign:"center" }} onHide={() => setVisible(false)} footer={footerContent}>
                <iframe src='https://www.youtube.com/embed/oa0pmjf-dsQ' title="The demo video" width="500" height="400"></iframe>
            </Dialog>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src="https://oecd-development-matters.org/wp-content/uploads/2022/11/Quality-infrastructure-development.jpg" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>

      <Divider variant="middle" />
      <div style={{ height: "22px" }}></div>

      <div className="surface-0 text-center">
        <div className="mb-3 font-bold text-3xl">
          <span className="text-900">Get easy, </span>
          <span className="text-blue-600">Funding from the Community</span>
        </div>
        <div className="text-700 mb-6">InfraDAO makes it easy for big projects to get funding</div>
        <div className="grid">
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Simple UI</div>
            <span className="text-700 line-height-3">InfraDAO has a very clean and easy to use user Interface.</span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Secure Funding</div>
            <span className="text-700 line-height-3">All funding that takes place on the platform is secure .</span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span className="text-700 line-height-3">With our simple UI, user's can navigate through the application easily .</span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Global Funding</div>
            <span className="text-700 line-height-3">Fund projects all around the world wherever you you are.</span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-github text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Open Source</div>
            <span className="text-700 line-height-3">InfraDAO is an open source project.Feel free to check out the Github Repository. </span>
          </div>
          <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-shield text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
            <span className="text-700 line-height-3">InfraDAO is secure and trustworthy.</span>
          </div>
        </div>
      </div>

      <Divider />
      <div style={{ height: "22px" }}></div>

      <div className="surface-0 text-700 text-center">
        <div className="text-blue-600 font-bold mb-3"><i className="pi pi-github"></i>&nbsp;POWERED BY GITHUB</div>
        <div className="text-900 font-bold text-5xl mb-3">Feel free and view the code on Github</div>
        <div className="text-700 text-2xl mb-5">InfraDAO's codebase is open source click the button below and go check it out.</div>
        <a href='https://github.com/IKalonji/RiccardianAI' target='_blank' rel='noopener noreferrer'>
          <Button label="View the Repo" icon="pi pi-github" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" />
        </a>
      </div>
    </div>
  );
};

export default Landingpage;
