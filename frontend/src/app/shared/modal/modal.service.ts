import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {

  private modals: any[] = [];

  // Add modal to array of active modals
  add = (modal: any) => this.modals.push(modal);

  // Remove modal from array of active modals
  remove = (id: string) => this.modals = this.modals.filter(x => x.id !== id);

  // Open a modal by id
  open = (id: string) => {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  // Close a modal by id
  close = (id: string) => {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}