import { useNavigate } from "react-router-dom";
import { useYupForm } from "../../../hook/useYupForm";
import { loginSvcCaller } from "../../../services/auth/login/login.svc";
import Typography from "../../../atoms/typography";
import Input from "../../../atoms/input";
import Button from "../../../atoms/button";
import { schemaFormLogin } from "./schema";
import ContainerAuthLottie from "../../../molecules/container-auth-lottie/ContainerAuthLottie";
import { setTokenInCookie } from "../../../utils/app.utils";
import { SSOCOOKIES } from "../../../constants/cookies.const";

const FormLogin= ()=> {
  const navigate = useNavigate();
  const { register, handleSubmit, getError } = useYupForm({
    schema: schemaFormLogin,
    onSubmit: async (values) => {
      try {
        const res = await loginSvcCaller.execute(values);
        if (res?.accessToken) {
          setTokenInCookie(SSOCOOKIES.ACCESS_TOKEN, res.accessToken);
        }
        if (res?.refreshToken) {
          setTokenInCookie(SSOCOOKIES.REFRESH_TOKEN, res.refreshToken);
        }
        if (res?.accessToken) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login Error: ", error)
      }
    }
  });

  return (
    <ContainerAuthLottie>
      <Typography as="h1">Welcome back</Typography>
      <Typography as="p">Sign in to continue</Typography>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <Input 
          {...register("username")} 
          placeholder="Username" 
          helperText={getError("username")} 
          state={
            getError("username") ? "error" : "default"
          }
        />
        
        <Input 
          {...register("password")} 
          type="password" 
          placeholder="••••••••" 
          helperText={getError("password")} 
          state={
            getError("password") ? "error" : "default"
          }
        />

        <div className="flex gap-2">
          <Button type="submit" className="text-white w-full" variant="primary">
            Sign in
          </Button>

          <Button className="text-black w-full" color="warning" onClick={() => navigate("/register")}>
            Sign up
          </Button>
        </div>
      </form>
    </ContainerAuthLottie>
  );
}

export default FormLogin
