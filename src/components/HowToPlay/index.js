import React from "react"
import Popup from "reactjs-popup"
 
function HowToPlay() { 
  return (
    <Popup trigger={<button class="btn">How to Play</button>} position="left center">
      <div class="how-to-play-modal">
      ⚽ Welcome to Crypto Fantasy Premier League ⚽
        <h6 class="how-to-play-heading">How to Play</h6>
        1. First-time players get to mint a 15-man team consisting of 3 GK, 4 DEF, 4 MID, 4 FWD<br></br> 
        2. Create a game and set a wager OR join an existing game for the stated wager
        <h6 class="how-to-play-heading">Rules</h6>
        - Team submissions are final<br></br> 
        - Valid teams consist of 1 GK, 1 DEF, 1 MID, 1 FWD  
      </div>
    </Popup>
  );
}

export default HowToPlay;