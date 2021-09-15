import {ExperienceBar} from "../Components/ExperienceBar"
import { Profile } from "../Components/Profile"
export default function Home() {
  return (
    <div className="container">
      <ExperienceBar/>

      <section>
        <div>
          <Profile/>
          {/* Parei em 40min da aula 2 */}
        </div>
        <div></div>
      </section>
    </div>
  )
}
