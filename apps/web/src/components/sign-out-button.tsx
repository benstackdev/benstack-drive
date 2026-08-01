import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { authClient } from "../lib/auth-client";

function SignoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={
        <Button variant="destructive">Sign Out</Button>
      } />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={undefined} size={undefined}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => await authClient.signOut()}>Sign Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignoutButton;