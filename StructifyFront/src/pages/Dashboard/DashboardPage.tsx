import { type FC, useState, useCallback } from 'react';
import { Layout, Row, Col, Switch, Space, Button, Typography, message } from 'antd';
import { EditOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import TopNavbar from './components/TopNavbar';
import InputPanel from './components/InputPanel';
import OutputTabs from './components/OutputTabs';
import EntityEditor from './components/EntityEditor';
import RelationshipEditor from './components/RelationshipEditor';
import { generateArchitecture } from '../../services/generate.service';
import type { GeneratedResult, Entity, Relationship } from './types';

const { Content } = Layout;
const { Text } = Typography;

function deepCopy<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

const DashboardPage: FC = () => {
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);
    const [editableResult, setEditableResult] = useState<GeneratedResult | null>(null);
    const [committedResult, setCommittedResult] = useState<GeneratedResult | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        if (!description.trim()) return;

        setLoading(true);
        try {
            const result = await generateArchitecture(description);
            setGeneratedResult(result);
            setEditableResult(deepCopy(result));
            setCommittedResult(deepCopy(result));
            setHasUnsavedChanges(false);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [description]);

    const handleClear = useCallback(() => {
        setDescription('');
        setGeneratedResult(null);
        setEditableResult(null);
        setCommittedResult(null);
        setEditMode(false);
        setHasUnsavedChanges(false);
    }, []);

    const handleUpdateEntities = useCallback((updatedEntities: Entity[]) => {
        setEditableResult((prev) => {
            if (!prev) return prev;

            // Cascade entity name changes into relationships
            let updatedRelationships = prev.relationships;
            prev.entities.forEach((oldEntity, index) => {
                const newEntity = updatedEntities[index];
                if (newEntity && oldEntity.name !== newEntity.name) {
                    updatedRelationships = updatedRelationships.map((rel) => ({
                        ...rel,
                        from: rel.from === oldEntity.name ? newEntity.name : rel.from,
                        to: rel.to === oldEntity.name ? newEntity.name : rel.to,
                    }));
                }
            });

            return { ...prev, entities: updatedEntities, relationships: updatedRelationships };
        });
        setHasUnsavedChanges(true);
    }, []);

    const handleUpdateRelationships = useCallback((updatedRelationships: Relationship[]) => {
        setEditableResult((prev) => {
            if (!prev) return prev;
            return { ...prev, relationships: updatedRelationships };
        });
        setHasUnsavedChanges(true);
    }, []);

    const handleSaveChanges = useCallback(() => {
        if (!editableResult) return;
        setCommittedResult(deepCopy(editableResult));
        setHasUnsavedChanges(false);
        message.success('Changes applied to diagrams');
    }, [editableResult]);

    const handleResetChanges = useCallback(() => {
        if (!generatedResult) return;
        setEditableResult(deepCopy(generatedResult));
        setCommittedResult(deepCopy(generatedResult));
        setHasUnsavedChanges(false);
        message.info('Changes reset to original');
    }, [generatedResult]);

    const activeResult = editMode && committedResult ? committedResult : generatedResult;

    return (
        <Layout style={{ minHeight: '100vh', background: '#0a0a0a' }}>
            <TopNavbar />
            <Content style={{ padding: '24px 32px' }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={7}>
                        <InputPanel
                            description={description}
                            loading={loading}
                            onChange={setDescription}
                            onGenerate={handleGenerate}
                            onClear={handleClear}
                        />

                        {generatedResult && (
                            <div className="edit-mode-toggle">
                                <Space>
                                    <EditOutlined style={{ color: editMode ? '#6366f1' : 'rgba(255,255,255,0.45)' }} />
                                    <Text style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        Edit Mode
                                    </Text>
                                    <Switch
                                        checked={editMode}
                                        onChange={setEditMode}
                                        size="small"
                                    />
                                </Space>
                            </div>
                        )}

                        {editMode && editableResult && (
                            <div className="entity-editor-panel">
                                <Space direction="vertical" style={{ width: '100%' }} size="small">
                                    <Space style={{ width: '100%', justifyContent: 'stretch' }} size="small">
                                        <Button
                                            type="primary"
                                            icon={<SaveOutlined />}
                                            onClick={handleSaveChanges}
                                            disabled={!hasUnsavedChanges}
                                            block
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            icon={<UndoOutlined />}
                                            onClick={handleResetChanges}
                                            danger
                                            block
                                        >
                                            Reset
                                        </Button>
                                    </Space>
                                    {hasUnsavedChanges && (
                                        <Text type="warning" style={{ fontSize: 12 }}>
                                            You have unsaved changes — click Save to update diagrams
                                        </Text>
                                    )}
                                </Space>

                                <EntityEditor
                                    entities={editableResult.entities}
                                    onUpdate={handleUpdateEntities}
                                />
                                <RelationshipEditor
                                    relationships={editableResult.relationships}
                                    entities={editableResult.entities}
                                    onUpdate={handleUpdateRelationships}
                                />
                            </div>
                        )}
                    </Col>
                    <Col xs={24} lg={17}>
                        <OutputTabs result={activeResult} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default DashboardPage;
