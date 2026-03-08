import type { GeneratedResult } from '../pages/Dashboard/types';

function sanitize(name: string): string {
    return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

/**
 * Generates a Mermaid sequence diagram from entities and relationships.
 * Models each entity as a participant and each relationship as a message flow.
 */
export function generateSequenceDiagram(result: GeneratedResult): string {
    if (result.entities.length === 0) return '';

    const lines: string[] = ['sequenceDiagram'];

    // Declare participants
    result.entities.forEach((entity) => {
        const safeName = sanitize(entity.name);
        lines.push(`    participant ${safeName}`);
    });

    lines.push('');

    // Generate interactions from relationships
    if (result.relationships.length > 0) {
        result.relationships.forEach((rel) => {
            const from = sanitize(rel.from);
            const to = sanitize(rel.to);

            switch (rel.type) {
                case 'one-to-one':
                    lines.push(`    ${from}->>+${to}: request`);
                    lines.push(`    ${to}-->>-${from}: response`);
                    break;
                case 'one-to-many':
                    lines.push(`    ${from}->>+${to}: create / fetch`);
                    lines.push(`    ${to}-->>-${from}: collection`);
                    break;
                case 'many-to-many':
                    lines.push(`    ${from}->>+${to}: sync`);
                    lines.push(`    ${to}-->>-${from}: ack`);
                    break;
            }
        });
    } else {
        // Fallback: chain entities together
        for (let i = 0; i < result.entities.length - 1; i++) {
            const from = sanitize(result.entities[i].name);
            const to = sanitize(result.entities[i + 1].name);
            lines.push(`    ${from}->>+${to}: request`);
            lines.push(`    ${to}-->>-${from}: response`);
        }
    }

    return lines.join('\n');
}
