import { useEffect } from 'react';
import { useTabs } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

// styles
import { AuthenticationPage } from './auth.styledcomponent';

// components
import { Login, Register } from '../../components';
import { Flex } from '../../styledcomponents';

export const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tabs, { component: SelectedTab }, switchTab] = useTabs([
        { name: 'Login', component: Login },
        { name: 'Register', component: Register },
    ]);

    useEffect(() => {
        const authState = new URLSearchParams(location.search).get('tab_state');
        if (!authState) return navigate('/authenticate?tab_state=login');
        const tabIndex = tabs.findIndex(
            (tab) => tab.name.toLowerCase() === authState.toLowerCase()
        );

        switchTab(tabIndex, {
            path: '/authenticate',
            search: {
                tab_state: tabs[tabIndex]?.name?.toLowerCase() || 'login',
            },
        });
    }, [location.search]);

    return (
        <AuthenticationPage>
            <SelectedTab tabs={tabs} switchTab={switchTab} />
        </AuthenticationPage>
    );
};
