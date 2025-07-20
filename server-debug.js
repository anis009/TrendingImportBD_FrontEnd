import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import uploadRoutes from "./modules/upload/upload.route";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS globally
app.use(cors());

// Debug middleware to log all requests to /uploads
app.use("/uploads", (req, res, next) => {
  console.log(`📸 Image request: ${req.method} ${req.url}`);

  // Construct the full file path
  const uploadsDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadsDir, req.url);

  console.log(`📁 Looking for file: ${filePath}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`📁 Current working directory: ${process.cwd()}`);

  // Check if file exists
  const exists = fs.existsSync(filePath);
  console.log(`✅ File exists: ${exists}`);

  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`📊 File size: ${stats.size} bytes`);
    console.log(`📊 File is directory: ${stats.isDirectory()}`);
    console.log(`📊 File is file: ${stats.isFile()}`);
  } else {
    // List contents of parent directory for debugging
    const parentDir = path.dirname(filePath);
    if (fs.existsSync(parentDir)) {
      console.log(`📂 Contents of ${parentDir}:`);
      try {
        const contents = fs.readdirSync(parentDir);
        contents.forEach((item) => console.log(`  - ${item}`));
      } catch (err) {
        console.log(`❌ Error reading directory: ${err.message}`);
      }
    } else {
      console.log(`❌ Parent directory does not exist: ${parentDir}`);
    }
  }

  next();
});

// Static file serving with enhanced CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Set proper content type based on file extension
    const ext = path.extname(req.url).toLowerCase();
    if (ext === ".png") {
      res.setHeader("Content-Type", "image/png");
    } else if (ext === ".jpg" || ext === ".jpeg") {
      res.setHeader("Content-Type", "image/jpeg");
    } else if (ext === ".gif") {
      res.setHeader("Content-Type", "image/gif");
    } else if (ext === ".webp") {
      res.setHeader("Content-Type", "image/webp");
    }

    next();
  },
  express.static(path.join(process.cwd(), "uploads"), {
    setHeaders: (res, filePath) => {
      console.log(`📤 Serving file: ${filePath}`);
    },
    fallthrough: false, // Don't fall through to next middleware if file not found
  })
);

// Catch-all for missing uploads
app.use("/uploads", (req, res) => {
  console.log(`❌ File not found: ${req.url}`);
  res.status(404).json({
    error: "File not found",
    path: req.url,
    message: "The requested image file does not exist",
  });
});

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/upload", uploadRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

// Add a debug endpoint to check server status
app.get("/debug/uploads", (req, res) => {
  const uploadsDir = path.join(process.cwd(), "uploads");

  try {
    const exists = fs.existsSync(uploadsDir);
    let contents = [];

    if (exists) {
      // Recursively list all files in uploads directory
      const getAllFiles = (dir, arrayOfFiles = []) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
          } else {
            const relativePath = path.relative(uploadsDir, fullPath);
            const stats = fs.statSync(fullPath);
            arrayOfFiles.push({
              path: relativePath,
              size: stats.size,
              url: `/uploads/${relativePath.replace(/\\/g, "/")}`,
            });
          }
        });

        return arrayOfFiles;
      };

      contents = getAllFiles(uploadsDir);
    }

    res.json({
      uploadsDirectory: uploadsDir,
      exists,
      fileCount: contents.length,
      files: contents.slice(0, 20), // Limit to first 20 files
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      uploadsDirectory: uploadsDir,
    });
  }
});

// Error handling middleware
app.use(errorHandler);

export default app;
