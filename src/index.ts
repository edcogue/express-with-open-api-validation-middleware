import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes";
import { swaggerSpec, swaggerOptions } from "./config/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

// OpenAPI validation middleware
// app.use(openApiValidation);

// Routes
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Express CRUD API Server",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      health: "/health",
      documentation: "/api-docs",
    },
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  // 7. Customize errors
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 API Documentation available at:`);
  console.log(`   - Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`📊 API Endpoints:`);
  console.log(`   - Users: http://localhost:${PORT}/api/users`);
  console.log(`   - Health Check: http://localhost:${PORT}/health`);
});

export default app;
