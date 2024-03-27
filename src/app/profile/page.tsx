import { redirect } from "next/navigation";
import { urls } from "@/constants/urls";

export default function ProfilePage() {
  throw redirect(urls.profile.mainDetails);
}
