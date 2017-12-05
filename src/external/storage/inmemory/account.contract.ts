import { AccountContract } from '../../../application/entities/contracts/account.contract';
import { Account } from '../../../application/entities/data/account';

export default class InMemoryAccountContract implements AccountContract {
  private accounts: Account[] = [];
  private lastId = 1;

  // TODO fix parameters type. So far express has been passing string parameters
  // to business
  findByUserId(userId: number): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      const accounts = this.accounts.filter((acc) => {
        return acc.userId === userId;
      });

      resolve(accounts || []);
    });
  }

  findById(id: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const account = this.accounts.find((acc) => {
        return acc.id === id;
      });

      resolve(account || null);
    });
  }

  create(userId: number, description: string, balance: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const acc = {
        id: this.lastId++,
        userId: userId,
        description: description,
        balance: balance
      };

      this.accounts.push(acc);

      resolve(acc);
    });
  }
}
