# Desarrollo Full-Stack con MERN
## Proyecto OutfitVault
#### Realizado Por: Adrián Ucha, Pablo Barrera, Maurice Darner

# OutfitVault

OutfitVault es una aplicación diseñada para ayudarte a gestionar y organizar tu vestuario. Te permite registrar prendas de ropa, ver las prendas almacenadas en tu "vault", generar combinaciones de outfits, y mucho más.

## Configuración inicial

Para comenzar con el proyecto, sigue los siguientes pasos:

### 1. Configura las claves en el archivo `.env`

Dentro de la carpeta backend, deberás modificar el archivo `.env` con las siguientes claves para asegurar el correcto funcionamiento del backend:

```env
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_api_key
MOONDREAM_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
VITE_API_BASE_URL=http://localhost:5000/
```

### 2. Instala las dependencias

Para instalar las dependencias tanto del backend como del frontend, realiza lo siguiente:

- **Backend**: Ve a la carpeta `backend` y ejecuta:

  ```bash
  npm install
  ```

- **Frontend**: Luego, ve a la carpeta `frontend` y ejecuta:

  ```bash
  npm install
  ```

### 3. Ejecuta el servidor

- **Backend**: En la carpeta `backend`, ejecuta el servidor con el siguiente comando:

  ```bash
  node server.js
  ```

- **Frontend**: En la carpeta `frontend`, ejecuta el siguiente comando para iniciar la aplicación:

  ```bash
  npm run dev
  ```

Ahora podrás acceder a la aplicación en tu navegador en `http://localhost:5000`.

---

## Dependencias

### Backend

El backend de OutfitVault utiliza las siguientes librerías:

```json
"dependencies": {
  "@google/generative-ai": "^0.21.0",
  "axios": "^1.7.9",
  "bcrypt": "^5.1.1",
  "body-parser": "^1.20.3",
  "cloudinary": "^2.5.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "googleapis": "^144.0.0",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.12.0",
  "mongoose": "^8.9.3",
  "moondream": "^0.0.5",
  "multer": "^1.4.5-lts.1"
}
```

### Frontend

El frontend de OutfitVault utiliza las siguientes librerías:

```json
"dependencies": {
  "axios": "^1.7.9",
  "dotenv": "^16.4.7",
  "formik": "^2.4.6",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.1.1",
  "yup": "^1.6.1",
  "zustand": "^5.0.3"
}
```

---

## Guía de usuario

A continuación te presentamos una breve guía sobre cómo navegar y usar la aplicación:

1. **Registro de usuario**: Para registrarte, puedes acceder a la ventana de registro desde cualquier opción del `header` o haciendo clic en uno de los botones del `home`. Una vez registrado, podrás acceder a las funcionalidades del sitio.

![image](https://github.com/user-attachments/assets/222167b5-89ae-4e1e-94a3-4840f957de5a)

![image](https://github.com/user-attachments/assets/1b911fc0-4457-46f1-b1e4-c9b26cbd3d48)


2. **Subir una prenda**: Después de registrarte, en el `header` encontrarás el botón "Agregar". Haz clic ahí para subir la foto de una prenda de ropa. Después de que la foto se cargue correctamente, podrás decidir si agregarla o no a tu "vault".

![image](https://github.com/user-attachments/assets/208b718e-d2e4-41ea-a8d0-176422daea17)

![image](https://github.com/user-attachments/assets/26454acc-9121-4d8d-8382-bab92b089571)

![image](https://github.com/user-attachments/assets/e7c46fe3-ccc9-4c0a-b84f-54296b7fa693)

3. **Ver tus prendas**: En la sección "Vault" podrás ver todas las prendas que has guardado en la aplicación. Ahí tendrás acceso a todas las fotos de ropa que hayas subido.

![image](https://github.com/user-attachments/assets/6e62fadb-043e-4a42-8490-8068dda36e36)

4. **Generar un outfit**: En la opción del `header` que dice "Outfit", podrás pedirle a la aplicación que te sugiera un outfit de acuerdo a las prendas que tienes almacenadas en tu "vault". Solo selecciona las prendas que te gustaría combinar, y la app generará un outfit para ti.

![image](https://github.com/user-attachments/assets/1759b824-8bf5-4dc1-b62c-3b1ddb1aa482)

![image](https://github.com/user-attachments/assets/139e63b5-2c9d-414e-b9d6-3c170c79f89f)

![image](https://github.com/user-attachments/assets/be7eaed0-e16e-4067-b173-84c015fa244b)

5. **Cambiar tu nombre de usuario**: Si deseas cambiar tu nombre de usuario, puedes hacerlo en la última pestaña del `header` en donde podrás modificar tu nombre.

![image](https://github.com/user-attachments/assets/e355d0b9-48cf-4ed0-b71e-cdcf71edf5d6)

![image](https://github.com/user-attachments/assets/8a879ce2-d28f-47dd-b1f9-d8b09e65ca6f)

---

Usuario de prueba:

Username: Ibai133
Password: Ibai12@@

Url de despliegue: https://outfitvault-1.onrender.com/
