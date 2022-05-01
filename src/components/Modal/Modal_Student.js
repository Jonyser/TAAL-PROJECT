import "./Modal.css";

const Modal_Student = ({ thisGetMyUsers, setOpenModal }) => {
    console.log("thisGetMyUsers:", thisGetMyUsers);

    return (
        <>
            <div className="Background">
                <div className="modalContainerStudent">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        > X
                        </button>
                    </div>
                    <h3>:{thisGetMyUsers.name}  </h3>

                    <div className="body" style={{ textAlign: 'right' }}>
                        <br>
                        </br>
                        <h4 style={{ marginLeft: "220px", color: "red" }}>:תיאור</h4>

                        {thisGetMyUsers.description === "" ? <>
                            <h6 >!אין מידע המתאר את חניך זה</h6>

                        </> :
                            <>
                                <h5>{thisGetMyUsers.description}</h5>
                            </>}
                        <h4 style={{ marginLeft: "220px", color: "red" }}>:פרופיל מ1-100</h4>
                        {thisGetMyUsers.acf.risk_profile ? <>
                            <h5>{thisGetMyUsers.acf.risk_profile}</h5>
                        </> :
                            <>
                                <h6 >!לא נקבע פרופיל לחניך זה</h6>
                            </>}

                    </div>
                </div>
            </div>
        </>
    );
}
export default Modal_Student;