## TODO technique – Statistiques avancées dashboard admin

- [ ] **Chiffre d’affaires** (`GET /admin/dashboard/revenue`)
  - [ ] Use case : `GetRevenueStatsUseCase` (calcul total, today, week, month)
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Top utilisateurs** (`GET /admin/dashboard/top-users`)
  - [ ] Use case : `GetTopUsersUseCase` (classement par nombre de réservations)
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Taux d’annulation** (`GET /admin/dashboard/cancellation-rate`)
  - [ ] Use case : `GetCancellationRateUseCase` (calcul % annulation bookings/trips)
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Répartition des paiements** (`GET /admin/dashboard/payment-methods`)
  - [ ] Use case : `GetPaymentMethodsStatsUseCase`
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Nouveaux utilisateurs** (`GET /admin/dashboard/new-users`)
  - [ ] Use case : `GetNewUsersStatsUseCase` (today, week, month)
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Voyages complets** (`GET /admin/dashboard/full-trips`)
  - [ ] Use case : `GetFullTripsStatsUseCase` (taux de remplissage = 100%) 
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

- [ ] **Alertes spécifiques** (`GET /admin/dashboard/alerts`)
  - [ ] Use case : `GetDashboardAlertsUseCase` (voyages sans conducteur, sans réservations, etc.)
  - [ ] Route/controller + schéma Zod/OpenAPI
  - [ ] Tests unitaires et intégration
  - [ ] Doc payload et critères d’acceptation

> Pour chaque statistique : respecter l’architecture hexagonale (use case, controller, validation, doc, tests).
> Ajouter la doc OpenAPI et la section correspondante dans la doc technique.

---

## TODO technique – Implémentation des endpoints avancés du dashboard admin

### Domaine : Admin / Dashboard

- [ ] **Chiffre d’affaires** (`GET /admin/dashboard/revenue`)
  - Use case : Afficher le chiffre d’affaires total et par période (jour, semaine, mois)
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne les montants agrégés
  - Exceptions : Aucun paiement enregistré → valeurs à 0
  - Critères d’acceptation : Les montants sont corrects et à jour
  - Paramètres : header (Authorization), query (période?)
  - Exemple de retour :
    ```json
    {
      "revenue": {
        "total": 12000,
        "today": 500,
        "week": 3200,
        "month": 9000
      }
    }
    ```
  - Tâches :
    - [ ] Use case `get-revenue.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Top utilisateurs** (`GET /admin/dashboard/top-users`)
  - Use case : Afficher les utilisateurs ayant effectué le plus de réservations
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne le classement des utilisateurs
  - Exceptions : Aucun utilisateur → liste vide
  - Critères d’acceptation : Classement correct, à jour
  - Paramètres : header (Authorization), query (limit?)
  - Exemple de retour :
    ```json
    {
      "topUsers": [
        { "userId": "u1", "userName": "Alice", "bookings": 12 }
      ]
    }
    ```
  - Tâches :
    - [ ] Use case `get-top-users.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Taux d’annulation** (`GET /admin/dashboard/cancellation-rate`)
  - Use case : Afficher le taux d’annulation des réservations et des voyages
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne les pourcentages
  - Exceptions : Aucun historique → taux à 0%
  - Critères d’acceptation : Calcul correct, à jour
  - Paramètres : header (Authorization)
  - Exemple de retour :
    ```json
    {
      "cancellationRate": {
        "bookings": 8.5,
        "trips": 3.2
      }
    }
    ```
  - Tâches :
    - [ ] Use case `get-cancellation-rate.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Répartition des paiements par méthode** (`GET /admin/dashboard/payment-methods`)
  - Use case : Visualiser la répartition des paiements par type (CB, Stripe, espèces, etc.)
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne la distribution
  - Exceptions : Aucun paiement → liste vide
  - Critères d’acceptation : Répartition correcte, à jour
  - Paramètres : header (Authorization)
  - Exemple de retour :
    ```json
    {
      "paymentMethods": [
        { "method": "CB", "count": 80 },
        { "method": "Stripe", "count": 40 }
      ]
    }
    ```
  - Tâches :
    - [ ] Use case `get-payment-methods.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Nouveaux utilisateurs** (`GET /admin/dashboard/new-users`)
  - Use case : Afficher le nombre de nouveaux inscrits sur la période
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne les totaux par période
  - Exceptions : Aucun nouvel utilisateur → valeurs à 0
  - Critères d’acceptation : Totaux corrects, à jour
  - Paramètres : header (Authorization), query (période?)
  - Exemple de retour :
    ```json
    {
      "newUsers": {
        "today": 2,
        "week": 15,
        "month": 40
      }
    }
    ```
  - Tâches :
    - [ ] Use case `get-new-users.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Voyages complets** (`GET /admin/dashboard/full-trips`)
  - Use case : Afficher le nombre de voyages complets (taux de remplissage = 100%)
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne le nombre de voyages complets
  - Exceptions : Aucun voyage complet → valeur à 0
  - Critères d’acceptation : Nombre correct, à jour
  - Paramètres : header (Authorization)
  - Exemple de retour :
    ```json
    {
      "fullTrips": 5
    }
    ```
  - Tâches :
    - [ ] Use case `get-full-trips.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

- [ ] **Alertes spécifiques** (`GET /admin/dashboard/alerts`)
  - Use case : Lister les alertes importantes (ex : voyages sans conducteur, sans réservations, etc.)
  - Scénario nominal : L’admin consulte le dashboard, l’API retourne la liste des alertes
  - Exceptions : Aucune alerte → liste vide
  - Critères d’acceptation : Liste correcte, à jour
  - Paramètres : header (Authorization)
  - Exemple de retour :

    ```json
    {
      "alerts": [
        "Voyage t5 sans conducteur assigné",
        "Voyage t8 sans réservation"
      ]
    }
    ```

  - Tâches :
    - [ ] Use case `get-alerts.use-case.ts`
    - [ ] Route/controller
    - [ ] Schéma Zod + OpenAPI
    - [ ] Tests unitaires & intégration
    - [ ] Documentation

---