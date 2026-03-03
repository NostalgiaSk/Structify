import { type FC, useState, useCallback } from 'react';
import { Layout, Row, Col, message } from 'antd';
import TopNavbar from './components/TopNavbar';
import InputPanel from './components/InputPanel';
import OutputTabs from './components/OutputTabs';
import { generateArchitecture } from '../../services/generate.service';
import type { GeneratedResult } from './types';

const { Content } = Layout;

const DashboardPage: FC = () => {
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!description.trim()) return;

        setLoading(true);
        try {
            const result = await generateArchitecture(description);
            setGeneratedResult(result);
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
