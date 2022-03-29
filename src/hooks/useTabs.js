import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTabs = (tabs = [], initialTab = 0) => {
    const navigate = useNavigate();
    const processedTabs = tabs.reduce(
        (acc, curValue, curIndex) => [
            ...acc,
            {
                ...curValue,
                tabIndex: curIndex,
                is_active: curIndex === 0 ? true : false,
            },
        ],
        []
    );

    const [totalTabs, setTotalTabs] = useState(processedTabs);
    const [currentTab, setCurrentTab] = useState(initialTab);

    const switchTab = (tabIndex, options) => {
        if (typeof tabIndex !== 'number') return;

        if (!!totalTabs[tabIndex]) {
            setTotalTabs((prevState) =>
                prevState.map((tab) =>
                    tab.tabIndex === tabIndex
                        ? { ...tab, is_active: true }
                        : { ...tab, is_active: false }
                )
            );
            if (options)
                navigate(
                    `${options.path || '/'}?${new URLSearchParams(options.search).toString()}`,
                    {
                        replace: options.replace || false,
                    }
                );
            return setCurrentTab(tabIndex);
        }
    };

    return [totalTabs, totalTabs.filter((tab) => tab.tabIndex === currentTab)[0], switchTab];
};
