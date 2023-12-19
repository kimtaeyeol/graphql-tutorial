import { useQuery } from "@apollo/client"
import { GET_TOPICS } from "../graphql/queries"
import DeleteTopic from "./DeleteTopic";
import UpdateTopic from "./UpdateTopic";

const GetTopics = () => {
  const {data, loading, error} = useQuery(GET_TOPICS)

  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.topics.map((topic) => (
          <tr key={topic.id}>
            <td>{topic.id}</td>
            <td>{topic.title}</td>
            <td>
              <span className="mr-1"><UpdateTopic {...topic} /></span>
              <span><DeleteTopic {...topic} /></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GetTopics