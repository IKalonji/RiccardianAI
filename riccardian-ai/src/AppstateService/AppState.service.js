import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';
import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";
import SignClient from '@walletconnect/sign-client'

export class AppStateService {

    constructor(){
        if (typeof AppStateService.instance === 'object') {
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;
        console.log("instance created");

        // const MMSDK = new MetaMaskSDK();
        // this.ethereum = MMSDK.getProvider();
        // this.provider = new ethers.BrowserProvider(this.ethereum);

        this.bloctoSDK = new BloctoSDK({
          ethereum: {
            chainId: "0x5", // (required) chainId to be used
            rpc: `https://goerli.infura.io/v3/ef5a5728e2354955b562d2ffa4ae5305`, // (required for Ethereum) JSON RPC endpoint
          },
        });

        this.web3 = new Web3(this.bloctoSDK.ethereum);
        
        this.walletAddress = "";
        this.connected = false;

    }

    // async connectToFlowWallet(){
    //   console.log("Connecting to flow");
    //   const accounts = await this.bloctoSDK.ethereum.request({
    //     method: "eth_requestAccounts"
    //   });
    //   this.walletAddress = accounts[0]
    //   this.connected = true;
    //   const event = new Event("loggedIn");
    //   window.dispatchEvent(event);
    // }

    async connectToFlowWallet(){
      console.log("Connecting to flow");
      this.signClient = await SignClient.init({
        projectId: "07f8da139aaf5f1656c0abd166744ea1",
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'Awesome Wallet',
          description: 'Awesome Wallet with FCL Support for WalletConnect',
          url: 'https://deeplink.awesome-wallet.com/',
          icons: ['https://avatars.githubusercontent.com/u/37784886']
        }
      })
      // this.walletAddress = accounts[0]
      this.connected = true;
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