import Login from './Login';
import Signup from './Signup';

export default function LoginAndSignUp() {
  return (
      <main>
        <div className="loginAndSignUpContainer">
          <Login />
          <Signup />
          </div>
      </main>
  );
}