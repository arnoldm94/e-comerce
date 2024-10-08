const express = require('express');
const app = express();
const { typeError } = require('./middlewares/errors');
const PORT = 3000;
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.use(cors());
app.use(express.json());
app.use('/categorias', require('./routes/categorias.routes.js'));
app.use('/productos', require('./routes/productos.routes.js'));
app.use('/pedidos', require('./routes/pedidos.routes.js'));
app.use('/review', require('./routes/review.routes.js'));
app.use('/user', require('./routes/user.routes.js'));

// app.use(typeError);

app.listen(PORT, () => console.log('servidor levantado en el puerto ' + PORT));
