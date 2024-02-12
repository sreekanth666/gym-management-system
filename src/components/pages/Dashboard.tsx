import { Box, CheckIcon, CloseIcon, NavLink, ThemeIcon } from '@mantine/core';
import React, { FC, useState } from 'react';
import { IconArrowLeft, IconHome, IconLogout, IconMug, IconNut, IconPlus, IconReport } from '@tabler/icons-react';
import ManageMember from './ManageMemeber';


interface DashboardProps {

}

const Dashboard: FC<DashboardProps> = ({ }) => {
    const data = [
        { icon: IconHome, label: 'Dashboard' },
        { icon: IconNut, label: 'Manage Member' },
        { icon: IconReport, label: 'Export Report' },
        { icon: IconMug, label: 'Supplement Store' },
        { icon: IconLogout, label: 'Logout' },
    ];
    const [active, setActive] = useState(0);
    console.log(active);
    
    const items = data.map((item, index) => (
        <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={<item.icon size="1rem" />}
            onClick={() => setActive(index)}
        />
    ))
    return (
        <div className='row m-0 p-0' style={{ minHeight: '100dvh' }}>
            <div className="col-sm-12 col-md-auto col-lg-auto col-xl-auto m-0 p-0">
                <Box className='w-100'>{items}</Box>
            </div>
            <div className="col-sm-12 col-md col-lg col-xl">
                {
                    active === 0 ? (
                        "DASHBOARD"
                    ) : active === 1 ? (
                        <ManageMember />
                    ) : active === 2 ? (
                        "EXPORT REPORT"
                    ) : active === 3 ? (
                        "STORE"
                    ) : active === 4 ? (
                        'LOGOUT'
                    ) : null
                }
            </div>

        </div>
    );
};

export default Dashboard;