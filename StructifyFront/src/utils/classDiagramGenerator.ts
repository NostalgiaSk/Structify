import type { GeneratedResult, Entity, Relationship } from '../pages/Dashboard/types';

const RELATIONSHIP_NOTATION: Record<Relationship['type'], string> = {
    'one-to-one': ' "1" -- "1" ',
    'one-to-many': ' "1" -- "*" ',
    'many-to-many': ' "*" -- "*" ',
};

function sanitize(name: string): string {
    return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

function generateEntityBlock(entity: Entity): string {
    const safeName = sanitize(entity.name);
    if (!safeName) return '';
    const attributes = entity.attributes
        .filter((attr) => attr.name.trim() && attr.type.trim())
        .map((attr) => {
            const prefix = attr.isPrimary ? '+' : '';
            return `    ${prefix}${attr.type} ${attr.name}`;
        })
        .join('\n');

    return `  class ${safeName} {\n${attributes}\n  }`;
}

function generateRelationshipLine(relationship: Relationship): string {
    const from = sanitize(relationship.from);
    const to = sanitize(relationship.to);
    if (!from || !to) return '';
    const notation = RELATIONSHIP_NOTATION[relationship.type];
    return `  ${from}${notation}${to}`;
}

export function generateClassDiagram(result: GeneratedResult): string {
    const lines: string[] = ['classDiagram'];

    result.entities.forEach((entity) => {
        const block = generateEntityBlock(entity);
        if (block) lines.push(block);
    });

    lines.push('');

    result.relationships.forEach((relationship) => {
        const line = generateRelationshipLine(relationship);
        if (line) lines.push(line);
    });

    return lines.join('\n');
}
