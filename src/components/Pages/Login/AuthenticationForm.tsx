import { FC } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Anchor,
    Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { loginService } from "../../../services/app/domain/auth/login.service";
import { userRegistrationService } from "../../../services/app/domain/auth/user-registration.service";
import { notifications } from "@mantine/notifications";
import { ERROR_MESSAGE } from "../../../constants/error.constant";
import { SUCCESS_MESSAGE } from "../../../constants/success.constants";

interface AuthenticationFormProps { }

const AuthenticationForm: FC<AuthenticationFormProps> = (props: PaperProps) => {
    const navigate = useNavigate();
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm<{
        email: string;
        name: string;
        password: string;
        role: string;
    }>({
        initialValues: {
            email: "",
            name: "",
            password: "",
            role: "user",
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });
    const handleUserAction = async () => {
        if (type === "register") {
            try {
                const result: any = await userRegistrationService(form.values);
                console.log(result);
                if (result.success) {
                    notifications.show({
                        title: "Success",
                        message: SUCCESS_MESSAGE.REGISTER,
                        autoClose: 1500,
                        color: "green",
                    });
                    toggle()
                } else {
                    notifications.show({
                        title: "Error",
                        message: ERROR_MESSAGE.REG_FAIL,
                        autoClose: 1500,
                        color: "red",
                    });
                }
            } catch (error) {
                notifications.show({
                    title: "Error",
                    message: ERROR_MESSAGE.REG_FAIL,
                    autoClose: 1500,
                    color: "red",
                });
            }
        } else {
            try {
                const { email, password } = form.values;
                const result: any = await loginService(email, password);
                if (result.data) {
                    localStorage.setItem("_rlid", result.data.role);
                    localStorage.setItem("_ueml", result.data.email);
                    localStorage.setItem("_uid", result.data.userId)
                }
                if (result.success) {
                    navigate("/dashboard");
                } else {
                    notifications.show({
                        title: "Error",
                        message: result.message,
                        autoClose: 1500,
                        color: "red",
                    });
                }
            } catch (error: any) {
                notifications.show({
                    title: "ERROR",
                    message: error.message,
                    autoClose: 1500,
                    color: "red",
                });
            }
        }
    };
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100dvh" }}
            >
                <Paper
                    radius="md"
                    p="xl"
                    {...props}
                    className="col-sm-12 col-md-6 col-lg-6 col-xl-6"
                >
                    <img
                        src={logo}
                        alt="GYM Logo"
                        className="img-fluid mx-auto d-block"
                        style={{ height: "8rem" }}
                    />
                    <Text size="lg" fw={500} className="text-center">
                        Welcome to GMS, Please {type}
                    </Text>
                    <Divider label="Enter credentials" labelPosition="center" my="lg" />
                    <form
                        onSubmit={form.onSubmit(handleUserAction)}
                        className="text-start"
                    >
                        <Stack>
                            {type === "register" && (
                                <TextInput
                                    label="Name"
                                    placeholder="Your name"
                                    value={form.values.name}
                                    onChange={(event) =>
                                        form.setFieldValue("name", event.currentTarget.value)
                                    }
                                    radius="md"
                                />
                            )}

                            <TextInput
                                required
                                label="Email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) =>
                                    form.setFieldValue("email", event.currentTarget.value)
                                }
                                error={form.errors.email && "Invalid email"}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) =>
                                    form.setFieldValue("password", event.currentTarget.value)
                                }
                                error={
                                    form.errors.password &&
                                    "Password should include at least 6 characters"
                                }
                                radius="md"
                            />
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Anchor
                                component="button"
                                type="button"
                                c="dimmed"
                                onClick={() => toggle()}
                                size="xs"
                            >
                                {type === "register"
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Register"}
                            </Anchor>
                            <Button type="submit" radius="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </>
    );
};

export default AuthenticationForm;
