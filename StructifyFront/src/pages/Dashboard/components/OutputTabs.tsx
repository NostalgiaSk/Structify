import { type FC, useMemo } from 'react';
import { Tabs, Card, Empty } from 'antd';
import {
    PartitionOutlined,
    ApartmentOutlined,
    FileTextOutlined,
    SwapOutlined,
    ClusterOutlined,
} from '@ant-design/icons';
import MermaidRenderer from '../../../components/diagram/MermaidRenderer';
import { generateErDiagram } from '../../../utils/erDiagramGenerator';
import { generateClassDiagram } from '../../../utils/classDiagramGenerator';
import { generateSequenceDiagram } from '../../../utils/sequenceDiagramGenerator';
import { generateArchitectureDiagram } from '../../../utils/architectureDiagramGenerator';
import type { GeneratedResult } from '../types';

interface OutputTabsProps {
    result: GeneratedResult | null;
}

const OutputTabs: FC<OutputTabsProps> = ({ result }) => {
    const erSyntax = useMemo(() => {
        if (result?.diagrams?.erDiagram) return result.diagrams.erDiagram;
        if (!result) return '';
        return generateErDiagram(result);
    }, [result]);

    const classSyntax = useMemo(() => {
        if (result?.diagrams?.classDiagram) return result.diagrams.classDiagram;
        if (!result) return '';
        return generateClassDiagram(result);
    }, [result]);

    const sequenceSyntax = useMemo(() => {
        if (result?.diagrams?.sequenceDiagram) return result.diagrams.sequenceDiagram;
        if (!result) return '';
        return generateSequenceDiagram(result);
    }, [result]);

    const architectureSyntax = useMemo(() => {
        if (result?.diagrams?.architectureDiagram) return result.diagrams.architectureDiagram;
        if (!result) return '';
        return generateArchitectureDiagram(result);
    }, [result]);
    const architectureNotes = result?.diagrams?.architectureNotes ?? result?.architectureNotes ?? '';

    const items = [
        {
            key: 'erd',
            label: (
                <span>
                    <PartitionOutlined /> ER Diagram
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    <MermaidRenderer diagram={erSyntax} id="er-diagram" />
                </Card>
            ),
        },
        {
            key: 'class',
            label: (
                <span>
                    <ApartmentOutlined /> Class Diagram
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    <MermaidRenderer diagram={classSyntax} id="class-diagram" />
                </Card>
            ),
        },
        {
            key: 'sequence',
            label: (
                <span>
                    <SwapOutlined /> Sequence Diagram
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    <MermaidRenderer diagram={sequenceSyntax} id="sequence-diagram" />
                </Card>
            ),
        },
        {
            key: 'architecture',
            label: (
                <span>
                    <ClusterOutlined /> Architecture Diagram
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    <MermaidRenderer diagram={architectureSyntax} id="architecture-diagram" />
                </Card>
            ),
        },
        {
            key: 'notes',
            label: (
                <span>
                    <FileTextOutlined /> Notes
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    {architectureNotes ? (
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                            {architectureNotes}
                        </p>
                    ) : (
                        <Empty description="Generate an architecture to see the Notes" />
                    )}
                </Card>
            ),
        },
    ];

    return <Tabs defaultActiveKey="erd" items={items} size="large" />;
};

export default OutputTabs;
