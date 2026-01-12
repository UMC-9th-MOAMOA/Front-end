import Logo from "@/assets/LOGO.svg";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";

export default function Login() {
  return (
    <main>
      <header>
        <img
          src={Logo}
          alt="모아모아 로고"
          className="mx-auto mt-77 block h-auto w-193"
        />
        <h1 className="heading-1 mt-29 text-center text-black">
          <span>반가워요!</span>
          <span className="block">모아모아를 시작해볼까요?</span>
        </h1>
        <p className="body-4 mt-12 text-center text-gray-500">
          함께 숨겨진 시간을 찾아 생산적인 하루를 보내보세요.
        </p>
      </header>
      <section className="mt-61">
        <LoginForm />
      </section>
      <section className="mt-51">
        <SocialLoginButtons />
      </section>
    </main>
  );
}
