import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express CRUD API - Users & Equipment Management",
      version: "1.0.0",
      description:
        "A well-organized Express.js API with TypeScript for managing users and equipment",
      contact: {
        name: "API Support",
        email: "support@company.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://api.company.com"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server test",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../controllers/*.ts"),
    path.join(__dirname, "../models/*.ts"),
    "./openapi.yaml", // Include the main OpenAPI spec file
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null,
    tryItOutEnabled: true,
  },
};
