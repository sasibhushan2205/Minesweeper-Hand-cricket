  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const teamName = params.get("Team-name");
    const gridSize = parseInt(params.get("grid-size"));
    const matchtype = parseInt(params.get("matchtype"));
    const grid = document.getElementById("grid");
    let teamscore = 0;
    let score = [0,0,0,0,0];
    let clicks = [0,0,0,0,0]; 
    let isGameOver = false; 
    let maxscore;
    var I = 0;
    let fielders = [];
    let Ones = [];
    let Twos = [];
    let Fours = [];
    let Sixes = []; 
    let team = [];
    let Batsmen = ["Viv Richards", "Sachin Tendulkar", "Virat Kohli", "AB de Villiers", "Brian Lara", "Ricky Ponting", "MS Dhoni", "Rohith Sharma", "Chris Gayle", "David Warner", "Kane Williamson", "Faf du Plessis", "Steve Smith", "Kumar Sangakara", "Mahela Jaya Wardhne", "Harshell Gibbs","Alister Cook", "Hasheem Amla", "Sarav Ganguly", "Suresh Raina", "Yuvraj Singh", "Adam Gilchrist", "Brandom Macclum", "Virender Sehwag", "Gautam Gambhir", "Jacques Kallis", "Kapil Dev", "Rahul Dravid", "Sunil Gavaskar","Anil Kumble","Shubhman Gill","Jadeja","Hardik Pandya"]; 

    // Generate team of 5 players
    function generateTeam(Batsmen){
      while( team.length < 5 ){
        const name = Batsmen[Math.floor(Math.random()*Batsmen.length)];
        if(!team.includes(name)) {
          team.push(name);
        }
      } 
      //Displays team player names in the table 
      document.getElementById("teamscore").innerHTML = `${teamscore}`;
      document.getElementById("player1").innerHTML=`${team[0]}`;
      document.getElementById("player2").innerHTML=`${team[1]}`;
      document.getElementById("player3").innerHTML=`${team[2]}`;
      document.getElementById("player4").innerHTML=`${team[3]}`;
      document.getElementById("player5").innerHTML=`${team[4]}`;

    }
//Randomly generates target from 30% of the maximum to 40% of the maximum score
    function generateTarget(){
      target = Math.floor(0.2*maxscore) + Math.floor(Math.random()*Math.floor((0.3*maxscore+1))) ; 
      document.getElementById("target").innerHTML=`${target}`;
      document.getElementById("Teamscore").innerHTML=`${teamName} Score Card`;
}
// Genereates all ones, twos, fours and sixes
    function generateAll(numones,numtwos,numfours,numsixes){
      while (fielders.length < 11) {
        const position = Math.floor(Math.random() * (gridSize * gridSize));
        if (!fielders.includes(position)) {
          fielders.push(position)
        }
      }
      while (Ones.length < numones) {
        const position = Math.floor(Math.random() * (gridSize * gridSize));
        if (!Ones.includes(position) && !fielders.includes(position)) {
          Ones.push(position)
        }
      }
      while (Twos.length < numtwos) {
        const position = Math.floor(Math.random() * (gridSize * gridSize));
        if (!Ones.includes(position) && !fielders.includes(position) && !Twos.includes(position)) {
          Twos.push(position)
        }
      }
      while (Fours.length < numfours) {
        const position = Math.floor(Math.random() * (gridSize * gridSize));
        if (!Ones.includes(position) && !Twos.includes(position) && !Fours.includes(position) && !fielders.includes(position)) {
          Fours.push(position)
        }
      }
      while (Sixes.length < numsixes) {
        const position = Math.floor(Math.random() * (gridSize * gridSize));
        if (!Ones.includes(position) && !Twos.includes(position) && !Fours.includes(position) && !Sixes.includes(position) && !fielders.includes(position)) {
          Sixes.push(position)
        }
      }
    }
    //Updates team score continuously with every quick
    function updatescore(score,teamscore){
      document.getElementById("teamscore").innerHTML = `${teamscore}`;
      document.getElementById("player1score").innerHTML = `${score[0]}(${clicks[0]})${(I == 0) ? '*' : ''}`;
      document.getElementById("player2score").innerHTML = `${score[1]}(${clicks[1]})${(I == 1) ? '*' : ''}`;
      document.getElementById("player3score").innerHTML = `${score[2]}(${clicks[2]})${(I == 2) ? '*' : ''}`;
      document.getElementById("player4score").innerHTML = `${score[3]}(${clicks[3]})${(I == 3) ? '*' : ''}`;
      document.getElementById("player5score").innerHTML = `${score[4]}(${clicks[4]})${(I == 4) ? '*' : ''}`;
    }
    
    // Initialize grid
    function initializeGrid() {
      fielders = []; Ones = []; Twos = []; Fours = []; Sixes = []; 
      grid.innerHTML = "";
      grid.style.width = "560px";
      grid.style.height = "560px";
      var width = 560/gridSize;
      // Decides the number of onees, twos , fours and sixes based on the matchtype
      if ( gridSize == 6 && matchtype == 0){
       var numones = 11; var numtwos = 5; var numfours = 4; var numsixes = 5;
      }else if( gridSize == 6 && matchtype == 1 ){
       var numones = 10; var numtwos = 4; var numfours = 5; var numsixes = 6; 
      }else if( gridSize == 6 && matchtype == 2){
       var numones = 3; var numtwos = 5; var numfours = 7; var numsixes = 10;  
      }
      
      if ( gridSize == 7 && matchtype == 0){
       var numones = 18; var numtwos = 5; var numfours = 7; var numsixes = 8;
      }else if( gridSize == 7 && matchtype == 1 ){
       var numones = 8; var numtwos = 5; var numfours = 10; var numsixes = 15;  
      }else if( gridSize == 7 && matchtype == 2){
       var numones = 3; var numtwos = 5; var numfours = 12; var numsixes = 18;  
      }

      if ( gridSize == 8 && matchtype == 0){
       var numones = 18; var numtwos = 8; var numfours = 12; var numsixes = 15;  
      }else if( gridSize == 8 && matchtype == 1 ){
       var numones = 8; var numtwos = 8; var numfours = 15; var numsixes = 22;  
      }else if( gridSize == 8 && matchtype == 2){
       var numones = 3; var numtwos = 7; var numfours = 17; var numsixes = 26;  
      }
      
      if ( gridSize == 10 && matchtype == 0){
        var width=56; var numones = 32; var numtwos = 12; var numfours = 20; var numsixes = 25;  
      }else if( gridSize == 10 && matchtype == 1 ){
        var width=56; var numones = 17; var numtwos = 12; var numfours = 24; var numsixes = 36;  
      }else if( gridSize == 10 && matchtype == 2){
        var width=56; var numones = 7; var numtwos = 12; var numfours = 28; var numsixes = 42;  
      }
      maxscore = numones + numtwos*2 +numfours*4+numsixes*6;
      // initializing the click function for every cell of the grid
      for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("tr");
        const rowData = [];
        for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement("td");
          cell.dataset.index = i * gridSize + j;
          cell.className="cell";
          cell.style.width=width;
          cell.style.height=width;
          cell.addEventListener("click", handleBlockClick);
          row.appendChild(cell);
          rowData.push(cell);
        }
        grid.appendChild(row);
      }
      generateAll(numones,numtwos,numfours,numsixes);
      //play-again button will only bring back the scores to 0, but the target and team will remain same
      const playAgainBtn = document.getElementById("play-again");
      playAgainBtn.addEventListener("click", resetGameOnce);
    }
    // Handle block click event
    function handleBlockClick(event) {
      if (isGameOver) return;
      const block = event.target;
      const index = parseInt(block.dataset.index);
        // The game will run untial either you chase the target or till you lose all wickets
        if( teamscore < target){
          if (fielders.includes(index)) {
            I++;
            clicks[I-1]++;
            updatescore(score, teamscore);
            block.classList='fielder';
            block.removeEventListener("click", handleBlockClick);
            if ( I < 5 ){
              playerName=team[I];
            } else {
              endGame();
            }
          } else if (Ones.includes(index)) {
              //score is increased by one and click also by one
              score[I]++; clicks[I]++; teamscore++; block.classList='revealed1';
              //now the click function will be removed from that cell, as you should not click it multiple times.
              block.removeEventListener("click", handleBlockClick);
              //teamscore and indivisual scores are updated.
              updatescore(score, teamscore);
          } else if (Twos.includes(index)) {
              score[I] += 2;clicks[I]++;teamscore += 2;             
              block.classList='revealed2';
              block.removeEventListener("click", handleBlockClick);
            updatescore(score, teamscore);           
          } else if (Fours.includes(index)) {
              score[I] += 4;clicks[I]++;teamscore += 4;                          
              block.classList='revealed4';
              block.removeEventListener("click", handleBlockClick);
              updatescore(score, teamscore);          
          } else if (Sixes.includes(index)) {
            score[I] += 6;clicks[I]++;teamscore += 6;                      
            block.classList='revealed6';
            block.removeEventListener("click", handleBlockClick);
            updatescore(score, teamscore);
          }
        } else {
          endGame();
        }
      } 
    // End the game
    function endGame() {
      isGameOver = true;
      var difference = target - teamscore ;
      var index = score.indexOf(Math.max(...score));
      var strikerate = ((score[index]/clicks[index])*100).toFixed(2);
      //the alert messages will be displayed.
      if( difference > 0){
        alert(`Game Over!! You have lost the match by ${difference} runs`)
      }else {
        alert(`Hurray!! ${teamName} chased the target.\n Stats of Man of the Match :\n Player Name: ${team[index]}\n Strike Rate: ${strikerate}\n `)
      }
      const blocks = grid.getElementsByTagName("td");
      for (const block of blocks) {
        block.removeEventListener("click", handleBlockClick);
      } }
    // Reset the game
    function resetGame() {
      //everything initialized to 0 but team players and tarrget remain same.
      score = [0,0,0,0,0];
      clicks = [0,0,0,0,0];
      teamscore = 0;
      I = 0;
      updatescore(score,teamscore);
      teamscore = 0
      isGameOver = false;
      grid.innerHTML = "";
      initializeGrid();
    }
    // Reset the game once when play again button is clicked
    function resetGameOnce() {
      this.removeEventListener("click", resetGameOnce);
      resetGame();
    }
    // Start the game
    function startGame() {
      initializeGrid();
      generateTarget();
      generateTeam(Batsmen);
    }
    startGame();
  });
