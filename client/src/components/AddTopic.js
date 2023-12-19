import { useMutation } from "@apollo/client"
import { GET_TOPICS, ADD_TOPIC } from "../graphql/queries"



const AddTopic = () => {
  const [createTopic, { loading, error, client }] = useMutation(ADD_TOPIC)

  if (loading) return <p>'Submitting...'</p>;

  function onSubmit (e) {
    e.preventDefault()
    createTopic({
      variables: {title: e.target.title.value, body: e.target.body.value},
      refetchQueries: [{ query: GET_TOPICS }],
      onError: () => client.refetchQueries({ include: [GET_TOPICS] })
    })
  }

  return (
    <div>
      {error && <p>`Submission error! ${error.message}`</p>}
      <form onSubmit={onSubmit} className="w-1/2 space-y-4">
        <p><input type="text" placeholder="Ttitle" name="title" className="input w-full input-bordered"/></p>
        <p><textarea placeholder="Body" name="body" className="textarea textarea-bordered"></textarea></p>
        <p><button type="submit" className="btn">Add Topic</button></p>
      </form>
    </div>
  )
}
export default AddTopic