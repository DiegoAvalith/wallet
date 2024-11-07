# Test-back-end-developer


### Para hacer correr el proyecto:
- En la carpeta soap se deben ejecutar dos comandos: npm i y luego crear un archivo .env con las variables tal como están en el archivo env-example. Al final, se debe ejecutar npm start para que el servidor funcione. Si todo va bien, el servicio se levantará en la URL http://127.0.0.1:8000/soap.

- En la carpeta server solo es necesario ejecutar el comando npm i y luego npm run dev. Si todo va bien, el servicio se levantará en la URL http://localhost:3000/api/customer/.

## Curls para pruebas del servicio

- Crear cliente
```
curl --location 'http://localhost:3000/api/customer/create' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Diego Carrion",
  "document": "1111111111",
  "email": "diegoCarrion@gmail.com",
  "phone": "0999999999",
  "password": "esmypasword"
}'
```

- Cargar Wallet
```
curl --location 'http://localhost:3000/api/customer/load-wallet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "document": "1111111111",
    "email": "diegoCarrion@gmail.com,
    "amount": "50.75"
}'
```

- Hacer pago 
```
curl --location 'http://localhost:3000/api/customer/make-payment' \
--header 'Content-Type: application/json' \
--data '{
    "document": "1111111111",
    "senderWallet": "cualquier numero",
    "amount": "20"
}'
```

- Confirmar pago 
```
curl --location 'http://localhost:3000/api/customer/validate-payment' \
--header 'Content-Type: application/json' \
--data '{
    "token": "so lo encuetra en la llamada anterior",
    "transactionId": "se lo encuetra en la llamada anterior"
}'
```
- Ver fondos en la wallet 
```
curl --location 'http://localhost:3000/api/customer/wallet/1111111111'
```

### Observaciones 

- Este proyecto está realizado con Node.js 20 y con MongoDB como base de datos.
- No se está enviando el email con el token de confirmación.
- No se están haciendo sesiones, el token de sesión es el ID que nos genera Mongo.
