import { type FC, useCallback } from 'react';
import {
    Card,
    Collapse,
    Input,
    Select,
    Button,
    Checkbox,
    Space,
    Tooltip,
    Empty,
} from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import type { Entity, Attribute } from '../types';

const COMMON_TYPES = [
    'string',
    'number',
    'boolean',
    'Date',
    'int',
    'float',
    'uuid',
    'text',
    'varchar',
    'timestamp',
    'bigint',
    'json',
];

interface EntityEditorProps {
    entities: Entity[];
    onUpdate: (entities: Entity[]) => void;
}

const EntityEditor: FC<EntityEditorProps> = ({ entities, onUpdate }) => {
    const handleEntityNameChange = useCallback(
        (entityIndex: number, newName: string) => {
            onUpdate(
                entities.map((entity, i) =>
                    i === entityIndex ? { ...entity, name: newName } : entity,
                ),
            );
        },
        [entities, onUpdate],
    );

    const handleAttributeChange = useCallback(
        (entityIndex: number, attrIndex: number, updates: Partial<Attribute>) => {
            onUpdate(
                entities.map((entity, eIdx) =>
                    eIdx === entityIndex
                        ? {
                            ...entity,
                            attributes: entity.attributes.map((attr, aIdx) =>
                                aIdx === attrIndex ? { ...attr, ...updates } : attr,
                            ),
                        }
                        : entity,
                ),
            );
        },
        [entities, onUpdate],
    );

    const handleDeleteAttribute = useCallback(
        (entityIndex: number, attrIndex: number) => {
            onUpdate(
                entities.map((entity, eIdx) =>
                    eIdx === entityIndex
                        ? {
                            ...entity,
                            attributes: entity.attributes.filter(
                                (_, aIdx) => aIdx !== attrIndex,
                            ),
                        }
                        : entity,
                ),
            );
        },
        [entities, onUpdate],
    );

    const handleAddAttribute = useCallback(
        (entityIndex: number) => {
            const newAttribute: Attribute = {
                name: 'newField',
                type: 'string',
                isPrimary: false,
            };
            onUpdate(
                entities.map((entity, i) =>
                    i === entityIndex
                        ? { ...entity, attributes: [...entity.attributes, newAttribute] }
                        : entity,
                ),
            );
        },
        [entities, onUpdate],
    );

    const handleDeleteEntity = useCallback(
        (entityIndex: number) => {
            onUpdate(entities.filter((_, i) => i !== entityIndex));
        },
        [entities, onUpdate],
    );

    const handleAddEntity = useCallback(() => {
        const newEntity: Entity = {
            name: `Entity${entities.length + 1}`,
            attributes: [{ name: 'id', type: 'uuid', isPrimary: true }],
        };
        onUpdate([...entities, newEntity]);
    }, [entities, onUpdate]);

    if (entities.length === 0) {
        return (
            <Card
                variant="borderless"
                styles={{
                    header: {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: 16,
                        fontWeight: 600,
                    },
                }}
                title="Entities"
            >
                <Empty description="No entities yet" />
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddEntity}
                    block
                    style={{ marginTop: 16 }}
                >
                    Add Entity
                </Button>
            </Card>
        );
    }

    const collapseItems = entities.map((entity, entityIndex) => ({
        key: String(entityIndex),
        label: (
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <DatabaseOutlined style={{ color: '#6366f1' }} />
                    <span style={{ fontWeight: 600 }}>{entity.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
                        ({entity.attributes.length} fields)
                    </span>
                </Space>
            </Space>
        ),
        extra: (
            <Tooltip title="Delete entity">
                <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEntity(entityIndex);
                    }}
                />
            </Tooltip>
        ),
        children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Input
                    addonBefore="Name"
                    value={entity.name}
                    onChange={(e) =>
                        handleEntityNameChange(entityIndex, e.target.value)
                    }
                    style={{ marginBottom: 4 }}
                />

                {entity.attributes.map((attr, attrIndex) => (
                    <div key={attrIndex} className="attribute-row">
                        <Input
                            placeholder="Field name"
                            value={attr.name}
                            onChange={(e) =>
                                handleAttributeChange(entityIndex, attrIndex, {
                                    name: e.target.value,
                                })
                            }
                            style={{ flex: 1, minWidth: 100 }}
                        />
                        <Select
                            value={attr.type}
                            onChange={(value) =>
                                handleAttributeChange(entityIndex, attrIndex, {
                                    type: value,
                                })
                            }
                            style={{ width: 120 }}
                            showSearch
                            options={COMMON_TYPES.map((t) => ({
                                label: t,
                                value: t,
                            }))}
                        />
                        <Tooltip title="Primary key">
                            <Checkbox
                                checked={attr.isPrimary ?? false}
                                onChange={(e) =>
                                    handleAttributeChange(entityIndex, attrIndex, {
                                        isPrimary: e.target.checked,
                                    })
                                }
                            >
                                PK
                            </Checkbox>
                        </Tooltip>
                        <Tooltip title="Remove field">
                            <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                    handleDeleteAttribute(entityIndex, attrIndex)
                                }
                            />
                        </Tooltip>
                    </div>
                ))}

                <Button
                    type="dashed"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddAttribute(entityIndex)}
                    block
                >
                    Add Attribute
                </Button>
            </div>
        ),
    }));

    return (
        <Card
            variant="borderless"
            title="Entities"
            styles={{
                header: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: 16,
                    fontWeight: 600,
                },
                body: { padding: '12px 0' },
            }}
        >
            <Collapse
                items={collapseItems}
                defaultActiveKey={['0']}
                ghost
                style={{ background: 'transparent' }}
            />
            <div style={{ padding: '12px 24px 0' }}>
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddEntity}
                    block
                >
                    Add Entity
                </Button>
            </div>
        </Card>
    );
};

export default EntityEditor;
