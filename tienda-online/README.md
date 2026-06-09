# Tienda Online API — TAW-251

API REST para gestión de tienda online.  
**NestJS 10 · TypeORM 0.3 · PostgreSQL 15 · Render.com**

---

## Índice

1. [Correr en local](#1-correr-en-local)
2. [Correr en GitHub Codespaces](#2-correr-en-github-codespaces)
3. [Deploy en Render.com — paso a paso](#3-deploy-en-rendercom--paso-a-paso)
4. [Endpoints](#4-endpoints)
5. [Ejemplos de uso](#5-ejemplos-de-uso)

---

## 1. Correr en local

### Prerrequisitos
- Node.js >= 18
- Docker (para levantar PostgreSQL) o PostgreSQL instalado

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/tienda-online.git
cd tienda-online

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# El .env.example ya tiene los valores correctos para desarrollo local

# 4. Levantar PostgreSQL con Docker
docker compose up -d postgres
# Espera ~5 segundos. Verifica con:
docker compose logs postgres
# Debe mostrar: "database system is ready to accept connections"

# 5. Arrancar la API en modo desarrollo
npm run start:dev
```

La API queda disponible en `http://localhost:3000`

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000/api` | Swagger UI |
| `http://localhost:3000/scalar` | Scalar Docs |

---

## 2. Correr en GitHub Codespaces

### Pasos
1. En el repositorio → botón verde **Code** → pestaña **Codespaces** → **Create codespace on main**
2. El devcontainer instala Node 20 y Docker automáticamente (espera ~2 min)
3. Abre la terminal integrada y ejecuta:

```bash
# PostgreSQL ya debería estar corriendo (postStartCommand)
# Si no, ejecútalo manualmente:
docker compose up -d postgres

# Copiar env (ya configurado para local)
cp .env.example .env

# Arrancar
npm run start:dev
```

4. Codespaces mostrará un popup con el puerto 3000 → clic en **Open in Browser**

---

## 3. Deploy en Render.com — paso a paso

### Prerrequisitos
- Cuenta gratuita en [render.com](https://render.com)
- Código subido a un repositorio GitHub público o privado

---

### Paso 1 — Subir el código a GitHub

```bash
# En la raíz del proyecto
git init
git add .
git commit -m "feat: tienda online API inicial"

# Crear el repo en GitHub (github.com → New repository → tienda-online)
git remote add origin https://github.com/<tu-usuario>/tienda-online.git
git push -u origin main
```

> ⚠️ Verifica que `.env` **no** aparezca en el commit. Solo debe existir `.env.example`.

---

### Paso 2 — Crear la base de datos PostgreSQL en Render

1. Ir a [dashboard.render.com](https://dashboard.render.com)
2. Clic en **New +** → **PostgreSQL**
3. Completar el formulario:

| Campo | Valor |
|-------|-------|
| Name | `tienda-online-db` |
| Database | `tienda_online` |
| User | `tienda_user` |
| Region | Oregon (US West) — o el más cercano |
| Plan | **Free** |

4. Clic en **Create Database**
5. Esperar ~1 minuto a que el estado diga **Available**
6. En la página de la base de datos, ir a la sección **Connections**
7. Copiar y guardar estos valores (los necesitarás en el Paso 3):

```
Host:     dpg-xxxxxxx.oregon-postgres.render.com
Port:     5432
Database: tienda_online
Username: tienda_user
Password: xxxxxxxxxxxxxxxxxxxx
```

---

### Paso 3 — Crear el Web Service en Render

1. Clic en **New +** → **Web Service**
2. Conectar con GitHub → seleccionar el repositorio `tienda-online`
3. Completar el formulario:

| Campo | Valor |
|-------|-------|
| Name | `tienda-online-api` |
| Region | Oregon (US West) — **mismo que la DB** |
| Branch | `main` |
| Runtime | **Node** |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start:prod` |
| Plan | **Free** |

4. Bajar hasta la sección **Environment Variables** y agregar estas 5 variables (usar los valores copiados en el Paso 2):

| Key | Value |
|-----|-------|
| `DB_HOST` | `dpg-xxxxxxx.oregon-postgres.render.com` |
| `DB_PORT` | `5432` |
| `DB_USERNAME` | `tienda_user` |
| `DB_PASSWORD` | `xxxxxxxxxxxxxxxxxxxx` |
| `DB_NAME` | `tienda_online` |

> ⚠️ **No agregues PORT** — Render lo inyecta automáticamente.

5. Clic en **Create Web Service**

---

### Paso 4 — Verificar el deploy

Render ejecuta automáticamente:
```
npm install && npm run build   ← Build Command
npm run start:prod             ← Start Command
```

En la pestaña **Logs** puedes ver el progreso. Cuando aparezca:
```
🚀  API corriendo en: http://0.0.0.0:10000
```
El deploy fue exitoso.

---

### Paso 5 — Probar la API pública

Tu URL pública tendrá el formato:
```
https://tienda-online-api.onrender.com
```

Verifica que funcione:

```bash
# Documentación (requerida por la práctica)
https://tienda-online-api.onrender.com/api     ← Swagger UI
https://tienda-online-api.onrender.com/scalar  ← Scalar Docs

# Endpoints de prueba
curl https://tienda-online-api.onrender.com/clientes
curl https://tienda-online-api.onrender.com/categorias
curl https://tienda-online-api.onrender.com/productos
curl https://tienda-online-api.onrender.com/ordenes
curl https://tienda-online-api.onrender.com/orden_producto
```

> 💡 **Nota sobre el plan Free de Render:** El servicio se "duerme" tras 15 minutos de inactividad. La primera petición puede tardar ~30 segundos en responder mientras el servicio despierta. Esto es normal en el plan gratuito.

---

### Solución de problemas comunes en Render

| Error en logs | Causa | Solución |
|--------------|-------|----------|
| `ECONNREFUSED` al conectar DB | Variables de entorno incorrectas | Revisar DB_HOST, DB_PASSWORD en Environment |
| `Cannot find module 'dist/main'` | Build falló | Revisar logs del build, verificar tsconfig |
| `Error: listen EADDRINUSE` | Puerto fijo en código | Verificar que `main.ts` usa `process.env.PORT` |
| Servicio se reinicia en loop | Error en la app al iniciar | Revisar logs, probablemente falta una variable de entorno |

---

## 4. Endpoints

### Clientes `/clientes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/clientes` | Listar todos |
| GET | `/clientes/:id` | Obtener por ID (con órdenes) |
| POST | `/clientes` | Crear |
| PATCH | `/clientes/:id` | Actualizar |
| DELETE | `/clientes/:id` | Eliminar (soft) |

### Categorías `/categorias`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/categorias` | Listar todas |
| GET | `/categorias/:id` | Obtener (con productos) |
| POST | `/categorias` | Crear |
| PATCH | `/categorias/:id` | Actualizar |
| DELETE | `/categorias/:id` | Eliminar (soft) |

### Productos `/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/productos` | Listar todos (con categoría) |
| GET | `/productos/:id` | Obtener (con categoría) |
| POST | `/productos` | Crear |
| PATCH | `/productos/:id` | Actualizar |
| DELETE | `/productos/:id` | Eliminar (soft) |

### Órdenes `/ordenes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ordenes` | Listar todas |
| GET | `/ordenes/:id` | Obtener (con productos) |
| POST | `/ordenes` | Crear |
| PATCH | `/ordenes/:id` | Actualizar estado |
| DELETE | `/ordenes/:id` | Eliminar (soft) |

### Orden-Producto `/orden_producto`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/orden_producto` | Listar todos |
| GET | `/orden_producto/:id` | Obtener por ID |
| POST | `/orden_producto` | Agregar producto a orden |
| PATCH | `/orden_producto/:id` | Actualizar cantidad/precio |
| DELETE | `/orden_producto/:idOrden/productos/:productId` | Quitar producto de orden |

---

## 5. Ejemplos de uso

```bash
BASE=http://localhost:3000
# En producción: BASE=https://tienda-online-api.onrender.com

# Crear categoría
curl -X POST $BASE/categorias \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Electrónica","descripcion":"Gadgets y más"}'

# Crear cliente
curl -X POST $BASE/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombres":"Juan","paterno":"García","materno":"López","email":"juan@test.com"}'

# Crear producto (requiere idCategoria existente)
curl -X POST $BASE/productos \
  -H "Content-Type: application/json" \
  -d '{"idCategoria":1,"nombre":"Laptop HP","precio":599.99,"stock":10}'

# Crear orden (requiere idCliente existente)
curl -X POST $BASE/ordenes \
  -H "Content-Type: application/json" \
  -d '{"idCliente":1}'

# Agregar producto a la orden
curl -X POST $BASE/orden_producto \
  -H "Content-Type: application/json" \
  -d '{"idOrden":1,"idProducto":1,"cantidad":2,"precio_unitario":599.99}'

# Ver la orden completa con productos y total calculado
curl $BASE/ordenes/1
```
