// One data point in a data series
class DataColumn {
  constructor(name, yValue ) {
    this.label = name
    this.value = yValue 
  }

  render( x, color ) {
    stroke( color ) ; 
    //noStroke( )
    fill ( color ) ;
    point( x, this.value )
    //circle( x, this.value, 10) ;
  }
}
