// styles
import { TabContainer, Tab } from './tabs.styledcomponent';

export const Tabs = ({ tabs = [], switchTab }) => {
    return (
        <TabContainer align='space-between'>
            {tabs?.map(({ name, tabIndex, Icon, is_active = true }) => (
                <Tab isActive={is_active} key={tabIndex} onClick={() => switchTab(tabIndex)}>
                    {name}
                    {Icon && <Icon size={24} />}
                </Tab>
            ))}
        </TabContainer>
    );
};
