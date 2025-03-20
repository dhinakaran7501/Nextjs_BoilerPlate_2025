import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

export async function GET() {
  try {
    // Read the YAML file
    const filePath = join(process.cwd(), "public", "swagger", "openapi.yaml");
    const yamlContent = readFileSync(filePath, "utf8");

    // Parse YAML to JSON
    const swaggerSpec = yaml.load(yamlContent);

    return Response.json(swaggerSpec);
  } catch (error) {
    console.error("Error loading Swagger specification:", error);
    return Response.json(
      { error: "Failed to load API specifications" },
      { status: 500 },
    );
  }
}
