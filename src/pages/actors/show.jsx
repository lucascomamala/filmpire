import { useParams } from "react-router-dom"

import { useGetActorQuery } from "../../services/TMDB"

const Actors = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetActorQuery(id)
  console.log(data)


  return (
    <div>Actors</div>
  )
}

export default Actors
