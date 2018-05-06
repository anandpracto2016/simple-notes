module.exports = {
  parseArr: (arr) => (arg) =>
    arr
      .map((item) => item(arg))
      .filter((item) => !!item)
}
