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
    const attributes = entity.attributes
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
    const notation = RELATIONSHIP_NOTATION[relationship.type];
    return `  ${from}${notation}${to}`;
}

export function generateClassDiagram(result: GeneratedResult): string {
    const lines: string[] = ['classDiagram'];

    result.entities.forEach((entity) => {
        lines.push(generateEntityBlock(entity));
    });

    lines.push('');

    result.relationships.forEach((relationship) => {
        lines.push(generateRelationshipLine(relationship));
    });

    return lines.join('\n');
}
