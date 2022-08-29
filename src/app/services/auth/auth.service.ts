import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // save an item as key-value pair into localStorage
  save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // get item from localStorage using key
  get(key: string) {
    return localStorage.getItem(key);
  }

  // remove all items in localStorage
  clear() {
    localStorage.clear();
  }
}