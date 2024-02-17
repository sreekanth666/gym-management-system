import { FC } from 'react';
import { useState } from 'react';
import {
    IconBellRinging,
    IconDatabaseImport,
    IconReceipt2,
    IconLogout,
    IconEditCircle,
    IconShoppingBag,
    IconHealthRecognition,
} from '@tabler/icons-react';
import classes from './Dashboard.module.css';
import AllMembers from '../AllMembers/AllMembers';
import AssignNotification from '../AssignNotification/AssignNotification';
import { useNavigate } from 'react-router-dom';

const data = [
    { link: '', label: 'Add Members', icon: IconDatabaseImport, component: "" },
    { link: '', label: 'Manage Members', icon: IconEditCircle, component: <AllMembers /> },
    { link: '', label: 'Notifications', icon: IconBellRinging, component: <AssignNotification /> },
    { link: '', label: 'Report', icon: IconReceipt2, component: "" },
    { link: '', label: 'Store', icon: IconShoppingBag, component: "" },
    { link: '', label: 'Diet Plans', icon: IconHealthRecognition, component: "" },
];

interface DashboardProps {

}

const Dashboard: FC<DashboardProps> = ({ }) => {
    const [active, setActive] = useState('Add Members');
    const [component, setComponent] = useState()
    const navigate = useNavigate()

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
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