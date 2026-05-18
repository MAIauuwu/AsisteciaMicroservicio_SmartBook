# Asistencia Microservicio - SmartBook

Sistema completo de gestiÃ³n de asistencia con backend Spring Boot y frontend React.

## Estructura del Proyecto

```
AsistenciaMicroservicio_smartbook/
â”œâ”€â”€ backend/                 # Spring Boot 3.x API
â”‚   â”œâ”€â”€ src/main/java/
â”‚   â”‚   â””â”€â”€ org/bubbleplat/asistencia/
â”‚   â”‚       â”œâ”€â”€ config/          # Security config
â”‚   â”‚       â”œâ”€â”€ controller/      # REST endpoints
â”‚   â”‚       â”œâ”€â”€ service/         # Business logic
â”‚   â”‚       â”œâ”€â”€ repository/      # JPA repositories
â”‚   â”‚       â”œâ”€â”€ model/           # Entities & DTOs
â”‚   â”‚       â””â”€â”€ exception/       # Error handling
â”‚   â”œâ”€â”€ src/main/resources/
â”‚   â”‚   â””â”€â”€ application.yml
â”‚   â””â”€â”€ pom.xml
â”œâ”€â”€ frontend/                # React + Vite + TypeScript
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/        # UI components
â”‚   â”‚   â”œâ”€â”€ pages/             # Page components
â”‚   â”‚   â”œâ”€â”€ services/          # API services
â”‚   â”‚   â””â”€â”€ types/             # TypeScript types
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ vite.config.ts
â”œâ”€â”€ docker-compose.yml
â””â”€â”€ README.md
```

## TecnologÃ­as

### Backend
- **Java 17** + **Spring Boot 3.2.5**
- **Spring Data JPA** con PostgreSQL
- **Spring Security** (Basic Auth)
- **Bean Validation**
- **Lombok**

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **React Router** (navegaciÃ³n)
- **Axios** (HTTP client)

## Requisitos

- Java 17+
- Node.js 18+
- Docker & Docker Compose (opcional)
- PostgreSQL 16+ (o Docker)

## Inicio RÃ¡pido

### Con Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- PostgreSQL: localhost:5432

### Desarrollo Local

#### Backend

```bash
cd backend
# Configura PostgreSQL y ejecuta:
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Credenciales

| Rol | Usuario | ContraseÃ±a |
|-----|---------|------------|
| Admin | admin | admin123 |
| User | user | user123 |

## API Endpoints

Base URL: `http://localhost:8080/api/asistencias`

| MÃ©todo | Endpoint | DescripciÃ³n |
|--------|----------|-------------|
| `POST` | `/asistencias` | Crear asistencia |
| `GET` | `/asistencias` | Listar todas |
| `GET` | `/asistencias/{id}` | Obtener por ID |
| `PUT` | `/asistencias/{id}` | Actualizar |
| `DELETE` | `/asistencias/{id}` | Eliminar |
| `GET` | `/asistencias/usuario/{userId}` | Por usuario |
| `GET` | `/asistencias/fecha/{fecha}` | Por fecha |
| `GET` | `/asistencias/estado/{estado}` | Por estado |

## Estados VÃ¡lidos

- `PRESENTE`
- `AUSENTE`
- `TARDANZA`
- `PERMISO`
- `JUSTIFICADO`
