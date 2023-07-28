import AuthForm from "../AuthForm/AuthForm";

function Register() {
    const text = { title: 'Добро пожаловать!', buttonText: 'Зарегистрироваться', questText: 'Уже зарегистрированы?' }
    return (
        <AuthForm type={'signup'} text={text} />
    )
};

export default Register;