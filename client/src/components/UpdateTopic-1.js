import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_TOPICS, GET_TOPIC, UPDATE_TOPIC } from "../graphql/queries"

const UpdateTopic = (topic) => {
  const [updateTopic, { error, client }] = useMutation(UPDATE_TOPIC)
  const {loading, data} = useQuery(GET_TOPIC, {variables: {id: topic.id}})

  const [title, setTitle] = useState(loading ? data?.topic.title : '')
  const [body, setBody] = useState(loading ? data?.topic.body : '')
  const [modal, setModal] = useState(false)

  function handleSubmit (e) {
    e.prventDefault()
    updateTopic({
      variables: {id: topic.id, title: e.target.title.value, body: e.target.body.value},
      refetchQueries: [{ query: GET_TOPICS }],
      onError: () => client.refetchQueries({ include: [GET_TOPICS] })
    })
  }
  function onHandle () {
    setModal(!modal)
  }
  return (
    <>
    {error && <p>`Submission error! ${error.message}`</p>}
    <button onClick={onHandle} className="btn btn-primary btn-sm">Update</button>
    <div className={modal ? "modal modal-open" : "modal"}>
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">Update Topic</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p><input type="text" name="title" value={title} className="input w-full input-bordered"
              onChange={(e)=>setTitle(e.target.value)}/></p>
          <p><textarea name="body" value={body} className="textarea textarea-bordered"
              onChange={(e)=>setBody(e.target.value)}></textarea></p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onHandle}>Close</button>
            <button type="submit" className="btn">Update</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
export default UpdateTopic