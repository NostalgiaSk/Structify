import { type FC, useMemo, useCallback } from 'react';
import { Space, Button, Dropdown } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import MermaidDiagram from './MermaidDiagram';
import { generateClassDiagram } from '../../../utils/classDiagramGenerator';
import { exportSVG, exportPNG } from '../../../utils/diagramExport';
import type { GeneratedResult } from '../types';

const DIAGRAM_CONTAINER_ID = 'structify-class-diagram';

interface ClassDiagramViewProps {
    result: GeneratedResult | null;
}

const ClassDiagramView: FC<ClassDiagramViewProps> = ({ result }) => {
    const syntax = useMemo(() => {
        if (!result) return '';
        return generateClassDiagram(result);
    }, [result]);

    const handleExportMenuClick: MenuProps['onClick'] = useCallback(
        (info: { key: string }) => {
            if (info.key === 'svg') {
                exportSVG(DIAGRAM_CONTAINER_ID);
            } else if (info.key === 'png') {
                exportPNG(DIAGRAM_CONTAINER_ID);
            }
        },
        [],
    );

    const exportMenuItems: MenuProps['items'] = [
        { key: 'svg', label: 'Export as SVG' },
        { key: 'png', label: 'Export as PNG' },
    ];

    return (
        <>
            {result && (
                <Space style={{ marginBottom: 12 }}>
                    <Dropdown
                        menu={{
                            items: exportMenuItems,
                            onClick: handleExportMenuClick,
                        }}
                    >
                        <Button icon={<DownloadOutlined />}>
                            Export Diagram
                        </Button>
                    </Dropdown>
                </Space>
            )}
            <div id={DIAGRAM_CONTAINER_ID}>
                <MermaidDiagram
                    syntax={syntax}
                    emptyMessage="Generate an architecture to see the Class Diagram"
                />
            </div>
        </>
    );
};

export default ClassDiagramView;
