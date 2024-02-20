import { Component } from '@angular/core';

import { ABI, contract } from '../contract';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { CommonModule } from '@angular/common';
import { accounts } from 'web3/lib/commonjs/eth.exports';
import { RouterModule } from '@angular/router';
declare let window: any;
declare const web3: any;

@Component({
  selector: 'app-enter-raffle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enter-raffle.component.html',
  styleUrl: './enter-raffle.component.css',
})
export class EnterRaffleComponent {
  chainId: string | number | symbol | undefined;
  raffleAddress: string | undefined;
  contracts: { [index: string]: any } = {};

  web3Instance: any;
  constractInstance: any;

  entranceFee: any;
  formatedEntranceFee: any;
  numberOfPlayers: any;
  recentWinner: any;
  participant: any[] = [];

  async ngOnInit() {
    this.chainId = Number(
      await window.ethereum.request({
        method: 'eth_chainId',
      })
    );
    for (let key in contract) {
      if (key == this.chainId.toString()) {
        console.log('Succeessfuly found the address.');
        this.contracts = contract;
        this.raffleAddress = this.contracts[key][0];
      } else {
        this.raffleAddress = '';
      }
    }
    if (Object.keys(contract).includes(this.chainId.toString())) {
    }

    this.web3Instance = new Web3(web3.currentProvider);

    this.constractInstance = new this.web3Instance.eth.Contract(
      ABI,
      this.raffleAddress
    );
    this.entranceFee = await this.constractInstance.methods
      .getEntranceFee()
      .call();
    this.formatedEntranceFee = ethers.formatEther(this.entranceFee);
    this.numberOfPlayers = await this.constractInstance.methods
      .getNumberOfPlayers()
      .call();
    this.recentWinner = await this.constractInstance.methods
      .getRecentWinner()
      .call();
  }

  async enterRaffle() {
    console.log(this.participant[0]);
    const transaction = await this.constractInstance.methods
      .enterRaffle({ value: this.entranceFee })
      .send({
        from: this.participant[0],
        value: this.entranceFee,
      })
      .then(async (receipt: any) => {
        if (receipt && receipt.status == 1) {
          this.numberOfPlayers = await this.constractInstance.methods
            .getNumberOfPlayers()
            .call();
        }
      });
    // location.reload();
  }

  async requestAccount() {
    try {
      this.participant = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.enterRaffle();
      return this.participant[0];
    } catch (error) {
      console.error('User denied account access');
      return null;
    }
  }
}
