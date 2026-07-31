import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import * as z from "zod";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { userSchema } from "shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";
import { useState } from "react";
import AuthError from "../components/auth-error";

function Signin() {
  const navigate = useNavigate();

  const [signInError, setSignInError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof userSchema.WebSigninForm>>({
    resolver: zodResolver(userSchema.WebSigninForm),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof userSchema.WebSigninForm>> = async (formData) => {
    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      fetchOptions: {
        onSuccess(ctx) {
          console.log(ctx.response.ok);
          navigate("/");
        },
        onError(ctx) {
          setSignInError(ctx.error.message);
        }
      }
    });
  };

  return (
    <Card className={`flex justify-center max-w-xs md:max-w-md mx-auto my-8`}>
      <CardHeader className={`flex flex-col md:flex-row justify-between md:items-center`}>
        <CardTitle>Sign In</CardTitle>
        <CardAction className={`flex gap-2`}>
          Don't have an account?
          <Link to="/sign-up">Sign Up</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {signInError ? <AuthError errorMessage={signInError} /> : null}
        <form
          id="sign-up-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col gap-6`}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="email"
                  name={field.name}
                  required
                />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  name={field.name}
                  required
                />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className={`mt-4`}>
        <Button type="submit" form="sign-up-form">Sign In</Button>
      </CardFooter>
    </Card>
  );
}

export default Signin;