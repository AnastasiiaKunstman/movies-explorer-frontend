import AuthForm from '../AuthForm/AuthForm';

function Register() {
    const text = { title: 'Рады видеть!', buttonText: 'Войти', questText: 'Ещё не зарегистрированы?' }
    return (
        <AuthForm type={'signin'} text={text} />
    )
}

export default Register;