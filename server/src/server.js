import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './config/seedData.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    const server = app.listen(PORT, () => {
      console.log(`🚀 Dulingo Server running at http://localhost:${PORT}`);
      console.log(`🩺 Health check ready at http://localhost:${PORT}/api/health`);
      console.log(`🔐 Auth API ready at http://localhost:${PORT}/api/auth`);
    });

    const shutdown = () => {
      console.log('\nGracefully shutting down server...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
