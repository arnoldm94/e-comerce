const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/productos", require("./routes/productos.routes"));

app.listen(PORT, () => console.log("Servidor levantado en el puerto " + PORT));
