import { type FC, useState, useCallback, useMemo } from 'react';
import { Card, Select, Button, Space, Tooltip, Empty } from 'antd';
import { DeleteOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons';
import type { Entity, Relationship } from '../types';

const RELATIONSHIP_TYPE_OPTIONS: {
    label: string;
    value: Relationship['type'];
}[] = [
        { label: '1 : 1 (One-to-One)', value: 'one-to-one' },
        { label: '1 : N (One-to-Many)', value: 'one-to-many' },
        { label: 'N : M (Many-to-Many)', value: 'many-to-many' },
    ];



interface RelationshipEditorProps {
    relationships: Relationship[];
    entities: Entity[];
    onUpdate: (relationships: Relationship[]) => void;
}

const RelationshipEditor: FC<RelationshipEditorProps> = ({
    relationships,
    entities,
    onUpdate,
}) => {
    const [newFrom, setNewFrom] = useState<string | undefined>(undefined);
    const [newTo, setNewTo] = useState<string | undefined>(undefined);
    const [newType, setNewType] = useState<Relationship['type']>('one-to-many');

    const entityOptions = useMemo(
        () => entities.map((e) => ({ label: e.name, value: e.name })),
        [entities],
    );

    const handleAddRelationship = useCallback(() => {
        if (!newFrom || !newTo) return;

        const newRelationship: Relationship = {
            from: newFrom,
            to: newTo,
            type: newType,
        };
        onUpdate([...relationships, newRelationship]);
        setNewFrom(undefined);
        setNewTo(undefined);
        setNewType('one-to-many');
    }, [newFrom, newTo, newType, relationships, onUpdate]);

    const handleUpdateRelationship = useCallback(
        (index: number, updates: Partial<Relationship>) => {
            onUpdate(
                relationships.map((rel, i) =>
                    i === index ? { ...rel, ...updates } : rel,
                ),
            );
        },
        [relationships, onUpdate],
    );

    const handleDeleteRelationship = useCallback(
        (index: number) => {
            onUpdate(relationships.filter((_, i) => i !== index));
        },
        [relationships, onUpdate],
    );

    const canAdd = newFrom !== undefined && newTo !== undefined;

    return (
        <Card
            variant="borderless"
            title="Relationships"
            styles={{
                header: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: 16,
                    fontWeight: 600,
                },
                body: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                },
            }}
        >
            {/* Add relationship form */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 8,
                    border: '1px dashed rgba(255,255,255,0.1)',
                }}
            >
                <Space wrap style={{ width: '100%' }}>
                    <Select
                        placeholder="From entity"
                        value={newFrom}
                        onChange={setNewFrom}
                        options={entityOptions}
                        style={{ minWidth: 140 }}
                        allowClear
                    />
                    <LinkOutlined style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <Select
                        placeholder="To entity"
                        value={newTo}
                        onChange={setNewTo}
                        options={entityOptions}
                        style={{ minWidth: 140 }}
                        allowClear
                    />
                    <Select
                        value={newType}
                        onChange={setNewType}
                        options={RELATIONSHIP_TYPE_OPTIONS}
                        style={{ minWidth: 170 }}
                    />
                </Space>
                <Button
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    onClick={handleAddRelationship}
                    disabled={!canAdd}
                    block
                    size="small"
                >
                    Add Relationship
                </Button>
            </div>

            {/* Relationship list */}
            {relationships.length === 0 ? (
                <Empty
                    description="No relationships defined"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relationships.map((rel, index) => (
                        <div key={index} className="attribute-row">
                            <Select
                                value={rel.from}
                                onChange={(value) =>
                                    handleUpdateRelationship(index, { from: value })
                                }
                                options={entityOptions}
                                style={{ flex: 1, minWidth: 100 }}
                                size="small"
                            />
                            <Select
                                value={rel.type}
                                onChange={(value) =>
                                    handleUpdateRelationship(index, { type: value })
                                }
                                options={RELATIONSHIP_TYPE_OPTIONS}
                                style={{ minWidth: 140 }}
                                size="small"
                            />
                            <Select
                                value={rel.to}
                                onChange={(value) =>
                                    handleUpdateRelationship(index, { to: value })
                                }
                                options={entityOptions}
                                style={{ flex: 1, minWidth: 100 }}
                                size="small"
                            />
                            <Tooltip title="Remove relationship">
                                <Button
                                    type="text"
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDeleteRelationship(index)}
                                />
                            </Tooltip>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RelationshipEditor;
