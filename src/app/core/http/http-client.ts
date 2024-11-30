import axios, {AxiosInstance} from 'axios';
import {InjectionToken} from '@angular/core';

export const httpClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {'Content-Type': 'application/json'}
});

export const HttpClient = new InjectionToken<AxiosInstance>('HttpClient', {
  factory: () => httpClient
});
