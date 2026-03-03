export const generatePrompt = (description: string): string => {
    return `Analyze the following project description and generate a structured architecture:

Description: ${description}

Generate:
1. A list of entities with their attributes and types
2. Relationships between entities
3. Architecture notes and recommendations

Return the result as structured JSON.`;
};
