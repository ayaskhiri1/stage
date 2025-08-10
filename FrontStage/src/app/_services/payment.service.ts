import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

   private apiUrl = 'http://localhost:8080/api/payment';
  constructor(private http: HttpClient) { }
  
  createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string, certificationTitle: string): Observable<any> {
    const body = {
      priceId: priceId,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      certificationTitle: certificationTitle
    };

    return this.http.post<any>(`${this.apiUrl}/create-session`, body);
  }
}
