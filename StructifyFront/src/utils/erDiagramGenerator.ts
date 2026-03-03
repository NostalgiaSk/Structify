import type { GeneratedResult, Relationship } from '../pages/Dashboard/types';

const RELATIONSHIP_NOTATION: Record<string, string> = {
    'one-to-one': '||--||',
    'one-to-many': '||--o{',
    'many-to-many': '}o--o{',
};

function sanitize(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '');
}

function sanitizeType(type: string): string {
    return type.replace(/[^a-zA-Z0-9]/g, '');
}

function getNotation(type: Relationship['type']): string {
    return RELATIONSHIP_NOTATION[type] || '||--o{';
}

export function generateErDiagram(result: GeneratedResult): string {
    const lines: string[] = ['erDiagram'];

    result.entities.forEach((entity) => {
        const safeName = sanitize(entity.name);
        if (!safeName) return;
        lines.push(`    ${safeName} {`);
        entity.attributes.forEach((attr) => {
            const safeType = sanitizeType(attr.type) || 'string';
            const safeProp = sanitize(attr.name) || 'field';
            const pk = attr.isPrimary ? ' PK' : '';
            lines.push(`        ${safeType} ${safeProp}${pk}`);
        });
        lines.push('    }');
    });

    result.relationships.forEach((relationship) => {
        const from = sanitize(relationship.from);
        const to = sanitize(relationship.to);
        if (!from || !to) return;
        const notation = getNotation(relationship.type);
        lines.push(`    ${from} ${notation} ${to} : relates`);
    });

    return lines.join('\n');
}
