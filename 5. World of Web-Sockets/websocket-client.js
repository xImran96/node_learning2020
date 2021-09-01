const WS = new WebSocket('ws://localhost:3232');

WS.onmessage = (payload)=>{

    console.log(payload.data);

    displayMessage(payload.data);
}


function displayTitle(title){
    document.querySelector('h1').innerHTML = title;
}

function displayMessage(message){

    let h1 = document.createElement('h1');
    h1.innerHTML = message
    document.querySelector('div.messages').appendChild(h1);
}



WS.onopen = ()=>{

   console.log('CONNECTION OPEN.');

    displayTitle('CONNECTED TO SERVER.');
   
}


WS.onclose = ()=>{

    console.log('CONNECTION CLOSED.');
    displayTitle('DISCONNECTED FROM SERVER.');
}

document.forms[0].onsubmit = ()=>{
    
    let input = document.getElementById('message');

    console.log(input.value);

    WS.send(input.value);
    
    
}