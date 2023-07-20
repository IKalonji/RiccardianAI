import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';
import * as fcl from "@onflow/fcl";

export class AppStateService {

    constructor(){
        if (typeof AppStateService.instance === 'object') {
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;
        console.log("instance created");
        fcl.config({
          "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Endpoint set to Testnet
          "accessNode.api": "https://rest-testnet.onflow.org",
          "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/testnet/authn",
          "app.detail.title":"Riccardian AI",
          "app.detail.icon": "https://i.imgur.com/r23Zhvu.png"
        })
        const MMSDK = new MetaMaskSDK();
        this.ethereum = MMSDK.getProvider();
        this.provider = new ethers.BrowserProvider(this.ethereum);
        this.walletAddress = "";
        this.connected = false;

    }

    async connectToFlowWallet(){
      await fcl.authenticate().then(()=>{
        this.connected = true;
      }).catch((error)=>{alert(error)});
      let user = await fcl.currentUser.snapshot();
      console.log(user.addr);
      this.walletAddress = `${user.addr}`
      
      const event = new Event("loggedIn");
      window.dispatchEvent(event);
    }

    async connectToMetaMask() {
      try {
        if(!this.ethereum){
          alert("Please install Metamask and configure Hedera Testnet")
          throw Error("Metamask not installed");
      }

        const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
        alert(`Connected to: ${accounts[0]}`);
        this.walletAddress = accounts[0];
        this.walletConnected = true;

        const event = new Event("loggedIn");
        window.dispatchEvent(event);
        return true;
        
      } catch (error) {
        alert("Could not connect to wallet.");
        console.log(error);
        return false;
      }



    }

}