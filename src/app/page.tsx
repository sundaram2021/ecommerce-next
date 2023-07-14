import Banner from "@/components/Banner"
import Prod1 from "@/components/Prod1"
import Prod2 from "@/components/Prod2"


export default function page() {

  return (
    <div >
      <Banner />
      <Prod1 pd="headphones" />
      <Prod2 />
      <Prod1 pd="movies & tv shows" />
    </div>
  )
}

// 
