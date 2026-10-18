import { isSignedIn } from "../../lib/auth/identity";
import { SiteNavigation } from "./site-navigation";

export async function SiteHeader() {
  return <SiteNavigation signedIn={await isSignedIn()} />;
}
