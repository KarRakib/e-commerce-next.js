import Products from "./components/Products/Products";
import { gerCurrentUser } from "./session"


export default async function Home() {
  const user = await gerCurrentUser()
  console.log(user,'i');
  return (
    <div>
      <hr />
    <Products/>
    </div>
  )
}
