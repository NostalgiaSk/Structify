import { GeneratedResult } from "../types/generated.types";
import { logger } from "../utils/logger";

export async function generateArchitecture(description: string): Promise<GeneratedResult> {
    logger.info("Generating architecture", { descriptionLength: description.length });

    const result: GeneratedResult = {
        entities: [
            {
                name: "User",
                attributes: [
                    { name: "id", type: "UUID", isPrimary: true },
                    { name: "email", type: "string" },
                    { name: "name", type: "string" },
                    { name: "createdAt", type: "Date" },
                ],
            },
            {
                name: "Project",
                attributes: [
                    { name: "id", type: "UUID", isPrimary: true },
                    { name: "title", type: "string" },
                    { name: "description", type: "string" },
                    { name: "ownerId", type: "UUID" },
                    { name: "createdAt", type: "Date" },
                ],
            },
            {
                name: "Component",
                attributes: [
                    { name: "id", type: "UUID", isPrimary: true },
                    { name: "name", type: "string" },
                    { name: "type", type: "string" },
                    { name: "projectId", type: "UUID" },
                ],
            },
        ],
        relationships: [
            { from: "User", to: "Project", type: "one-to-many" },
            { from: "Project", to: "Component", type: "one-to-many" },
        ],
        architectureNotes:
            `Based on the description: "${description.substring(0, 80)}...", ` +
            "a modular architecture with clear separation of concerns is recommended. " +
            "Use a layered approach with controllers, services, and data access layers.",
    };

    logger.info("Architecture generated successfully", {
        entityCount: result.entities.length,
        relationshipCount: result.relationships.length,
    });

    return result;
}
