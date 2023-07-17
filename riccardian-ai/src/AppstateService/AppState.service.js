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

    async connectToMetamask(){
        if(!this.ethereum){
            alert("Please install Metamask and configure Hedera Testnet")
            throw Error("Metamask not installed");
        }
        const chainId = await this.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x128'){
            try {
                await this.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x128' }] // chainId must be in hexadecimal numbers
                });
              } catch (error) {
                if (error.code === 4902) {
                  try {
                    await this.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainName: 'Hedera Testnet',
                          chainId: '0x128',
                          nativeCurrency: {
                            name: 'HBAR',
                            symbol: 'HBAR',
                            decimals: 18
                          },
                          rpcUrls: ['https://testnet.hashio.io/api']
                        },
                      ],
                    });
                  } catch (addError) {
                    console.error(addError);
                  }
                }
                console.error(error);
              }
        }
        //connect
        this.ethereum.request({ method: 'eth_requestAccounts', params: [] }).then((data) => {
        this.walletAddress = data[0];
        this.connected = true;
        const event = new Event("loggedIn");
        window.dispatchEvent(event);
        this.contractIsUserMemeber();       
        }).catch((error) => {
            alert("Could not connect: ", error)
        })


    }

}