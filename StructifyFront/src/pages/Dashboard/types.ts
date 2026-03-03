export interface Entity {
  name: string;
  attributes: {
    name: string;
    type: string;
    isPrimary?: boolean;
  }[];
}

export interface Relationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface GeneratedResult {
  entities: Entity[];
  relationships: Relationship[];
  architectureNotes: string;
}
