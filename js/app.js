 let currSong = new Audio();
 let play = document.querySelector('#play');
 let previous = document.querySelector('#previous');
 let next = document.querySelector('#next');
 let songs;
 let currfolder;
 let cardContainer = document.querySelector(".cardContainer");
 function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


async function getSongs(folder){
        currfolder = folder;
        // let a = await fetch(`http://127.0.0.1:5500/${currfolder}/`);
            let a = await fetch(`${currfolder}/`);

        let response = await a.text();

        let div = document.createElement('div');
        div.innerHTML = response;
        let as = div.getElementsByTagName('a');
        songs = [];
        for(let idx=0;idx<as.length;idx++){
            const element = as[idx];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split(`/${folder}/`)[1]);
            }
        }

        

    // show all the songs in the playlist
   let songUL=document.querySelector('.songList').getElementsByTagName("ul")[0];
   songUL.innerHTML = "";
   for(const song of songs){
      songUL.innerHTML = songUL.innerHTML+
      `
      <li>
                <img class="invert" src="img/music.svg">
                <div class="info">
                   <div >${song.replaceAll("%20" , " ")}</div>
                   <div >Natik</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img  class="invert" src="img/play.svg" alt="">
                </div>
                
               </li>
      `;
   }

// attach an event listener to each songs

  Array.from(document.querySelector(".songList").getElementsByTagName('li')).forEach((e)=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector('.info').firstElementChild.innerHTML.trim());
        playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
    });
   
  });

  return songs;
    
}


const playMusic = (track ,pause=false)=>{
    //  let audio = new Audio("/songs/" + track);
    currSong.src =  `/${currfolder}/` + track;
    if(!pause){
        currSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00.00 / 00.00"
}


async function displayAlbums(){
        // let a = await fetch(`http://127.0.0.1:5500/songs/`);
        let a = await fetch("songs/");
        let response = await a.text();
        let div = document.createElement('div');
        div.innerHTML = response;
        let anchors = div.getElementsByTagName('a')
        // console.log(anchors);
      
   let array =  Array.from(anchors)
   for(let idx=0;idx<array.length;idx++){
        const e = array[idx];
        let href = e.href;

        // skip the main "songs/" link
        if (href.endsWith("/songs/")) return;

        if (href.includes("/songs/")) {
            // remove trailing slash if present
            if (href.endsWith("/")) href = href.slice(0, -1);

            // take the last part only
            let folder = href.split("/").pop();
            // get the meta data of the folder
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
              <div class="play"><i class="fa-solid fa-play play-icon"></i></div>
              <img
                src="/songs/${folder}/cover.jpg"
                alt=""
              />
              <h2>${response.title}</h2>
              <p>${response.description}</p>
            </div>`
        }
    };

        // load the playlist when card is clicked

        Array.from(document.getElementsByClassName("card")).forEach(e=>{
        // console.log(e);
        e.addEventListener("click",async item=>{
            // important currentTarget-> jispr event listener lage wahi ayeega 
            // console.log(item.target,item.currentTarget);
         songs = await getSongs(`songs/${ item.currentTarget.dataset.folder}`);
         playMusic(songs[0]);
        });
    });

}


async function main(){

    // get the list of all song
    await getSongs("songs/ncs");
    playMusic(songs[0],true);

    //Display all the albums on the page
    displayAlbums();

  // attach an event listener to play next and previous

    play.addEventListener("click",()=>{
        if(currSong.paused){
            currSong.play();
            play.src = "img/pause.svg";
        }else{
            currSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Listen for timeupdate event
    currSong.addEventListener("timeupdate",()=>{
        document.querySelector('.songtime').innerHTML = `${formatTime(currSong.currentTime)}/${formatTime(currSong.duration)}`;
        document.querySelector(".circle").style.left = (currSong.currentTime/currSong.duration)*100 + "%";
    });

    // add an event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click" , e=>{
    //    console.log(e.target.getBoundingClientRect().width,e.offsetX);
          let percent =  (e.offsetX/e.target.getBoundingClientRect().width)*100;
          document.querySelector('.circle').style.left =  percent + "%";
          currSong.currentTime = (currSong.duration*percent)/100;
    });


    // Add an event listener for hamburger
    document.querySelector('.hamburger').addEventListener("click",()=>{
        document.querySelector('.left').style.left = "0";
    });

    // add event listener for close btn
    document.querySelector('.close').addEventListener("click",()=>{
        document.querySelector('.left').style.left = "-120%";
    });

    // add an event listener to previous and next

    previous.addEventListener("click",()=>{
         let idx = songs.indexOf(currSong.src.split("/").slice(-1)[0]);
        // console.log(songs);
        if(idx-1 >= 0) {
            playMusic(songs[idx-1]);
        }
    });

    next.addEventListener("click",()=>{
        //  console.log("next cliked" , currSong);
        let idx = songs.indexOf(currSong.src.split("/").slice(-1)[0]);
        // console.log(songs);
        if(idx+1 < songs.length) {
            playMusic(songs[idx+1]);
        }
    });

    // add an event to volume

    document.querySelector('.range').getElementsByTagName("input")[0].addEventListener("change",(e)=>{
          //. chat gpt how to set music volume in js
          console.log("setting volume to : " , e.target.value ,"/100");
        currSong.volume = (e.target.value/100);
    });

    // add event listener to mute the track

    let lastVolume = 1; // store last non-muted volume (default full)

    document.querySelector(".volume>img").addEventListener("click",(e)=>{

       let rangeInput = document.querySelector('.range input');

       if(e.target.src.includes ("volume.svg")){
        lastVolume = currSong.volume;  // remember current volume
        e.target.src=e.target.src.replace('volume.svg', 'mute.svg');
        currSong.volume = 0;
        rangeInput.value = 0;
       }else{
         currSong.volume = lastVolume > 0 ? lastVolume : 0.5;
        rangeInput.value = currSong.volume * 100;
         e.target.src = e.target.src.replace('mute.svg','volume.svg');
       }
    })

  

}
     
main();





