import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
    const text = { title: 'Добро пожаловать!', buttonText: 'Зарегистрироваться', questText: 'Уже зарегистрированы?' }
    return (
        <AuthForm type={'signup'} text={text} onSubmitForm={onRegister} />
    )
};

export default Register;
