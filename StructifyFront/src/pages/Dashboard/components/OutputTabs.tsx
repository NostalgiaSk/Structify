import { type FC } from 'react';
import { Tabs, Card, Empty } from 'antd';
import {
    PartitionOutlined,
    ApartmentOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
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
                    {result ? (
                        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                            {JSON.stringify(result.entities, null, 2)}
                        </pre>
                    ) : (
                        <Empty description="Generate an architecture to see the ER Diagram" />
                    )}
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
                    {result ? (
                        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                            {JSON.stringify(result.relationships, null, 2)}
                        </pre>
                    ) : (
                        <Empty description="Generate an architecture to see the Class Diagram" />
                    )}
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
