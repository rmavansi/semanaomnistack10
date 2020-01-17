function parseStrongAsArray(ArrayAsString) {
  return ArrayAsString.split(',').map(tech => tech.trim());
}

export default parseStrongAsArray;
