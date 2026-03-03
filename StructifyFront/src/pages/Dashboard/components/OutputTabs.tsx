import { type FC } from 'react';
import { Tabs, Card, Empty } from 'antd';
import {
    PartitionOutlined,
    ApartmentOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import ERDiagramView from './ERDiagramView';
import ClassDiagramView from './ClassDiagramView';
import type { GeneratedResult } from '../types';

interface OutputTabsProps {
    result: GeneratedResult | null;
}

const OutputTabs: FC<OutputTabsProps> = ({ result }) => {
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
                    <ERDiagramView result={result} />
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
                    <ClassDiagramView result={result} />
                </Card>
            ),
        },
        {
            key: 'notes',
            label: (
                <span>
                    <FileTextOutlined /> Architecture Notes
                </span>
            ),
            children: (
                <Card variant="borderless" style={{ minHeight: 400 }}>
                    {result ? (
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                            {result.architectureNotes}
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
