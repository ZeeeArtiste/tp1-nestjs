# TP NEST JS

## Prérequis

- Nest (et ses prérequis)
- Serveur mysql avec les paramètres suivants, sinon à adapter:
  - type: 'mariadb',
  - host: 'localhost',
  - port: 3306,
  - username: 'root',
  - password: '',
  - database: 'tp1nest'

## Présentation

Il s'agit d'une mini api de réservation d'événements, elle permet :

- de se créer un compte
- gérer l'authentification via un token et un middleware
- de créer un événement
- de réserver un événement (route privée, la seule pour faciliter les test, précisez "Bearer" devant le token dans l'entête "Authorization")

## Fonctionnement

### Création d'un compte :

POST http://127.0.0.1:3000/users/ (name, email, password)

### Se connecter :

POST http://127.0.0.1:3000/auth/login (email, password) => renvoi un token

### Evénements

#### Créer

POST http://127.0.0.1:3000/events/ (name, description, date, location, capacity)

#### Récupérer

GET http://127.0.0.1:3000/events/

### Réservation

#### Créer

POST http://127.0.0.1:3000/protected-route/reservations (eventId, userId, reservationDate)

#### Récupérer

GET http://127.0.0.1:3000/protected-route/reservations
