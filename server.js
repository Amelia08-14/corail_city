// Point d'entrée pour cPanel "Setup Node.js App" (Phusion Passenger).
// Passenger fournit le port via process.env.PORT et attend un serveur HTTP classique.
const { createServer } = require("node:http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`> Corail City prêt sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erreur au démarrage du serveur Next.js :", error);
    process.exit(1);
  });
