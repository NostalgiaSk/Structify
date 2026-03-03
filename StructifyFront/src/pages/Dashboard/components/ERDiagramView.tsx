import { type FC, useMemo } from 'react';
import MermaidDiagram from './MermaidDiagram';
import { generateErDiagram } from '../../../utils/erDiagramGenerator';
import type { GeneratedResult } from '../types';

interface ERDiagramViewProps {
    result: GeneratedResult | null;
}

const ERDiagramView: FC<ERDiagramViewProps> = ({ result }) => {
    const syntax = useMemo(() => {
        if (!result) return '';
        return generateErDiagram(result);
    }, [result]);

    return (
        <MermaidDiagram
            syntax={syntax}
            emptyMessage="Generate an architecture to see the ER Diagram"
        />
    );
};

export default ERDiagramView;
