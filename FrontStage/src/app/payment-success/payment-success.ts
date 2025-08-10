import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-payment-success',
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css'
})
export class PaymentSuccess implements OnInit {
  
  sessionId: string | null = null;
  paymentInfo: any = null;
  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (!this.sessionId) {
      this.router.navigate(['/certifications']);
      return;
    }

    // Vérifier session côté backend
    this.http.get<any>(`http://localhost:8080/api/payment/session/${this.sessionId}`)
      .subscribe({
        next: (data) => {
          this.loading = false;
          if (data.paymentStatus === 'paid') {
            const userJson = localStorage.getItem('user');
            if (!userJson) {
              this.router.navigate(['/login']);
              return;
            }

            const user = JSON.parse(userJson);
            const certTitle = data.clientReferenceId || 'Certification obtenue';

            // Ajouter la certification à l’utilisateur
            user.certifications = [...(user.certifications || []), { title: certTitle }];
            localStorage.setItem('user', JSON.stringify(user));

            alert(`✅ Paiement confirmé ! Certification "${certTitle}" ajoutée.`);
          } else {
            alert('❌ Paiement non confirmé.');
            this.router.navigate(['/certifications']);
          }
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la vérification du paiement.');
          this.router.navigate(['/certifications']);
        }
      });
  }
}
