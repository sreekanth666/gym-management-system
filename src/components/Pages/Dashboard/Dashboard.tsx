import { FC } from "react";
import { useState } from "react";
import { IconReceipt2, IconLogout, IconEditCircle } from "@tabler/icons-react";
import classes from "./Dashboard.module.css";
import AllMembers from "../AllMembers/AllMembers";
import { useNavigate } from "react-router-dom";
import Report from "../Report/Report";
import ViewBill from "../Bill/ViewBill";
import Notification from "../Notification/Notification";
import UserDetails from "../UserDetails/UserDetails";

const admData = [
    { label: "Manage Members", icon: IconEditCircle, component: <AllMembers /> },
    { label: "Report", icon: IconReceipt2, component: <Report /> },
];

const memberData = [
    { label: "View Bill", icon: IconEditCircle, component: <ViewBill /> },
    { label: "Notification", icon: IconReceipt2, component: <Notification /> },
];

const userData = [
    { label: "View Details", icon: IconEditCircle, component: <UserDetails /> },
];

interface DashboardProps { }

const Dashboard: FC<DashboardProps> = ({ }) => {
    const role = localStorage.getItem("_rlid");
    const [active, setActive] = useState<any>(() => {
        switch (role) {
            case "admin":
                return "Manage Members";
            case "member":
                return "View Bill";
            case "user":
                return "View Details";
            default:
                return null;
        }
    });

    const [component, setComponent] = useState<React.ReactNode>(() => {
        switch (role) {
            case "admin":
                return admData[0].component;
            case "member":
                return memberData[0].component;
            case "user":
                return userData[0].component;
            default:
                return null;
        }
    });
    const navigate = useNavigate();

    const links = (
        role === "admin"
            ? admData
            : role === "member"
                ? memberData
                : role === "user"
                    ? userData
                    : null
    )?.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                setComponent(item.component);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <>
            <div className="row m-0 p-0" style={{ minHeight: "100dvh" }}>
                <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <nav className={classes.navbar}>
                        <div className={classes.navbarMain}>{links}</div>
                        <div className={`${classes.footer} text-danger`}>
                            <a href="" className={classes.link} onClick={() => logout()}>
                                <IconLogout className={classes.linkIcon} stroke={1.5} />
                                <span>Logout</span>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="col border-start border-3">{component}</div>
            </div>
        </>
    );
};

export default Dashboard;
