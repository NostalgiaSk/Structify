import { type FC, useState, useCallback } from 'react';
import { Layout, Row, Col } from 'antd';
import TopNavbar from './components/TopNavbar';
import InputPanel from './components/InputPanel';
import OutputTabs from './components/OutputTabs';
import type { GeneratedResult } from './types';

const { Content } = Layout;

const DashboardPage: FC = () => {
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);

    const handleGenerate = useCallback(() => {
        if (!description.trim()) return;
        setLoading(true);
        // Placeholder: simulate generation delay
        setTimeout(() => {
            setLoading(false);
            setGeneratedResult(null);
        }, 1500);
    }, [description]);

    const handleClear = useCallback(() => {
        setDescription('');
        setGeneratedResult(null);
    }, []);

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
                    </Col>
                    <Col xs={24} lg={17}>
                        <OutputTabs result={generatedResult} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default DashboardPage;
