import { type FC, useMemo } from 'react';
import MermaidDiagram from './MermaidDiagram';
import { generateClassDiagram } from '../../../utils/classDiagramGenerator';
import type { GeneratedResult } from '../types';

interface ClassDiagramViewProps {
    result: GeneratedResult | null;
}

const ClassDiagramView: FC<ClassDiagramViewProps> = ({ result }) => {
    const syntax = useMemo(() => {
        if (!result) return '';
        return generateClassDiagram(result);
    }, [result]);

    return (
        <MermaidDiagram
            syntax={syntax}
            emptyMessage="Generate an architecture to see the Class Diagram"
        />
    );
};

export default ClassDiagramView;
