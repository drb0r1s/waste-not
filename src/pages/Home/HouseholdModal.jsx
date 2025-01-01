import React from "react";
import Webcam from "react-webcam";
import Loading from "../../components/Loading";
import { images } from "../../data/images";

const HouseholdModal = ({
    type, householdModalRef, disableHouseholdModal,
    createButtonClicked, joinButtonClicked, scanButtonClicked,
    createHouseholdInput, setCreateHouseholdInput, joinHouseholdInput,
    setJoinHouseholdInput, joinHouseholdInputRef, isHouseholdModalLoading
}) => {
    const buttons = ["invite people", "done"];
    
    return(
        <div className="household-modal" ref={householdModalRef}>
            {type === "create" ? <div className="household-modal-create">
                <img className="modal-x" src={images.xIcon} alt="X" onClick={() => disableHouseholdModal(type)} />
                <h2>create household</h2>

                <fieldset>
                    <label htmlFor="household-name">name</label>
                    
                    <input
                        type="text"
                        name="household-name"
                        id="household-name"
                        placeholder="Pan..."
                        value={createHouseholdInput}
                        onChange={e => setCreateHouseholdInput(e.target.value)}
                    />
                </fieldset>

                <button className="household-modal-create-icon-button" type="button">
                    <img src={images.imageIcon} alt="ICON" />
                    <span>icon</span>
                </button>

                <div className="button-holder">
                    {buttons.map((button, index) => {
                        return <button
                            key={index}
                            onClick={() => createButtonClicked(button.split(" ")[0])}
                        >{button}</button>;
                    })}
                </div>
            </div> : type === "join" ? <div className="household-modal-join">
                {isHouseholdModalLoading ? <Loading /> : <>
                    <img className="modal-x" src={images.xIcon} alt="X" onClick={() => disableHouseholdModal(type)} />
                    <h2>join household</h2>

                    <fieldset>
                        <label htmlFor="household-code">household code:</label>
                        
                        <input
                            type="text"
                            name="household-code"
                            id="household-code"
                            placeholder="84ad345t..."
                            maxLength="16"
                            ref={joinHouseholdInputRef}
                            value={joinHouseholdInput}
                            onChange={e => setJoinHouseholdInput(e.target.value)}
                        />
                    </fieldset>

                    <div className="button-holder">
                        <button onClick={joinButtonClicked}>join</button>
                    </div>
                </>}
            </div> : <div className="household-modal-scan">
                {isHouseholdModalLoading ? <Loading /> : <>
                    <img className="modal-x" src={images.xIcon} alt="X" onClick={() => disableHouseholdModal(type)} />
                    <h2>scan QR</h2>

                    <Webcam />

                    <div className="button-holder">
                        <button onClick={scanButtonClicked}>scan</button>
                    </div>
                </>}
            </div>}
        </div>
    );
}

export default HouseholdModal;