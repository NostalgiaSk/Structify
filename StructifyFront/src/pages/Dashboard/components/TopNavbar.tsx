import { type FC } from 'react';
import { Layout, Switch, Button, Space, Typography } from 'antd';
import { GithubOutlined, BulbOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const TopNavbar: FC = () => {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                background: '#141414',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                height: 56,
                lineHeight: '56px',
            }}
        >
            <Text
                strong
                style={{
                    color: '#fff',
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    margin: 0,
                }}
            >
                Structify
            </Text>

            <Space size="middle">
                <Switch
                    checkedChildren={<BulbOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                    defaultChecked
                    aria-label="Toggle dark mode"
                />
                <Button
                    type="text"
                    icon={<GithubOutlined style={{ fontSize: 20, color: '#ffffffa6' }} />}
                    href="https://github.com"
                    target="_blank"
                    aria-label="GitHub repository"
                />
            </Space>
        </Header>
    );
};

export default TopNavbar;
