import { initServer } from "./app";

const PORT = process.env.PORT;

const startServer = async () => {
  const app = await initServer();

  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
