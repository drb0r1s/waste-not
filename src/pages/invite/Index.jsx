import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInviteCode } from "../../functions/getInviteCode";
import { images } from "../../data/images";

const Invite = () => {
    const [code, setCode] = useState("");
    const [buttonContent, setButtonContent] = useState("copy code");
    
    const pRef = useRef(null);
    const navigate = useNavigate();

    const location = useLocation();
    const household = location.state.household;

    useEffect(() => setCode(getInviteCode()), []);

    function copyCode() {
        navigator.clipboard.writeText(code);

        setButtonContent("copied");
        pRef.current.id = "invite-p-copied";
    }
    
    return(
        <div className="invite">
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="return"
                onClick={() => navigate(`/${location.state.returnHome ? "" : "household"}`, { state: location.state.returnHome ? {} : { household } })}
            />
            
            <h2>invite people</h2>

            <div className="invite-code-holder">
                <p ref={pRef}>{code}</p>
                <button onClick={copyCode}>{buttonContent}</button>
            </div>

            <img src={images.qrCodeIcon} alt="QR CODE" />
        </div>
    );
}

export default Invite;