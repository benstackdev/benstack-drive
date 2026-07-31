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

function Signup() {
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof userSchema.WebSignupForm>>({
    resolver: zodResolver(userSchema.WebSignupForm),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof userSchema.WebSignupForm>> = async (formData) => {
    await authClient.signUp.email({
      name: formData.username,
      email: formData.email,
      password: formData.password,
      fetchOptions: {
        onSuccess(ctx) {
          console.log(ctx.response.ok);
          navigate("/sign-in");
        },
        onError(ctx) {
          setSignUpError(ctx.error.message);
        }
      }
    });
  };

  return (
    <Card className={`flex justify-center max-w-xs md:max-w-md mx-auto my-8`}>
      <CardHeader className={`flex flex-col md:flex-row justify-between md:items-center`}>
        <CardTitle>Sign Up</CardTitle>
        <CardAction className={`flex gap-2`}>
          Already have an account?
          <Link to="/sign-in">Sign In</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {signUpError ? <AuthError errorMessage={signUpError} /> : null}
        <form
          id="sign-up-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col gap-8`}>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  name={field.name}
                  required
                />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
              </Field>
            )}
          />
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
          <Controller
            name="passwordConfirm"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
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
      <CardFooter>
        <Button className={`mt-4`} type="submit" form="sign-up-form">Sign Up</Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;