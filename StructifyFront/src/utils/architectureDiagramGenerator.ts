import type { GeneratedResult } from '../pages/Dashboard/types';

function sanitize(name: string): string {
    return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

const RELATIONSHIP_ARROW: Record<string, string> = {
    'one-to-one': '---',
    'one-to-many': '-->',
    'many-to-many': '<-->',
};

const RELATIONSHIP_LABEL: Record<string, string> = {
    'one-to-one': '1:1',
    'one-to-many': '1:N',
    'many-to-many': 'N:N',
};

/**
 * Generates a Mermaid flowchart (system architecture diagram) from entities
 * and relationships. Each entity becomes a node; relationships become edges.
 */
export function generateArchitectureDiagram(result: GeneratedResult): string {
    if (result.entities.length === 0) return '';

    const lines: string[] = ['flowchart TD'];

    // Declare nodes with entity name only for a clean architecture view
    result.entities.forEach((entity) => {
        const id = sanitize(entity.name);
        lines.push(`    ${id}["${entity.name}"]`);
    });

    lines.push('');

    // Draw edges from relationships
    if (result.relationships.length > 0) {
        result.relationships.forEach((rel) => {
            const from = sanitize(rel.from);
            const to = sanitize(rel.to);
            const arrow = RELATIONSHIP_ARROW[rel.type] ?? '-->';
            const label = RELATIONSHIP_LABEL[rel.type] ?? rel.type;
            lines.push(`    ${from} ${arrow}|"${label}"| ${to}`);
        });
    } else {
        // Fallback: chain entities top-down
        for (let i = 0; i < result.entities.length - 1; i++) {
            const from = sanitize(result.entities[i].name);
            const to = sanitize(result.entities[i + 1].name);
            lines.push(`    ${from} --> ${to}`);
        }
    }

    return lines.join('\n');
}
