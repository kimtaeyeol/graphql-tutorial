import { useState } from "react";
import { useMutation } from "@apollo/client"
import { GET_TOPICS, DELETE_TOPIC } from "../graphql/queries";

const DeleteTopic = (topic) => {
  const [deleteTopic, { loading, error, client }] = useMutation(DELETE_TOPIC)
  const [modal, setModal] =useState(false)

  function handleDelete (id) {
    deleteTopic({
      variables: {id: id},
      refetchQueries: [{ query: GET_TOPICS }],
      onError: () => client.refetchQueries({ include: [GET_TOPICS] })
    })
  }
  function onHandle () {
    setModal(!modal)
  }
  return (
    <>
    <button className="btn btn-error btn-sm" onClick={onHandle}>Delete</button>
    <div className={modal ? "modal modal-open" : "modal"}>
      <div className="modal-box">
        <h3>Are you sure to delete {topic.title}?</h3>
        <div>
          <button className="btn mr-1" onClick={onHandle}>No</button>
          <button className="btn" onClick={() => handleDelete(topic.id)}>Yes</button>
        </div>
      </div>
    </div>
    </>
  )
}
export default DeleteTopic