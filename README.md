# NodeJs-MernCalendar
Rest Api para aplicacion de Calendario

### Tecnologías
NodeJs v14.15.4

### Catarteristicas 
- MongoDB Atlas (express, mongoose )
- JWT authentication

### Rutas de la API

User Auth
- POST http://localhost:4000/api/auth/register
- POST http://localhost:4000/api/auth/login
- POST http://localhost:4000/api/auth/renew

Events
- GET http://localhost:4000/api/events
- POST http://localhost:4000/api/events
- PUT http://localhost:4000/api/events:id
- DELETE http://localhost:4000/api/events:id
