import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_TOPICS, GET_TOPIC, UPDATE_TOPIC } from "../graphql/queries"

const UpdateTopic = (topic) => {
  const [updateTopic] = useMutation(UPDATE_TOPIC)
  const {data} = useQuery(GET_TOPIC, {variables: {id: topic.id}})

  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (data) {
      setId(data.getTopic.id)
      setTitle(data.getTopic.title)
      setBody(data.getTopic.body)
    }
  }, [data])

  function handleSubmit (e) {
    // e.prventDefault()
    updateTopic({
      variables: {id: id, title: title, body: body},
      refetchQueries: [{ query: GET_TOPICS }],
      // onError: () => client.refetchQueries({ include: [GET_TOPICS] })
    })
    setModal(false)
  }
  function onHandle () {
    setModal(!modal)
  }
  return (
    <>

    <button onClick={onHandle} className="btn btn-primary btn-sm">Update</button>
    <div className={modal ? "modal modal-open" : "modal"}>
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">Update Topic</h3>

          <p><input type="text" name="title" value={title} className="input w-full input-bordered"
              onChange={(e)=>setTitle(e.target.value)}/></p>
          <p><textarea name="body" value={body} className="textarea textarea-bordered"
              onChange={(e)=>setBody(e.target.value)}></textarea></p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onHandle}>Close</button>
            <button onClick={handleSubmit} className="btn">Update</button>
          </div>

      </div>
    </div>
    </>
  )
}
export default UpdateTopic