// Local component import
import AuthForm from "../components/Auth/AuthForm";

/**
 * Page for routing to /auth-login or /auth-signup endpoints.
 * @param {String} type - Either login or signup 
 * @returns 
 */
const AuthPage = ({type}) => {
    return <AuthForm type={type} />;
};

export default AuthPage;