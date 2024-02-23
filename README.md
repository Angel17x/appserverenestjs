# Configuración
  - Recuerda crear tus archivos de configuración *.yaml (hasta el momento solo esta en desarrollo)
  - En infraestructures/config/interfaces está la interfaz para saber las variables del yaml

# Configuración de Variables de Entorno

Para configurar las variables de entorno manualmente, sigue estos pasos:

1. Crea un archivo `.env` en la raíz del proyecto.

2. Abre el archivo `.env` en tu editor de texto.

3. Agrega las siguientes variables de entorno con tus valores específicos:

```env
# JWT Configuración
JWT_SECRET=tu_jwt_secret
JWT_EXPIRES_IN=tu_expires_in

# Configuración de la Base de Datos
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=tu_usuario_de_base_de_datos
DATABASE_PASSWORD=tu_contraseña_de_base_de_datos
DATABASE_NAME=tu_nombre_de_base_de_datos

# Configuración del servidor
SERVER_GLOBALPIPE_FORBID_NON_WHITE_LISTED=true/false
SERVER_GLOBALPIPE_TRANSFORM=true/false
SERVER_GLOBALPIPE_WHITELIST=true/false
SERVER_NODE_ENV=tu_node_env 
SERVER_PORT=tu_puerto