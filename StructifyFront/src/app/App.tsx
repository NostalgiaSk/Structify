import { type FC } from 'react';
import { ConfigProvider, theme } from 'antd';
import AppRouter from './AppRouter';

const App: FC = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    borderRadius: 8,
                    fontFamily:
                        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                },
                components: {
                    Card: {
                        colorBgContainer: '#1a1a2e',
                    },
                    Tabs: {
                        colorBgContainer: '#1a1a2e',
                    },
                },
            }}
        >
            <AppRouter />
        </ConfigProvider>
    );
};

export default App;
