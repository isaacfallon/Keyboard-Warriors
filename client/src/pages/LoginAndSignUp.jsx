import Login from '../components/Login';
import Signup from '../components/Signup';

export default function LoginAndSignUp() {
    return (
       <div className="flex flex-row justify-center pt-4 mt-8">
        <Login />
        <Signup />
       </div>
    );
  }