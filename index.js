const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/categorias", require("./routes/categorias.routes.js"));
app.use("/productos", require("./routes/productos.routes.js"));

app.listen(PORT, () => console.log("servidor levantado en el puerto" + PORT));