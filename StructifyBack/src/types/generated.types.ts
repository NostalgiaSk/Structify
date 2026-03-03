export interface EntityAttribute {
    name: string;
    type: string;
    isPrimary?: boolean;
}

export interface Entity {
    name: string;
    attributes: EntityAttribute[];
}

export interface Relationship {
    from: string;
    to: string;
    type: "one-to-one" | "one-to-many" | "many-to-many";
}

export interface GeneratedResult {
    entities: Entity[];
    relationships: Relationship[];
    architectureNotes: string;
}

export interface GenerateRequest {
    description: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
}
