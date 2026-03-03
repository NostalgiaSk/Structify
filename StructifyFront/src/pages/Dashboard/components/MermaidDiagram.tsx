import { type FC, useEffect, useRef, useState, useCallback } from 'react';
import { Empty, Alert } from 'antd';
import mermaid from 'mermaid';

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

interface MermaidDiagramProps {
    syntax: string;
    emptyMessage: string;
}

const MermaidDiagram: FC<MermaidDiagramProps> = ({ syntax, emptyMessage }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    const renderDiagram = useCallback(async (diagramSyntax: string): Promise<void> => {
        if (!containerRef.current) return;

        setError(null);
        initMermaid();
        cleanupMermaidErrors();

        renderCounter += 1;
        const diagramId = `mermaid_diagram_${renderCounter}_${Date.now()}`;

        try {
            const { svg } = await mermaid.render(diagramId, diagramSyntax);
            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
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
    }, []);

    useEffect(() => {
        if (!syntax) return;
        void renderDiagram(syntax);
    }, [syntax, renderDiagram]);

    if (!syntax) {
        return <Empty description={emptyMessage} />;
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
    );
};

export default MermaidDiagram;
