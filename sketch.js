let graphWindow = []
let wxTable
let sampleNum = 0
let maxRow = 0
let tempDS
let humidDS
let client

// This function is run once as soon as preload() is 
// finished.
function setup() {
  createCanvas(1000, 400)
  itc = color( 0, 255, 0 )
  ihc = color( 255, 0, 255 )
  otc = color( 255, 0, 0 )
  ohc = color( 255, 255, 0 )
  tempDSi = new DataStream( "Indoor temp", width, itc)
  humidDSi = new DataStream( "Indoor humidity", width, ihc)
  tempDSo = new DataStream( "Outdoor temp", width, otc)
  humidDSo = new DataStream( "Outdoor humidity", width, otc)
  
  // Create a client instance
  client = new Paho.MQTT.Client('192.168.0.119', 8080, "p5js");

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({onSuccess:onConnect, onFailure:doFail} );
  frameRate(2)

}

// This method is run repeatedly while your sketch is active.
function draw() {          
    
    background( 0 )
    tempDSi.render( )
    humidDSi.render( )
    tempDSo.render( )
    humidDSo.render( )
    
    //console.log(  F  + ' ' + H)

}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("sensors/wx");
  //message = new Paho.MQTT.Message("Hello");
  //message.destinationName = "World";
  //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {  
    console.log("onMessageArrived:"+message.payloadString);
  
    let splitString = split( message.payloadString, ',')
    let rawTi = splitString[0] 
    let Hi = splitString[1] 
    let rawTo = splitString[2]
    let Ho = splitString[3]
    
    // C to F
    Fi = rawTi * (  9.0 / 5.0 ) + 32.0
    Fo = rawTo * ( 9.0 / 5.0 ) + 32.0
    
    y = map( Fi, 20, 100, 0, height)
    y = height - y
    tempDCi = new DataColumn( "Fi", y)
    tempDSi.add( tempDCi )

    y = map( Fo, 20, 100, 0, height )
    y = height - y
    tempDCo = new DataColumn( "Fo", y )
    tempDSo.add( tempDCo )
    
    y = map(Hi, 10, 99, 0, height)
    y = height - y
    humidDCi = new DataColumn( "Hi", y)
    humidDSi.add( humidDCi)

    y = map(Ho, 10, 99, 0, height)
    y = height - y
    humidDCo = new DataColumn( "Ho", y)
    humidDSo.add( humidDCo)

}

function doFail(e){
    console.log(e);
  }
