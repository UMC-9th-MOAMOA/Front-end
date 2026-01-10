import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";

export default function Login() {
  return (
    <main>
      <header>
        <h1 className="heading-1 text-center text-black">
          <span>반가워요!</span>
          <span className="block">모아모아를 시작해볼까요?</span>
        </h1>
        <p className="body-4 text-center text-gray-600">
          함께 숨겨진 시간을 찾아 생산적인 하루를 보내보세요.
        </p>
      </header>
      <section>
        <LoginForm />
      </section>
      <section>
        <SocialLoginButtons />
      </section>
    </main>
  );
}
