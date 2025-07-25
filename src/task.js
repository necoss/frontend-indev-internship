const liElements = document.getElementsByTagName('li')

for (let li of liElements) {
  const liLength = li.getElementsByTagName('li').length
  const count = liLength

  if (liLength === 0) continue
  console.log(liLength)

  li.firstChild.data += `[${count}]`
}

