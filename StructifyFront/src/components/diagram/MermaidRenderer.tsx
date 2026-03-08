import { type FC, useEffect, useRef, useState, useCallback } from 'react';
import { Empty, Alert, Space, Button, Dropdown } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import mermaid from 'mermaid';
import { exportSVG, exportPNG } from '../../utils/diagramExport';

let mermaidInitialized = false;
let renderCounter = 0;

function initMermaid(): void {
    if (!mermaidInitialized) {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
        });
        mermaidInitialized = true;
    }
}

function cleanupMermaidErrors(): void {
    document.querySelectorAll('[id^="d"], [id^="dmermaid"]').forEach((el) => {
        if (el.classList.contains('mermaid') || el.querySelector('text.error-text')) {
            el.remove();
        }
    });
    document.querySelectorAll('.error-icon, .error-text').forEach((el) => {
        const parent = el.closest('svg') ?? el.closest('div');
        if (parent && !parent.closest('[data-mermaid-container]')) {
            parent.remove();
        }
    });
}

interface MermaidRendererProps {
    diagram: string;
    id: string;
}

const MermaidRenderer: FC<MermaidRendererProps> = ({ diagram, id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [renderSuccess, setRenderSuccess] = useState<boolean>(false);

    const renderDiagram = useCallback(async (diagramSyntax: string): Promise<void> => {
        if (!containerRef.current) return;

        setError(null);
        setRenderSuccess(false);
        initMermaid();
        cleanupMermaidErrors();

        renderCounter += 1;
        const diagramId = `mermaid_${id}_${renderCounter}_${Date.now()}`;

        try {
            const { svg } = await mermaid.render(diagramId, diagramSyntax);
            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
                setRenderSuccess(true);
            }
        } catch (err: unknown) {
            const orphan = document.getElementById(diagramId);
            if (orphan) {
                orphan.remove();
            }
            cleanupMermaidErrors();

            const message = err instanceof Error ? err.message : 'Failed to render diagram';
            setError(message);

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        }
    }, [id]);

    useEffect(() => {
        if (!diagram) return;
        void renderDiagram(diagram);
    }, [diagram, renderDiagram]);

    const handleExportMenuClick: MenuProps['onClick'] = useCallback(
        (info: { key: string }) => {
            if (info.key === 'svg') {
                exportSVG(id);
            } else if (info.key === 'png') {
                exportPNG(id);
            }
        },
        [id],
    );

    const exportMenuItems: MenuProps['items'] = [
        { key: 'svg', label: 'Export as SVG' },
        { key: 'png', label: 'Export as PNG' },
    ];

    if (!diagram) {
        return <Empty description="No diagram data available" />;
    }

    if (error) {
        return (
            <Alert
                type="warning"
                showIcon
                message="Diagram rendering failed"
                description={error}
            />
        );
    }

    return (
        <div>
            {renderSuccess && (
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
            <div id={id}>
                <div
                    ref={containerRef}
                    data-mermaid-container="true"
                    style={{
                        overflow: 'auto',
                        maxHeight: 600,
                        padding: 16,
                        textAlign: 'center',
                    }}
                />
            </div>
        </div>
    );
};

export default MermaidRenderer;
