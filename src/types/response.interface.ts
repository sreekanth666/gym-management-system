interface Response {
    success: true | false,
    message: string,
    data: any
}

type UserLoginResponse = {
    email: string,
    name: string,
    password: string
} 