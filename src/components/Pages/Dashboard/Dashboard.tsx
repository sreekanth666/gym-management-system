import { FC, ReactElement } from 'react';
import { useState } from 'react';
import {
    IconBellRinging,
    IconReceipt2,
    IconLogout,
    IconEditCircle,
    IconShoppingBag,
    IconHealthRecognition,
} from '@tabler/icons-react';
import classes from './Dashboard.module.css';
import AllMembers from '../AllMembers/AllMembers';
import { useNavigate } from 'react-router-dom';

const data = [
    { label: 'Manage Members', icon: IconEditCircle, component: <AllMembers /> },
    { label: 'Report', icon: IconReceipt2, component: null },
    { label: 'Store', icon: IconShoppingBag, component: null },
    { label: 'Diet Plans', icon: IconHealthRecognition, component: null },
];

interface DashboardProps {

}

const Dashboard: FC<DashboardProps> = ({ }) => {
    const [active, setActive] = useState('Manage Members');
    const [component, setComponent] = useState<React.ReactNode>(data[0].component)
    const navigate = useNavigate()

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                setComponent(item.component)
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <div className="row m-0 p-0" style={{minHeight: '100dvh'}} >
                <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <nav className={classes.navbar}>
                        <div className={classes.navbarMain}>
                            {links}
                        </div>
                        <div className={`${classes.footer} text-danger`}>
                            <a href="" className={classes.link} onClick={() => logout()}>
                                <IconLogout className={classes.linkIcon} stroke={1.5} />
                                <span>Logout</span>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="col border-start border-3">
                    {component}
                </div>
            </div>
        </>
    );
};

export default Dashboard;