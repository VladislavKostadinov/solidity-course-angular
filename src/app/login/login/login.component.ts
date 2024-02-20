import { Component } from '@angular/core';
import { from } from 'rxjs';
import Web3 from 'web3';
import { ABI } from '../../contract.js';
import Moralis from 'moralis/.';
import { RouterModule } from '@angular/router';
declare const web3: any;

declare let window: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private contractAddress = '0x8BD210896F7e773ea6EafB9A15551fa02A4de8F9';
  public connectedAccount = '';
  public ABI = ABI;
  accounts: any = [];
  private web3Instance: any;
  private _tokenContractAddress: string =
    '0x8BD210896F7e773ea6EafB9A15551fa02A4de8F9';
  private contractInstance: any;
  disabledDueMetamask: boolean = false;

  constructor() {
    // this.getUserBalance().then((balance) => console.log(balance));
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3Instance = new Web3(web3.currentProvider);
      this.contractInstance = new this.web3Instance.eth.Contract(
        this.ABI,
        this.contractAddress
      );
      this.web3Instance.eth.getAccounts();
    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use our app.
    }
  }
  async ngOnInit() {
    this.disabledDueMetamask = false;
    this.accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (!this.accounts.length) {
      localStorage.removeItem('connected');
    }
    if (localStorage.getItem('connected')) {
      this.disabledDueMetamask = true;
      console.log('Account already connected');
      this.connectedAccount =
        this.accounts[0].slice('0x', 4) +
        '...' +
        this.accounts[0].slice(-4, this.accounts[0].length - 1);
    } else {
      this.connectedAccount = 'No account connected';
    }
  }

  getAccounts(): Promise<any> {
    return this.web3Instance.eth.getAccounts();
  }

  signUp(): Promise<any> {
    return this.contractInstance.methods.enterRaffle({ value: '0.001' });
  }

  async connectWallet() {
    if (window.ethereum !== undefined) {
      this.disabledDueMetamask = true;
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        localStorage.setItem('connected', 'injected');
        this.connectedAccount =
          this.accounts[0].slice('0x', 4) +
          '...' +
          this.accounts[0].slice(-4, this.accounts[0].length - 1);
        console.log('Connected');
      } catch (err) {
        console.log(err);
      }
    } else {
      this.connectedAccount = 'No wallet connected';

      console.log('Whops, you need to download a Wallet first.');
    }
  }

  async checkAccount() {
    this.accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (this.accounts.length) {
      console.log(`You've connected to ${this.accounts[0]}`);
      this.connectedAccount =
        this.accounts[0].slice('0x', 4) +
        '...' +
        this.accounts[0].slice(-4, this.accounts[0].length - 1);
    } else {
      console.log('Not connected');

      this.connectedAccount = 'Not connected to MetaMask';
    }
  }
}
