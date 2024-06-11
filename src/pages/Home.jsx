import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  borderRadius: 5,
  height: 200,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Home = ({ value }) => {
  // modal logic
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // firebase logic
  const [documentList, setDocumentList] = useState([]);
  const documentCollectionRef = collection(db, "documents");

  // add logic
  const [newTitle, setNewTitle] = useState("");

  const onSubmit = async () => {
    try {
      await addDoc(documentCollectionRef, { title: newTitle, content: "" });
      getDocumentList();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const getDocumentList = async () => {
    try {
      const data = await getDocs(documentCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocumentList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "documents", id);
      await deleteDoc(docRef);
      getDocumentList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDocumentList();
  }, []);

  return (
    <>
      <h1 className="text-center ">Document App</h1>
      <div className="text-center mt-3">
        <Button onClick={handleOpen} variant="outlined">
          + Add
        </Button>
      </div>
      <div className="container mt-4 d-flex flex-wrap justify-content-evenly">
        {documentList?.map((document) => (
          <Box
            key={document.id}
            sx={{
              width: "400px",
              height: "250px",
              borderRadius:'10px',
              overflow:'auto',
             scrollbarWidth:'none',
              marginTop: "30px",
              boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
          >
            <div className="container pt-3">
              <div className="d-flex align-items-center justify-content-between ">
                <div>
                  <h3 className="ms-3">{document?.title}</h3>
                </div>
                <div>
                  <Link to={`/editor/${document.id}`}>
                    <FaEdit className="fs-5 me-2" />
                  </Link>
                  <MdDelete
                    className="text-danger fs-5"
                    onClick={() => handleDelete(document.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: document.content }}></div>
            </div>
          </Box>
        ))}
      </div>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-100"
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <div className="text-center mt-3">
            <Button onClick={onSubmit} variant="outlined">
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
