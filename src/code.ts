figma.showUI(__html__, { themeColors: true, height: 500, width: 330 })
figma.ui.onmessage = (msg) => {
  loadFirst(msg)
  clickIcon(msg)
}

figma.on("drop", (event) => {
  dropIcon(event)
  return false
})

const loadFirst = (msg: { type: string }) => {
  if (msg.type === "pluginLoaded") {
    figma.clientStorage.getAsync("firstRun").then((value) => {
      if (!value) {
        figma.notify(
          "Now you can drag and drop the selected icon into the frame!!",
          {}
        )
        figma.clientStorage.setAsync("firstRun", true)
      }
    })
  }
}

const clickIcon = (msg: {
  files: { name: string; data: string }
  type: string
}) => {
  if (msg.type === "drawIcon") {
    const { name, data } = msg.files
    const randomPosition = () => Math.floor(Math.random() * (100 - 0 + 1) + 0)
    const newName = figma.createNodeFromSvg(data)
    newName.x = Math.round(figma.viewport.center.x + randomPosition())
    newName.y = Math.round(figma.viewport.center.y + randomPosition())
    newName.name = name
    figma.currentPage.selection = [newName]
  }
}

const dropIcon = ({ items, absoluteX, absoluteY, dropMetadata }: DropEvent) => {
  if (items.length > 0 && items[0].type === "image/svg+xml") {
    const { data } = items[0]
    const newNode = figma.createNodeFromSvg(data)
    newNode.x = absoluteX
    newNode.y = absoluteY
    newNode.name = dropMetadata.name
    figma.currentPage.selection = [newNode]
  }
}
