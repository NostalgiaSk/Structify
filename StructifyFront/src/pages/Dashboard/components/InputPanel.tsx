import { type FC } from 'react';
import { Card, Input, Button, Space } from 'antd';
import { ThunderboltOutlined, ClearOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface InputPanelProps {
    description: string;
    loading: boolean;
    onChange: (value: string) => void;
    onGenerate: () => void;
    onClear: () => void;
}

const InputPanel: FC<InputPanelProps> = ({
    description,
    loading,
    onChange,
    onGenerate,
    onClear,
}) => {
    return (
        <Card
            title="Describe Your Application"
            variant="borderless"
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
            <TextArea
                rows={8}
                value={description}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Example: I want a booking system where users can reserve rooms and leave reviews."
                style={{ resize: 'vertical' }}
            />

            <Space style={{ width: '100%' }} direction="vertical" size="small">
                <Button
                    type="primary"
                    icon={<ThunderboltOutlined />}
                    loading={loading}
                    onClick={onGenerate}
                    block
                    size="large"
                >
                    Generate Architecture
                </Button>
                <Button
                    icon={<ClearOutlined />}
                    onClick={onClear}
                    block
                    size="large"
                >
                    Clear
                </Button>
            </Space>
        </Card>
    );
};

export default InputPanel;
