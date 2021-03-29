// A dynamic array of DataColumns
class DataStream {
  constructor(name, maxPoints, color) {
    this.label = name
    this.currentPoint = 0
    this.numPoints = 0
    this.stream = []
    this.numCurrents = 0
    this.maxPoints = maxPoints
    this.color = color
  }
  
  add (dataColumn) {
    this.stream.push( dataColumn)
    this.numPoints ++
    if( this.numPoints > this.maxPoints) {
      this.stream.shift( )
      this.numPoints = this.maxPoints
    }
  }
  
  render( ){
    var x = 0
    this.stream.forEach( dc => dc.render( x += 1, this.color ) ) 
  }
}
