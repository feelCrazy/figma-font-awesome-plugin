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

const clickIcon = (msg: { files: any; type: string }) => {
  if (msg.type === "drawIcon") {
    const randomPosition = () => Math.floor(Math.random() * (100 - 0 + 1) + 0)
    const icon = figma.createNodeFromSvg(msg.files.data)
    icon.x = Math.round(figma.viewport.center.x + randomPosition())
    icon.y = Math.round(figma.viewport.center.y + randomPosition())
    figma.currentPage.selection = [icon]
  }
}

const dropIcon = ({ items, absoluteX, absoluteY }: DropEvent) => {
  if (items.length > 0 && items[0].type === "image/svg+xml") {
    const newNode = figma.createNodeFromSvg(items[0].data)
    newNode.x = absoluteX
    newNode.y = absoluteY
    figma.currentPage.selection = [newNode]
  }
}
