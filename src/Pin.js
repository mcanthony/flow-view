
function Pin (type, node, position) {
  var self = this

  this.type     = type
  this.node     = node
  this.position = position

  var canvas = node.canvas

  var theme = canvas.theme

  var fill     = theme.fillPin,
      halfSize = theme.halfPinSize

  this.fill = fill

  this.halfSize = halfSize

  var size = halfSize * 2
  this.size = size

  function getVertex () {
    var vertex = {
          absolute: {},
          relative: {}
        }

    vertex.relative.x = node.xCoordinateOf(self)

    if (type === 'ins')
      vertex.relative.y = 0
    if (type === 'outs')
      vertex.relative.y = node.h - size

    vertex.absolute.x = vertex.relative.x + node.x
    vertex.absolute.y = vertex.relative.y + node.y

    return vertex
  }

  Object.defineProperty(this, 'vertex', { get: getVertex })

  function getCenter () {
    var center = {
          absolute: {},
          relative: {}
        }

    var vertex = this.vertex

    center.relative.x = vertex.relative.x + halfSize
    center.relative.y = vertex.relative.y + halfSize
    center.absolute.x = center.relative.x + node.x
    center.absolute.y = center.relative.y + node.y

    return center
  }

  Object.defineProperty(this, 'center', { get: getCenter })

}

function get (key) {
  var node     = this.node,
      position = this.position,
      type     = this.type

  return node[type][position][key]
}

Pin.prototype.get = get

function has (key) {
  var node     = this.node,
      position = this.position,
      type     = this.type

  return typeof node[type][position][key] !== 'undefined'
}

Pin.prototype.has = has

function set (key, data) {
  var position = this.position,
      type     = this.type

  this.node[type][position][key] = data
}

Pin.prototype.set = set

function toJSON () {
  var node     = this.node,
      position = this.position,
      type     = this.type

  return node[type][position]
}

Pin.prototype.toJSON = toJSON

module.exports = Pin

